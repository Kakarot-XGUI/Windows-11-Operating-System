// Folder Management System
let folders = JSON.parse(localStorage.getItem('desktopFolders')) || [];
let folderCounter = 1;
let selectedFolder = null;
let clipboardFolder = null;
let clipboardAction = null; // 'cut' or 'copy'
let isRenaming = false;

// Initialize folder system when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFolders();
    setupContextMenus();
});

// Setup context menu event listeners
function setupContextMenus() {
    // Desktop right-click context menu - Modified to prevent conflicts
    document.addEventListener('contextmenu', function(e) {
        // Check if clicking on folder first
        if (e.target.closest('.desktop-folder')) {
            e.preventDefault();
            e.stopPropagation(); // Stop event bubbling
            const folderElement = e.target.closest('.desktop-folder');
            const folderId = folderElement.getAttribute('data-folder-id');
            const folder = folders.find(f => f.id == folderId);
            selectFolder(folderElement, folder);
            showFolderContextMenu(e.clientX, e.clientY);
            return;
        }
        
        // Check if clicking on other desktop icons
        if (e.target.closest('.drag')) {
            return; // Let other icons handle their own context menus
        }
        
        // Check if clicking on desktop (not on existing icons or menus)
        if (!e.target.closest('#contextMenu') && !e.target.closest('#folderContextMenu')) {
            e.preventDefault();
            updateContextMenu();
            showContextMenu(e.clientX, e.clientY);
        }
    });

    // Click anywhere to hide context menus and deselect folders
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#contextMenu') && !e.target.closest('#folderContextMenu')) {
            hideContextMenus();
        }
        
        if (!e.target.closest('.desktop-folder') && !isRenaming) {
            deselectAllFolders();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete' && selectedFolder) {
            deleteSelectedFolder();
        } else if (e.key === 'F2' && selectedFolder) {
            renameSelectedFolder();
        } else if (e.ctrlKey && e.key === 'x' && selectedFolder) {
            cutSelectedFolder();
        } else if (e.ctrlKey && e.key === 'c' && selectedFolder) {
            copySelectedFolder();
        } else if (e.ctrlKey && e.key === 'v' && clipboardFolder) {
            pasteFolder();
        }
    });
}

// Create New Folder
function createNewFolder() {
    const folderName = `New Folder${folderCounter > 1 ? ` (${folderCounter})` : ''}`;
    const position = findNextAvailablePosition();
    
    const folder = {
        id: Date.now(),
        name: folderName,
        x: position.x,
        y: position.y,
        created: new Date().toISOString()
    };

    folders.push(folder);
    folderCounter++;
    saveFolders();
    renderFolder(folder);
    hideContextMenus();
    
    // Auto-select and start renaming the new folder
    setTimeout(() => {
        const folderElement = document.querySelector(`[data-folder-id="${folder.id}"]`);
        selectFolder(folderElement, folder);
        renameSelectedFolder();
    }, 100);
}

// Find next available position for new folder
function findNextAvailablePosition() {
    const startX = 120;
    const startY = 20;
    const stepX = 80;
    const stepY = 90;
    const maxColumns = Math.floor((window.innerWidth - 200) / stepX);

    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < maxColumns; col++) {
            const x = startX + (col * stepX);
            const y = startY + (row * stepY);
            
            // Check if position is occupied by existing folders
            const occupied = folders.some(folder => 
                Math.abs(folder.x - x) < 60 && Math.abs(folder.y - y) < 60
            );
            
            if (!occupied) {
                return { x, y };
            }
        }
    }
    
    return { x: startX, y: startY };
}

