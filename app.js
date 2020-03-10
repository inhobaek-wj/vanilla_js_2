const canvas = document.getElementById("js-canvas");
const colors = document.getElementsByClassName("controls-color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-fill");

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
}

// context makes us to manipulate pixels inside the canvas.
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
}

const handleRangeChange = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
};
