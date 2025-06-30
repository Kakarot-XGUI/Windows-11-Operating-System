// Icon drag
const draggables = document.querySelectorAll('.drag');

draggables.forEach(drag => {
  let offsetX = 0, offsetY = 0;

const move = (e) => {
    drag.style.left = `${e.clientX - offsetX}px`;
    drag.style.top = `${e.clientY - offsetY}px`;
  };

  const mouseDownHandler = (e) => {
    offsetX = e.clientX - drag.offsetLeft;
    offsetY = e.clientY - drag.offsetTop;

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  drag.addEventListener('mousedown', mouseDownHandler);
});

window.addEventListener("load", () => {
  const bootTexts = document.getElementById("bootTexts");
  const winLogo = document.getElementById("winLogo");
  const spinner = document.getElementById("spinner");
  const pressEnter = document.getElementById("pressEnter");
  const winLoader = document.getElementById("winLoader");
  const bootSound = document.getElementById("bootSound");

  // Step-by-step animation sequence
  setTimeout(() => {
    bootTexts.style.opacity = "0";
    winLogo.classList.add("opacity-100");
  }, 500);

  setTimeout(() => {
    spinner.classList.add("opacity-100");
  }, 1000);

  setTimeout(() => {
    pressEnter.classList.add("opacity-100");
  }, 1500);

  // Play boot sound after short delay
  setTimeout(() => {
    const playPromise = bootSound.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
      
        const playOnInteraction = () => {
          bootSound.play();
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("keydown", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
        document.addEventListener("keydown", playOnInteraction);
      });
    }
  }, 500); 
  

  // ENTER to continue
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      winLoader.classList.add("opacity-0");
      setTimeout(() => {
        winLoader.style.display = "none";
      }, 600);
    }
  });
});



// Date and Time Function
function updateDateTime() {
  const now = new Date();

  // Time formatting
  let h = now.getHours(),
      m = now.getMinutes(),
      s = now.getSeconds();
  const t = h < 12 ? "AM" : "PM";
  h = h % 12 || 12;

  // Date formatting: MM/DD/YYYY
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day   = now.getDate().toString().padStart(2, '0');
  const year  = now.getFullYear();

  document.getElementById("time").innerHTML = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ${t}`;
  document.getElementById("date").innerHTML = `${month}/${day}/${year}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Context Menu Function
const contextMenu = document.getElementById("contextMenu");
    const wallpaperWindow = document.getElementById("wallpaperWindow");
    const bgVideo = document.getElementById("bgVideo");
    const bgImage = document.getElementById("bgImage");
    
    // first time Right click to open Context menu
    desktop.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      contextMenu.style.top = `${e.clientY}px`;
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.classList.remove("hidden");
    });

    // Hidden again if click anywhere else
    document.addEventListener("click", () => {
      contextMenu.classList.add("hidden");
    });

    // called when click on change Wallpaper , context menu hide ho jayega 
    function openWallpaperWindow() {
      contextMenu.classList.add("hidden");
      wallpaperWindow.classList.remove("hidden");
    }

 // // CLick on Wallpapers to set Background 
    function setWallpaper(src) {
      bgVideo.classList.add("hidden");
      bgImage.classList.remove("hidden");
      bgImage.style.backgroundImage = `url('${src}')`;
    }

// // Opening Apps Start's Here via Icons
    // Called when double click on Icon
    function openThisPc() {
      const win = document.getElementById('thisPcWindow');
      win.classList.remove('hidden');
  }

  function openExploler() {
    const win1 = document.getElementById("fileExplorerWindow");
    win1.classList.remove('hidden');
  }

  function openVS(){
    const win2 = document.getElementById("vsWindow");
    win2.classList.remove("hidden");
  }
  function openPad(){
    const win3 = document.getElementById("notepadWindow");
    win3.classList.remove("hidden");
  }

  function openBin(){
   const win4 = document.getElementById("recycleBinWindow");
   win4.classList.remove("hidden");
  }
  function openChrome(){
    const win5 = document.getElementById("chromeWindow");
    win5.classList.remove("hidden");
   }
   
