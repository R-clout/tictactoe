const cells = document.querySelectorAll("#data-cell")
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let gameState = ['','','','','','','','',''];
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
let running = true;





const handleCellClick = (event) => {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if(gameState[cellIndex] !== '' || !running){
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;


    if(checkWin()){
        gameStatus.textContent = `${currentPlayer} wins!`;
        running = false;
        return;
    }

    if(gameState.every(cell => cell !=='')){
        gameStatus.textContent = 'Draw!';
        running = false;
        return;
    }


    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}



function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}


function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    running = true;
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));