// Render folder on desktop - Modified to prevent event conflicts
function renderFolder(folder) {
    const folderElement = document.createElement('div');
    folderElement.className = 'desktop-folder drag flex items-center flex-col text-white absolute cursor-pointer';
    folderElement.style.left = folder.x + 'px';
    folderElement.style.top = folder.y + 'px';
    folderElement.style.userSelect = 'none';
    folderElement.style.transition = 'all 0.2s ease';
    folderElement.setAttribute('data-folder-id', folder.id);
    
    folderElement.innerHTML = `
        <img src="https://img.icons8.com/color/48/folder-invoices--v1.png" alt="Folder" class="w-12 h-12">
        <span class="folder-name mt-1 text-xs bg-black bg-opacity-50 px-1 rounded max-w-16 truncate font-['Winky_Rough']">${folder.name}</span>
    `;

    // Double-click to rename
    folderElement.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        selectFolder(folderElement, folder);
        renameSelectedFolder();
    });

    // Single click to select
    folderElement.addEventListener('click', function(e) {
        e.stopPropagation();
        selectFolder(folderElement, folder);
    });

    // Drag functionality
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    folderElement.addEventListener('mousedown', function(e) {
        if (e.button === 0) { // Left mouse button
            isDragging = true;
            dragStart = { x: e.clientX - folder.x, y: e.clientY - folder.y };
            folderElement.style.zIndex = '1000';
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging && selectedFolder && selectedFolder.id === folder.id) {
            const newX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragStart.x));
            const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragStart.y));
            
            folderElement.style.left = newX + 'px';
            folderElement.style.top = newY + 'px';
            folder.x = newX;
            folder.y = newY;
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            folderElement.style.zIndex = '';
            saveFolders();
        }
    });

    // Add folder to desktop
    document.body.appendChild(folderElement);
}

// Select folder
function selectFolder(element, folder) {
    deselectAllFolders();
    element.style.background = 'rgba(0, 120, 215, 0.3)';
    element.style.border = '1px solid rgba(0, 120, 215, 0.5)';
    element.style.borderRadius = '4px';
    selectedFolder = folder;
}

// Deselect all folders
function deselectAllFolders() {
    document.querySelectorAll('.desktop-folder').forEach(el => {
        el.style.background = '';
        el.style.border = '';
        el.style.borderRadius = '';
    });
    selectedFolder = null;
}

// Rename folder
function renameSelectedFolder() {
    if (!selectedFolder || isRenaming) return;
    
    isRenaming = true;
    const folderElement = document.querySelector(`[data-folder-id="${selectedFolder.id}"]`);
    const nameSpan = folderElement.querySelector('.folder-name');
    const currentName = nameSpan.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.className = 'bg-white text-black px-2 py-1 text-xs rounded border-2 border-blue-500 outline-none';
    input.style.width = '60px';
    
    nameSpan.style.display = 'none';
    nameSpan.parentNode.appendChild(input);
    input.focus();
    input.select();

    function finishRename() {
        const newName = input.value.trim() || currentName;
        selectedFolder.name = newName;
        nameSpan.textContent = newName;
        nameSpan.style.display = '';
        input.remove();
        isRenaming = false;
        saveFolders();
    }

    input.addEventListener('blur', finishRename);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            finishRename();
        } else if (e.key === 'Escape') {
            nameSpan.style.display = '';
            input.remove();
            isRenaming = false;
        }
    });
}

// Delete folder
function deleteSelectedFolder() {
    if (!selectedFolder) return;
    
    if (confirm(`Are you sure you want to delete "${selectedFolder.name}"?`)) {
        folders = folders.filter(f => f.id !== selectedFolder.id);
        const folderElement = document.querySelector(`[data-folder-id="${selectedFolder.id}"]`);
        if (folderElement) {
            folderElement.remove();
        }
        selectedFolder = null;
        saveFolders();
    }
}

// Cut folder
function cutSelectedFolder() {
    if (!selectedFolder) return;
    clipboardFolder = { ...selectedFolder };
    clipboardAction = 'cut';
    
    const folderElement = document.querySelector(`[data-folder-id="${selectedFolder.id}"]`);
    if (folderElement) {
        folderElement.style.opacity = '0.5';
    }
}

