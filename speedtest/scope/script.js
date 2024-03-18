const box = document.getElementById("box");

let offsetX, offsetY, isDragging;

box.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

function startDrag(e) {
  isDragging = true;
  offsetX = e.clientX - box.getBoundingClientRect().left;
  offsetY = e.clientY - box.getBoundingClientRect().top;
}

function drag(e) {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    box.style.left = x + "px";
    box.style.top = y + "px";
  }
}

function stopDrag() {
  isDragging = false;
}
