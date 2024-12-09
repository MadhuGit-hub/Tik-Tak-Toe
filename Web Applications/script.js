const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.querySelector('.result-message');
const newGameButton = document.getElementById('newGameButton');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Array of background image URLs
const backgrounds = [
    'url("background1.jpg")',
    'url("background2.jpg")',
    'url("background3.jpg")'
];
let currentBackgroundIndex = 0;

// Function to change the background
function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[currentBackgroundIndex];
}

// Play sound effects
function playSound(sound) {
    sound.currentTime = 0; // Reset sound to the beginning
    sound.play();
}

// Handle cell click
function handleCellClick(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    playSound(clickSound); // Play click sound
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

// Check game result
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        showResult(`Player ${currentPlayer} has won!`);
        playSound(winSound); // Play win sound
        return;
    }

    if (!gameState.includes("")) {
        gameActive = false;
        showResult("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Show result
function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.classList.remove('hidden');
}

// Reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = "";
    });
    resultScreen.classList.add('hidden');
}

// Start a new game
function newGame() {
    resetGame();
    resultScreen.classList.add('hidden');
}

// Attach event listeners
cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell, cell.getAttribute('data-index')));
});
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);

// Change background every 10 seconds
setInterval(changeBackground, 10000);
