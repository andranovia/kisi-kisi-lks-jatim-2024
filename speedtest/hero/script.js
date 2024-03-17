const feature = document.getElementById("feature");
const featureDropdownContainer = document.querySelector(
  ".feature-dropdown-container"
);
const featureDropdown = document.getElementById("feature-dropdown");

let featureHovered = false;

feature.addEventListener("mouseenter", function () {
  featureDropdown.style.opacity = "1";
  featureDropdown.style.transform = "translateY(0px)";
  featureHovered = true;
});

feature.addEventListener("mouseleave", function () {
  featureDropdownContainer.addEventListener("mouseenter", function () {
    if (featureHovered === true) {
      featureDropdown.style.opacity = "1";
      featureDropdown.style.transform = "translateY(0px)";
    }
  });
  featureDropdownContainer.addEventListener("mouseleave", function () {
    featureDropdown.style.opacity = "0";
    featureDropdown.style.transform = "translateY(0px)";
    featureHovered = false;
  });

  featureDropdown.style.opacity = "0";
  featureDropdown.style.transform = "translateY(0px)";
});
