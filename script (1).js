let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;
let computerPlayer = 'O';

// Initialize game board
for (let i = 0; i < 9; i++) {
    gameBoard.push('');
}

// Add event listeners to cells
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWin();
            if (!gameOver) {
                makeComputerMove();
            }
        }
    });
});

// Add event listener to reset button
document.getElementById('reset-button').addEventListener('click', () => {
    gameBoard = [];
    for (let i = 0; i < 9; i++) {
        gameBoard.push('');
    }
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameOver = false;
});

// Check for winning conditions
function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoard[combination[0]] === gameBoard[combination[1]] && gameBoard[combination[1]] === gameBoard[combination[2]] && gameBoard[combination[0]] !== '') {
            alert(`Player ${gameBoard[combination[0]]} wins!`);
            gameOver = true;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        alert('It\'s a draw!');
        gameOver = true;
    }
}

// Make computer move
function makeComputerMove() {
    let availableCells = [];
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            availableCells.push(i);
        }
    }

    let randomIndex = Math.floor(Math.random() * availableCells.length);
    let computerMove = availableCells[randomIndex];

    gameBoard[computerMove] = computerPlayer;
    document.getElementById(`cell-${computerMove}`).textContent = computerPlayer;
    checkWin();
}