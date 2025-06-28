let zoom = 1;
  const editor = document.getElementById('editor');
  const pad = document.getElementById('notepadWindow');

  function updateZoom() {
    editor.style.fontSize = `${16 * zoom}px`;
  }
  function newNote() {
    editor.value = '';
    zoom = 1;
    updateZoom();
  }
  function resetNote() {
    if (confirm('Clear content?')) newNote();
  }
  function saveNote() {
    const blob = new Blob([editor.value], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'note.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function zoomIn() {
    zoom = Math.min(2, zoom + 0.1);
    updateZoom();
  }
  function zoomOut() {
    zoom = Math.max(0.5, zoom - 0.1);
    updateZoom();
  }
  