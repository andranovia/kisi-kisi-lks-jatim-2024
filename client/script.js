let opponentType;
let playerTwoName;
let disabledHex = 0;
const hexagonNum = 10;
const hexagonSection = 7;

const welcomeScreen = document.getElementById("welcome-screen");
const mainGame = document.getElementById("main-game");
const player1NameInput = document.getElementById("player1name");
const player2NameInput = document.getElementById("player2name");
const player = document.getElementById("player");
const bot = document.getElementById("bot");
const difficulty = document.getElementById("difficulty");
const startButton = document.getElementById("startGame");

const hexagonContainer = document.getElementById("hexagon-container");

let currentTurnPlayer = 1;
let currentTurnHexagon = {
  color: "rgb(228, 96, 96)",
  value: 0,
};

window.onload = update();

document.querySelectorAll('input[name="opponent"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.value === "player") {
      player2NameInput.style.display = "block";
      player2NameInput.required = true;
      toggleStartButton();
    } else {
      player2NameInput.style.display = "none";
      player2NameInput.required = false;
      player2NameInput.value = "";
      player1NameInput.value = "";
      difficulty.value = "";
      toggleStartButton();
    }
  });
});

player1NameInput.addEventListener("input", toggleStartButton);
player2NameInput.addEventListener("input", toggleStartButton);
difficulty.addEventListener("change", toggleStartButton);

function toggleStartButton() {
  const player1Name = player1NameInput.value.trim();
  const player2Name = player2NameInput.value.trim();
  const level = difficulty.value;

  if (
    (player.checked &&
      player1Name !== "" &&
      player2Name !== "" &&
      level !== "") ||
    (bot.checked && player1Name !== "" && level !== "")
  ) {
    if (level === "easy") {
      disabledHex = 4;
    } else if (level === "medium") {
      disabledHex = 6;
    } else if (level === "hard") {
      disabledHex = 8;
    }

    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

function startMainGame() {
  placeHexagon();
  welcomeScreen.style.display = "none";
  mainGame.style.display = "block";
}

function placeHexagon() {
  for (let i = 0; i < hexagonSection; i++) {
    const container = document.createElement("div");
    container.classList.add("hexagon-section");
    for (j = 0; j < hexagonNum; j++) {
      const hexagonal = document.createElement("div");
      const hexagonalValue = document.createTextNode("");
      hexagonal.appendChild(hexagonalValue);

      hexagonal.classList.add("hexagon");
      hexagonal.addEventListener("mouseenter", function (event) {
        // if (hexagonal.classList.contains("clicked")) {
        //   hexagonal.dataset.previousColor = event.target.style.backgroundColor;
        //   hexagonal.dataset.previousValue = hexagonalValue.nodeValue;
        // }

        if (
          !hexagonal.classList.contains("disabled-hexagon") &&
          !hexagonal.classList.contains("clicked")
        ) {
          event.target.style.backgroundColor = currentTurnHexagon.color;
          hexagonalValue.nodeValue = currentTurnHexagon.value;
        }
      });
      hexagonal.addEventListener("mouseleave", function (event) {
        if (
          !hexagonal.classList.contains("disabled-hexagon") &&
          !hexagonal.classList.contains("clicked")
        ) {
          event.target.style.backgroundColor = "rgb(240, 248, 255)";
          hexagonalValue.nodeValue = "";
        }
      });
      hexagonal.addEventListener("click", function (event) {
        if (!hexagonal.classList.contains("disabled-hexagon")) {
          event.target.classList.add("clicked");
          event.target.style.backgroundColor = currentTurnHexagon.color;
          hexagonalValue.nodeValue = currentTurnHexagon.value;

          const sameRowHexagon =
            hexagonContainer.querySelectorAll(".hexagon-section")[i];
          const hexagonRow = sameRowHexagon.querySelectorAll(".hexagon");
          const index = Array.from(hexagonRow).indexOf(event.target);
          const leftAdjacent =
            sameRowHexagon.querySelectorAll(".hexagon")[index - 1];
          const rightAdjacent =
            sameRowHexagon.querySelectorAll(".hexagon")[index + 1];

          if (
            leftAdjacent &&
            leftAdjacent !== undefined &&
            leftAdjacent.style.backgroundColor === currentTurnHexagon.color
          ) {
            leftAdjacent.innerHTML++;
          } else if (
            rightAdjacent &&
            rightAdjacent !== undefined &&
            rightAdjacent.style.backgroundColor === currentTurnHexagon.color
          ) {
            rightAdjacent.innerHTML++;
          }

          if (
            leftAdjacent &&
            leftAdjacent.innerHTML !== "" &&
            parseInt(
              sameRowHexagon.querySelectorAll(".hexagon")[index].innerHTML
            ) > parseInt(leftAdjacent.innerHTML)
          ) {
            leftAdjacent.style.backgroundColor = currentTurnHexagon.color;
          }

          if (currentTurnPlayer === 1) {
            currentTurnPlayer = 2;
            setInterval(botMoves(), 2000);
          } else {
            currentTurnPlayer = 1;
          }
          update();
        }

        hexagonal.removeEventListener("click", arguments.callee);
      });

      if (disabledHex > 0) {
        const disabled = Math.random() < 0.5;

        if (disabled) {
          hexagonal.classList.remove("hexagon");
          hexagonal.classList.add("disabled-hexagon");
          disabledHex--;
        } else {
        }
      }
      container.appendChild(hexagonal);
    }
    hexagonContainer.appendChild(container);
  }
}

function update() {
  currentTurnHexagon.value = Math.floor(Math.random() * 20) + 1;
  const pointText = document.getElementById("current-hexagon-value");
  const currentHexagon = document.getElementById("current-hexagon");
  if (currentTurnPlayer === 1) {
    currentTurnHexagon.color = "rgb(228, 96, 96)";
  } else if (currentTurnPlayer === 2) {
    currentTurnHexagon.color = "rgb(90, 207, 237)";
  }
  currentHexagon.style.backgroundColor = currentTurnHexagon.color;
  pointText.innerHTML = currentTurnHexagon.value;
}

function botMoves() {
  update();
  const availableHexagon = document.querySelectorAll(
    ".hexagon:not(.disabled-hexagon)"
  );
  const randomIndex = Math.floor(Math.random() * availableHexagon.length);
  const clickedHexagon = availableHexagon[randomIndex];

  clickedHexagon.click();
}
