const canvas = document.getElementById("js-canvas");
const colors = document.getElementsByClassName("controls-color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-fill");
const save = document.getElementById("js-save");

canvas.width = 700;
canvas.height = 700;

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCanvasCM);
}

if (mode) {
  mode.addEventListener("click", handleFillClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

// context makes us to manipulate pixels inside the canvas.
const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "#2c2c2c";
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
};

function handleFillClick(event) {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

function handleCanvasCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

function init() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

init();