// // Opening Apps End's Here


// // CLose Functionality's Start Here
  // Called when Click on Close of Wallpaper Window
    function closeWindow() {
      wallpaperWindow.classList.add("hidden");
      removeTaskbarIcon1();
    }

    function removeTaskbarIcon1() {
      const icon = document.getElementById("wallpaper-icon");
      if (icon) icon.remove();
    }

// Called when Click on close of File Exploler
function closeExplorer(){
  fileExplorerWindow.classList.add("hidden");
  removeTaskbarIcon2();
}
 
function removeTaskbarIcon2() {
  const icon = document.getElementById("exploler-icon");
  if (icon) icon.remove();
}

// Called When CLick on Close of This Pc Window 
    function closeWindow1() {
      thisPcWindow.classList.add("hidden");
      removeTaskbarIcon3();
    }

    function removeTaskbarIcon3() {
      const icon = document.getElementById("Pc-icon");
      if (icon) icon.remove();
    }

// Called when Click on close of Vs code
    function closeCode(){
      vsWindow.classList.add("hidden");
      removeTaskbarIcon4();
    }

   function removeTaskbarIcon4(){
     const icon = document.getElementById("vs-icon");
     if(icon) icon.remove();
   }
 
//  Called When Click on close of Note Pad
function closePad(){
  notepadWindow.classList.add("hidden");
  removeTaskbarIcon5();
}
function removeTaskbarIcon5(){
  const icon = document.getElementById("notepad-icon");
  if(icon) icon.remove();
}
//  Called When Click on close of Recycle Bin
function closeRecycleBin() {
  recycleBinWindow.classList.add("hidden");
  removeTaskbarIcon6();
}

function removeTaskbarIcon6() {
  const icon = document.getElementById("Bin-icon");
  if (icon) icon.remove();
}

function closeChrome(){
  chromeWindow.classList.add("hidden");
  removeTaskbarIcon7()
}

function removeTaskbarIcon7() {
  const icon = document.getElementById("chrome-icon");
  if (icon) icon.remove();
}


// // CLose Functionality's End Here

// // Minimise Windows Start here 

// Called When  Click on Minimise of WallpaperWindow 
    function minimizeWindow() {
      wallpaperWindow.classList.add("hidden");
      addTaskbarIcon0();
    }

    function addTaskbarIcon0() {
      if (document.getElementById("wallpaper-icon")) return;

      const icon = document.createElement("div");
      icon.id = "wallpaper-icon";
      icon.className = "bg-transparent text-black px-3 py-4 -ml-2 rounded cursor-pointer text-sm";
      icon.innerText = "Wallpaper";

      icon.onclick = () => {
        wallpaperWindow.classList.remove("hidden");
        icon.remove();
      };

      document.getElementById("minimized-apps").appendChild(icon);
    }
// Called When  Click on Minimise of thisPcWindow 
    function minimizeWindow1() {
      thisPcWindow.classList.add("hidden");
      addTaskbarIcon1();
    }

    function addTaskbarIcon1() {
      if (document.getElementById("Pc-icon")) return;
      const icon = document.createElement("div");
      icon.id = "Pc-icon";
      icon.className = "bg-transparent  -top-3 py-2  w-[15vh] rounded cursor-pointer";
      icon.innerHTML = `<img src="assets/images/this pc.png" alt="helo" class="  h-9" />`;

      icon.onclick = () => {
        thisPcWindow.classList.remove("hidden");
        icon.remove();
      };

      document.getElementById("minimized-apps").appendChild(icon);
    }
//  Called when click on Minimise of file exploler
     function minimizeExplorer(){
      fileExplorerWindow.classList.add("hidden");
      addTaskbarIcon2();
     }
 
     function addTaskbarIcon2() {
      if (document.getElementById("exploler-icon")) return;
      const icon = document.createElement("div");
      icon.id = "exploler-icon";
      icon.className = "bg-transparent  -top-3 py-2 ml-2 w-[15vh] rounded cursor-pointer";
      icon.innerHTML = `<img src="assets/images/exploler.png" alt="helo" class="  h-9" />`;

      icon.onclick = () => {
        fileExplorerWindow.classList.remove("hidden");
        icon.remove();
      };

      document.getElementById("minimized-apps").appendChild(icon);
    }

