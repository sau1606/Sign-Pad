const canvas = document.querySelector("canvas");
const form = document.querySelector(".sign-pad-form");
const clear = document.querySelector(".clear-button");
const ctx = canvas.getContext("2d");
let writingMode = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const imageURL = canvas.toDataURL();
  const image = document.createElement("img");
  image.src = imageURL;
  image.height = canvas.height;
  image.width = canvas.width;
  image.style.display = "block";
  form.appendChild(image);
  clearPad();
});

clear.addEventListener("click", (e) => {
  e.preventDefault();

  clearPad();
});

const clearPad = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const getTargetPosition = (e) => {
    positionX = e.clientX - e.target.getBoundingClientRect().x;
    positionY = e.clientY - e.target.getBoundingClientRect().y;

    return [positionX, positionY];
}

const handlePointerMove = (e) => {
    if(!writingMode) return;

    const [positionX, positionY] = getTargetPosition(e);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
}

const handlePointerUp = () => {
    writingMode = false;
}

const handlePointerDown = (e) => {
  writingMode = true;
  ctx.beginPath();

  const [positionX, positionY] = getTargetPosition(e);
  ctx.moveTo(positionX, positionY);
};

const handleTouchMove = (e) => {
    if(!writingMode) return;

    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    const [positionX, positionY] = getTargetPosition(touch);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
}

const handleTouchEnd = () => {
    writingMode = false;
}

const handleTouchStart = (e) => {
    writingMode = true;
    ctx.beginPath();

    const touch = e.touches[0];
    const [positionX, positionY] = getTargetPosition(touch);
    ctx.moveTo(positionX, positionY);
};

ctx.lineWidth = 3;
ctx.lineJoin = ctx.linecap = "round";

canvas.addEventListener("pointerdown", handlePointerDown, {passive: true});
canvas.addEventListener("pointerup", handlePointerUp, {passive: true});
canvas.addEventListener("pointermove", handlePointerMove, {passive: true});

canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
