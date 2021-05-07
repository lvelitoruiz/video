const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = window.width;
canvas.height = window.height;
console.log(navigator.mediaDevices);

const constraints = {
    Audio: true,
    video: true
};

const button = document.querySelector('button');
button.addEventListener('click', streamVideo);

function streamVideo() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  requestAnimationFrame(streamVideo);
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.fillStyle = "#888"; // gray colour
  canvas.globalAlpha = 1;   // amount of FX
  canvas.globalCompositeOperation = "color";  // The comp setting to do BLACK/WHITE
  canvas.fillRect(0,0,canvas.width,canvas.height);  // Draw gray over the video
  canvas.globalAlpha = 1;  // reset alpha
  canvas.globalCompositeOperation = "source-over";
};

function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
    streamVideo();
}

function handleError() {
    console.log('Tenemos un error aquí.');
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