// Called when Click on Minimised of Vs Code
  function minimizeCode(){
    vsWindow.classList.add("hidden");
    addTaskbarIcon3();
  }

 function addTaskbarIcon3(){
  if (document.getElementById("vs-icon")) return;
  const icon = document.createElement("div");
  icon.id = "vs-icon";
  icon.className = "bg-transparent  -top-3 py-2 ml-2 w-[15vh] rounded cursor-pointer";
  icon.innerHTML = `<img src="assets/images/vscode.png" alt="helo" class="  h-9" />`;

  icon.onclick = () => {
    vsWindow.classList.remove("hidden");
    icon.remove();
  };

  document.getElementById("minimized-apps").appendChild(icon);
 }
// Called when CLick on Minimise of Note Pad 
function minimizePad(){
  notepadWindow.classList.add("hidden");
    addTaskbarIcon4();
}
function addTaskbarIcon4(){
  if (document.getElementById("notepad-icon")) return;
  const icon = document.createElement("div");
  icon.id = "notepad-icon";
  icon.className = "bg-transparent  -top-3 py-2 ml-2 w-[14vh] rounded cursor-pointer";
  icon.innerHTML = `<img src="assets/images/notepad.png" alt="helo" class="  h-9" />`;

  icon.onclick = () => {
    notepadWindow.classList.remove("hidden");
    icon.remove();
  };

  document.getElementById("minimized-apps").appendChild(icon);
 }

 // Called when CLick on Minimise of Recycle Bin
function minimizeRecycleBin(){
  recycleBinWindow.classList.add("hidden");
    addTaskbarIcon5();
}
function addTaskbarIcon5(){
  if (document.getElementById("Bin-icon")) return;
  const icon = document.createElement("div");
  icon.id = "Bin-icon";
  icon.className = "bg-transparent  -top-3 py-2 ml-2 w-[14vh] rounded cursor-pointer";
  icon.innerHTML = `<img src="assets/images/recyclebinicon.png" alt="helo" class="  h-9" />`;

  icon.onclick = () => {
    recycleBinWindow.classList.remove("hidden");
    icon.remove();
  };

  document.getElementById("minimized-apps").appendChild(icon);
 }

//  Called when Click on Minimise of Chrome
function minimizeChrome(){
  chromeWindow.classList.add("hidden");
    addTaskbarIcon6();
}
function addTaskbarIcon6(){
  if (document.getElementById("chrome-icon")) return;
  const icon = document.createElement("div");
  icon.id = "Bin-icon";
  icon.className = "bg-transparent  -top-3 py-2 ml-2 w-[14vh] rounded cursor-pointer";
  icon.innerHTML = `<img src="assets/images/chrome.png" alt="helo" class="  h-8" />`;

  icon.onclick = () => {
    chromeWindow.classList.remove("hidden");
    icon.remove();
  };

  document.getElementById("minimized-apps").appendChild(icon);
 }


// // Minimise Windows End here 
  
