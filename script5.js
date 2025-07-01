// === CAMERA FUNCTIONALITY ===
const video = document.getElementById('cameraStream');
const captureBtn = document.getElementById('captureBtn');
const photoResult = document.getElementById('photoResult');
const picturesGallery = document.getElementById('picturesGallery');

let photoStorage = [];

// Start webcam
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied or unavailable.");
    console.error(err);
  }
}

// Capture photo and auto-save
captureBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');

  // Show preview
  photoResult.src = dataUrl;
  photoResult.classList.remove('hidden');

  // Save to Pictures folder
  saveToPicturesFolder(dataUrl);
});

// Save captured image to Pictures folder
function saveToPicturesFolder(imageDataUrl) {
  // Save in memory (or localStorage if needed)
  photoStorage.push(imageDataUrl);

  // Create image element
  const img = document.createElement('img');
  img.src = imageDataUrl;
  img.className = "rounded-xl shadow-md border border-gray-300 cursor-pointer hover:scale-105 transition-all duration-200";

  // Optional: click to open in new window
  img.onclick = () => {
    const w = window.open();
    w.document.write(`<img src="${imageDataUrl}" style="width:100%">`);
  };

  // Add to the gallery
  picturesGallery.appendChild(img);
}

// === CAMERA WINDOW HANDLING ===
function openCameraWindow() {
  const win6 = document.getElementById("cameraWindow");
  win6.classList.remove("hidden");
  startCamera(); // Start camera when window opens
}

function closeCamera() {
  cameraWindow.classList.add("hidden");
  removeTaskbarIcon8();
}

function removeTaskbarIcon8() {
  const icon = document.getElementById("camera-icon");
  if (icon) icon.remove();
}

function minimizeCamera() {
  cameraWindow.classList.add("hidden");
  addTaskbarIcon7();
}

function addTaskbarIcon7() {
  if (document.getElementById("camera-icon")) return;

  const icon = document.createElement("div");
  icon.id = "camera-icon";
  icon.className = "bg-transparent text-black py-2 w-[5vh] rounded cursor-pointer";
  icon.innerHTML = `<img src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-golden-photography-wing-camera-logo-png-image_6007201.png"  class="  h-9" />`;

  icon.onclick = () => {
    cameraWindow.classList.remove("hidden");
    icon.remove();
  };

  document.getElementById("minimized-apps").appendChild(icon);
}


function maximizeCamera() {
  cameraWindow.classList.toggle("w-screen");
  cameraWindow.classList.toggle("h-screen");
  cameraWindow.classList.toggle("top-0");
  cameraWindow.classList.toggle("left-0");
}



// === PICTURES WINDOW HANDLING ===
function openPictureWindow() {
  const win7 = document.getElementById("picturesWindow");
  win7.classList.remove("hidden");
}
function closePic() {
  picturesWindow.classList.add("hidden");
  removeTaskbarIcon9();
}

function removeTaskbarIcon9() {
  const icon = document.getElementById("picture-icon");
  if (icon) icon.remove();
}

function minimizePic() {
  picturesWindow.classList.add("hidden");
  addTaskbarIcon8();
}

function addTaskbarIcon8() {
  if (document.getElementById("picture-icon")) return;

  const icon = document.createElement("div");
  icon.id = "picture-icon";
  icon.className = "bg-transparent text-black  py-2 w-[5vh] rounded cursor-pointer text-sm";
  icon.innerHTML = `<img src="https://static.vecteezy.com/system/resources/thumbnails/032/846/286/small_2x/3d-rendering-illustration-of-folder-icon-with-paper-document-simple-paper-folder-icon-folder-3d-render-icon-3d-render-illustration-png.png" class="  h-9" />`;

  icon.onclick = () => {
    picturesWindow.classList.remove("hidden");
    icon.remove();
  };

  document.getElementById("minimized-apps").appendChild(icon);
}


function maximizePic() {
  picturesWindow.classList.toggle("w-screen");
  picturesWindow.classList.toggle("h-screen");
  picturesWindow.classList.toggle("top-0");
  picturesWindow.classList.toggle("left-0");
}