// Copy folder
function copySelectedFolder() {
    if (!selectedFolder) return;
    clipboardFolder = { ...selectedFolder };
    clipboardAction = 'copy';
}

// Paste folder
function pasteFolder() {
    if (!clipboardFolder) return;
    
    const position = findNextAvailablePosition();
    
    if (clipboardAction === 'cut') {
        // Move the folder
        const originalElement = document.querySelector(`[data-folder-id="${clipboardFolder.id}"]`);
        if (originalElement) {
            originalElement.style.opacity = '1';
            originalElement.style.left = position.x + 'px';
            originalElement.style.top = position.y + 'px';
        }
        
        const folderIndex = folders.findIndex(f => f.id === clipboardFolder.id);
        if (folderIndex !== -1) {
            folders[folderIndex].x = position.x;
            folders[folderIndex].y = position.y;
        }
    } else if (clipboardAction === 'copy') {
        // Create a copy
        const newFolder = {
            id: Date.now(),
            name: clipboardFolder.name + ' - Copy',
            x: position.x,
            y: position.y,
            created: new Date().toISOString()
        };
        
        folders.push(newFolder);
        renderFolder(newFolder);
    }
    
    clipboardFolder = null;
    clipboardAction = null;
    saveFolders();
    hideContextMenus();
}

// Open selected folder (placeholder)
function openSelectedFolder() {
    if (!selectedFolder) return;
    alert(`Opening folder: ${selectedFolder.name}`);
    hideContextMenus();
}

// Context menu functions - Modified to work with your existing system
function showContextMenu(x, y) {
    // Hide folder context menu first
    hideContextMenus();
    
    const menu = document.getElementById('contextMenu');
    if (menu) {
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.classList.remove('hidden');
    }
}

function showFolderContextMenu(x, y) {
    // Hide main context menu first  
    hideContextMenus();
    
    const menu = document.getElementById('folderContextMenu');
    if (menu) {
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.classList.remove('hidden');
    }
}

function hideContextMenus() {
    const contextMenu = document.getElementById('contextMenu');
    const folderContextMenu = document.getElementById('folderContextMenu');
    
    if (contextMenu) contextMenu.classList.add('hidden');
    if (folderContextMenu) folderContextMenu.classList.add('hidden');
}

// Update context menu to show/hide paste option
function updateContextMenu() {
    const pasteOption = document.getElementById('pasteOption');
    if (pasteOption) {
        pasteOption.style.display = clipboardFolder ? 'block' : 'none';
    }
}

// Save folders to localStorage
function saveFolders() {
    localStorage.setItem('desktopFolders', JSON.stringify(folders));
}

// Load folders from localStorage
function loadFolders() {
    folders.forEach(folder => {
        renderFolder(folder);
    });
    
    if (folders.length > 0) {
        folderCounter = Math.max(...folders.map(f => {
            const match = f.name.match(/New Folder(?:\s\((\d+)\))?/);
            return match ? (match[1] ? parseInt(match[1]) : 1) : 0;
        })) + 1;
    }
}

// Arrange folders in a grid
function arrangeIcons() {
    const startX = 120;
    const startY = 20;
    const stepX = 80;
    const stepY = 90;
    const maxColumns = Math.floor((window.innerWidth - 200) / stepX);
    
    folders.forEach((folder, index) => {
        const col = index % maxColumns;
        const row = Math.floor(index / maxColumns);
        
        folder.x = startX + (col * stepX);
        folder.y = startY + (row * stepY);
        
        const folderElement = document.querySelector(`[data-folder-id="${folder.id}"]`);
        if (folderElement) {
            folderElement.style.left = folder.x + 'px';
            folderElement.style.top = folder.y + 'px';
        }
    });
    
    saveFolders();
}

// Auto-arrange when window is resized
window.addEventListener('resize', function() {
    setTimeout(arrangeIcons, 100);
});
