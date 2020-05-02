// document.addEventListener("DOMContentLoaded", function() {

//     // **************
//     // GAMEBOARD CODE
//     // **************


//     // *** Tic-Tac-Toe: ***

//     var userTurn = 0;
//     var panels = document.querySelectorAll(".panel");
//     var playerDisplay = document.querySelector("#player");
//     var matrix = ["","","","","","","","",""];

//     // change color for winner
//     var winnerColors = (...indexes) => {
//         var winner = [...indexes];
//         for (let j = 0; j < winner.length; j++) {
//             panels[winner[j]].classList += " winner-colors";
//         };
//     };

//     // determine winner
//     var determineWinner = () => {
//         if(matrix[0] !== "" && matrix[0] === matrix[1] && matrix[1] === matrix[2]) {
//             winnerColors(0,1,2);
//         } else if (matrix[3] !== "" && matrix[3] === matrix[4] && matrix[4] === matrix[5]) {
//             winnerColors(3,4,5);
//         } else if (matrix[6] !== "" && matrix[6] === matrix[7] && matrix[7] === matrix[8]) {
//             winnerColors(6,7,8);
//         } else if (matrix[0] !== "" && matrix[0] === matrix[4] && matrix[4] === matrix[8]) {
//             winnerColors(0,4,8);
//         } else if (matrix[2] !== "" && matrix[2] === matrix[4] && matrix[4] === matrix[6]) {
//             winnerColors(2,4,6);
//         } else if (matrix[0] !== "" && matrix[0] === matrix[3] && matrix[3] === matrix[6]) {
//             winnerColors(0,3,6);
//         } else if (matrix[1] !== "" && matrix[1] === matrix[4] && matrix[4] === matrix[7]) {
//             winnerColors(1,4,7);
//         } else if (matrix[2] !== "" && matrix[2] === matrix[5] && matrix[5] === matrix[8]) {
//             winnerColors(2,5,8);
//         };
//     };

//     // reset board
//     const reset = () => {
//         userTurn = 0;
//         matrix = ["","","","","","","","",""];
//         playerDisplay.innerHTML = "Player 1 (X)";
//         for (let i = 0; i < panels.length; i++) {
//             panels[i].innerHTML=""; 
//             panels[i].classList.remove("winner-colors");
//             panels[i].classList.remove("X");
//             panels[i].classList.remove("O");
//         };
//     };
    
//     // add X or O based on user selection
//     for (let i =0; i < panels.length; i++) {
//         panels[i].addEventListener("click", () => {
//             if (userTurn % 2 === 0 && panels[i].innerHTML === "") {
//                 panels[i].innerHTML = "X";
//                 panels[i].classList += " X";
//                 userTurn += 1;
//                 playerDisplay.innerHTML = "Player 2 (O)";
//                 matrix[i] = panels[i].innerHTML;
//                 determineWinner(); 
//             } else if (userTurn %2 === 1 && panels[i].innerHTML === "") {
//                 panels[i].innerHTML = "O";
//                 panels[i].classList += " O";
//                 userTurn += 1;
//                 playerDisplay.innerHTML = "Player 1 (X)";
//                 matrix[i] = panels[i].innerHTML;
//                 determineWinner(); 
//             };
//         });
//     };

//     document.getElementById("TTT-button").addEventListener("click", () => {
//         reset(); 
//     });

//     // *** END Tic-Tac-Toe ***

//     // **************
//     // END GAMEBOARD CODE
//     // **************

// });







// refactor 
// document.addEventListener("DOMContentLoaded", function() {

    
    /*----- constants -----*/
    const playerColors = {
        "1": "var(--main-minus-two)",    // player1
        "-1": "var(--main-plus-one)"    // player2
    }; 

    // const winners = [
    //     [board[0][0], board[0][1], board[0][2]]
    //     [board[1][0], board[1][1], board[1][2]]
    //     [board[2][0], board[2][1], board[2][2]]
    //     [board[0][0], board[1][0], board[2][0]]
    //     [board[0][1], board[1][1], board[2][1]]
    //     [board[0][2], board[1][2], board[2][2]]
    //     [board[0][0], board[1][1], board[2][2]]
    //     [board[0][2], board[1][1], board[2][0]]
    // ];
    
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
        render();
    };

    function render() {
        updateTurn();
        updateBoard(cellsArr); 
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
        // check for horizontal winner
        board.forEach(function(row) {
            if (counter(row) === 3) {
                winner = row[0];
            }; 
        });
        
        // check for vertical winner
        if (!winner) {
            for (let c = 0; c < board[0].length; c++) {
                let arr = [board[0][c], board[1][c], board[2][c]];
                if (counter(arr) === 3) {
                    winner = board[0][c];
                };
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
    }

    function counter(arr) {
        let counter = 0; 
        for (let i = 0; i < arr.length; i++) {
            counter += arr[i];
        }
        return Math.abs(counter); 
    }
    

// });