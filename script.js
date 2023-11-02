const statusDisplay = document.querySelector(".game--status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => "Game ended in a draw";
const currentPlayerTurn =  () => `It's ${currentPlayer}'s turn!`;

statusDisplay.innerText = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function handleCellPlayed(clickedCell, i) {
  gameState[i] = currentPlayer;
  clickedCell.innerText = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i];

    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(e) {
  const clickedCell = e.target;
  const index = parseInt(clickedCell.dataset.index);

  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, index);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);