/*----- constants -----*/
const playerColors = {
    "1": "var(--main-minus-two)",    // player1
    "-1": "var(--main-plus-one)"    // player2
}; 

/*----- app's state (variables) -----*/
let board; 
let turn; 
let winner; 

/*----- cached element references -----*/
const cellsArr = Array.from(document.querySelectorAll(".ttt-panel"));
const display = document.getElementById("playersTurn");

/*----- event listeners -----*/
document.getElementById("ticTacToeBoard").addEventListener("click", function(e) {
    event.preventDefault(); 
    const cell = e.target; 
    handleClick(cell);
    render(); 
});

/*----- functions -----*/

function init() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    turn = 1; 
    winner = null; 
    cellsArr.forEach(function(cell) {
        cell.style.backgroundColor = "var(--main-plus-two)";
    });
    render();
};

function render() {
    updateTurn();
    updateBoard(cellsArr); 
    winnerColors(winnerCheck()); 
    checkScratch();
};

function updateTurn() {
    if (turn === 1) {
        const heading = `Player 1's turn`;
        updateDisplay(turn, heading);
    } else {
        const heading = `Player 2's turn`;
        updateDisplay(turn, heading);
    }
};

function updateDisplay(turn, heading) {
    if (!winner) {
        display.innerText = heading; 
        display.style.color = playerColors[turn];
    };
};

function updateArray(cell) {
    board.forEach(function(row) {
        const rowIdx = board.indexOf(row);
        for (let i = 0; i < row.length; i++) {
            const colIdx = i;
            if (cell.id === `r${rowIdx}c${colIdx}`) {
                if (board[rowIdx][colIdx] !== null) return; 
                row[colIdx] = turn; 
                turn *= -1; 
                winnerCheck(); 
            };
        };
    });      
};
    
    
function updateBoard(cellsArr) {
    board.forEach(function(row) {
        const rowIdx = board.indexOf(row);
        for (let i = 0; i < row.length; i++) {
            const colIdx = i;
            cellsArr.forEach(function(cell) {
                if (cell.id === `r${rowIdx}c${colIdx}`) {
                    if (board[rowIdx][colIdx] === 1) {
                        cell.innerText = "X";
                        cell.style.color = playerColors[1];
                    } else if (board[rowIdx][colIdx] === -1) {
                        cell.innerText = "O";
                        cell.style.color = playerColors[-1];
                    } else {
                        cell.innerText = "";
                    }
                }
            });
        };
    });
};

function handleClick(cell) {
    // click on reset button
    if (cell.tagName === "BUTTON") init(); 
    // do nothing if user clicks outside of gameboard
    if (!Array.from(cell.classList).includes("ttt-panel")) return;
    // click on cells:
    if (!board) init(); // start game if player 1 clicks on board
    updateArray(cell);
};

function winnerCheck() {
    let winningCells = [];
    // check for horizontal winner
    board.forEach(function(row) {
        if (counter(row) === 3) {
            winner = row[0];
            for (let c = 0; c < row.length; c++) {
                winningCells.push(`r${board.indexOf(row)}c${c}`);
            };
        }; 
    });
    // check for vertical winner
    for (let c = 0; c < board[0].length; c++) {
        let arr = [board[0][c], board[1][c], board[2][c]];
        if (counter(arr) === 3) {
            winner = board[0][c];
            winningCells = [`r0c${c}`, `r1c${c}`, `r2c${c}`];
        };
    };
    // check for diagonal winner
    let arr = [board[0][0], board[1][1], board[2][2]];
    if (counter(arr) === 3) {
        winner = board[1][1];
        winningCells = ["r0c0", "r1c1", "r2c2"];
    } else {
        arr = [board[0][2], board[1][1], board[2][0]];
        if (counter(arr) === 3) {
            winner = board[1][1];
            winningCells = ["r0c2", "r1c1", "r2c0"];
        };
    };
    // stop game if winner, and display winner
    if (winner) {
        if (winner === 1) {
            display.innerText = "Player 1 Wins!";
        } else if (winner === -1) {
            display.innerText = "Player 2 Wins!";
        };
        display.style.color = playerColors[winner];
        turn = null; 
    };
    return winningCells; 
};

function counter(arr) {
    let counter = 0; 
    for (let i = 0; i < arr.length; i++) {
        counter += arr[i];
    };
    return Math.abs(counter); 
};

function winnerColors(winningCells) {
    if (winner) {
        winningCells.forEach(function(cellId) {
            const cell = document.getElementById(`${cellId}`);
            cell.style.color = "green";
            cell.style.backgroundColor = "var(--main-minus-one)";
        });
    };
};

function checkScratch() {
    if (!board[0].includes(null)
    && !board[1].includes(null)
    && !board[2].includes(null)
    && !winner
    ) {
        display.innerText = "Scratch!"
    }
};