// // Maximizes Window Start's Here
    function maximizeWindow() {
      wallpaperWindow.classList.toggle("w-screen");
      wallpaperWindow.classList.toggle("h-screen");
      wallpaperWindow.classList.toggle("top-0");
      wallpaperWindow.classList.toggle("left-0");
    }

    function maximizeWindow1() {
      thisPcWindow.classList.toggle("w-screen");
      thisPcWindow.classList.toggle("h-screen");
      thisPcWindow.classList.toggle("top-0");
      thisPcWindow.classList.toggle("left-0");
    }

    function maximizeExplorer() {
      fileExplorerWindow.classList.toggle("w-screen");
      fileExplorerWindow.classList.toggle("h-screen");
      fileExplorerWindow.classList.toggle("top-0");
      fileExplorerWindow.classList.toggle("left-0");
    }

    function maximizeCode() {
      vsWindow.classList.toggle("w-screen");
      vsWindow.classList.toggle("h-screen");
      vsWindow.classList.toggle("top-0");
      vsWindow.classList.toggle("left-0");
    }

    function maximizePad() {
      notepadWindow.classList.toggle("w-screen");
      notepadWindow.classList.toggle("h-screen");
      notepadWindow.classList.toggle("top-0");
      notepadWindow.classList.toggle("left-0");
    }

    function maximizeRecycleBin() {
      recycleBinWindow.classList.toggle("w-screen");
      recycleBinWindow.classList.toggle("h-screen");
      recycleBinWindow.classList.toggle("top-0");
      recycleBinWindow.classList.toggle("left-0");
    }

    function maximizeChrome() {
      chromeWindow.classList.toggle("w-screen");
      chromeWindow.classList.toggle("h-screen");
      chromeWindow.classList.toggle("top-0");
      chromeWindow.classList.toggle("left-0");
    }
// // Maximizes Window End's Here 

// // Drag functionality for multiple Windows 
function makeWindowDraggable(windowEl, titleBarEl) {
  let isDragging = false, offsetX = 0, offsetY = 0;

  titleBarEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = windowEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
   
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      windowEl.style.left = `${e.clientX - offsetX}px`;
      windowEl.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    
  });
}

// File exploler
makeWindowDraggable(
  document.getElementById("fileExplorerWindow"),
  document.getElementById("explorerTitleBar")
);

// Wallpaper Window
makeWindowDraggable(
  document.getElementById("wallpaperWindow"),
  document.getElementById("titleBar")
);
// This PC Window
makeWindowDraggable(
  document.getElementById("thisPcWindow"),
  document.getElementById("PcTitleBar")
);
// This vs code
makeWindowDraggable(
  document.getElementById("vsWindow"),
  document.getElementById("vsTitleBar")
);
// This note pad
makeWindowDraggable(
  document.getElementById("notepadWindow"),
  document.getElementById("notepadTitleBar")
);
// This Bin
makeWindowDraggable(
  document.getElementById("recycleBinWindow"),
  document.getElementById("recycleTitleBar")
);
// This Chrome
makeWindowDraggable(
  document.getElementById("chromeWindow"),
  document.getElementById("chromeTitleBar")
);
// This camera
makeWindowDraggable(
  document.getElementById("cameraWindow"),
  document.getElementById("cameraTitleBar")
);
// This pictures
makeWindowDraggable(
  document.getElementById("picturesWindow"),
  document.getElementById("PicturesTitleBar")
);

// Track the top z-index
let topZIndex = 1000;
// Select all windows
const windows = document.querySelectorAll('#thisPcWindow, #wallpaperWindow, #fileExplorerWindow, #vsWindow, #notepadWindow, #recycleBinWindow, #chromeWindow');
// Loop through each and add click event
windows.forEach(win => {
  win.addEventListener('mousedown', () => {
    topZIndex += 1;
    win.style.zIndex = topZIndex;
  });
});

  // brightness
  const brightnessSlider = document.getElementById("brightness-slider");
  const brightnessTarget = document.getElementById("desktop");

  brightnessSlider.addEventListener("input", () => {
    const val = brightnessSlider.value;
    brightnessTarget.style.filter = `brightness(${val}%)`;
  }); 

  // whether
  const weatherIcon = document.getElementById("weather-icon");
  const temperatureText = document.getElementById("temperature");
  const weatherDesc = document.getElementById("weather-desc");

  // Get user location
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      // Fetch weather from OpenWeatherMap
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7e4a01991b7df57003cb7f1532d37aa8&units=metric`)
        .then(res => res.json())
        .then(data => {
          const temp = Math.round(data.main.temp);
          const desc = data.weather[0].description;
          const icon = data.weather[0].icon;

          temperatureText.textContent = `${temp}°C`;
          weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
          weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        })
        .catch(err => {
          weatherDesc.textContent = "Weather error";
          console.error(err);
        });
    },
    () => {
      weatherDesc.textContent = "Location blocked";
    }
  );