const circleInput = document.getElementById("circle-input");
const container = document.querySelector(".container");

circleInput.addEventListener("input", () => {
  const value = circleInput.value;

  container.style.setProperty("--position", value + "%");
});
