document.addEventListener("DOMContentLoaded", function() {

    // **************
    // GAMEBOARD CODE
    // **************


    // *** Tic-Tac-Toe: ***

    var userTurn = 0;
    var panels = document.querySelectorAll(".panel");
    var playerDisplay = document.querySelector("#player");
    var matrix = ["","","","","","","","",""];

    // change color for winner
    var winnerColors = (...indexes) => {
        var winner = [...indexes];
        for (let j = 0; j < winner.length; j++) {
            panels[winner[j]].classList += " winner-colors";
        };
    };

    // determine winner
    var determineWinner = () => {
        if(matrix[0] !== "" && matrix[0] === matrix[1] && matrix[1] === matrix[2]) {
            winnerColors(0,1,2);
        } else if (matrix[3] !== "" && matrix[3] === matrix[4] && matrix[4] === matrix[5]) {
            winnerColors(3,4,5);
        } else if (matrix[6] !== "" && matrix[6] === matrix[7] && matrix[7] === matrix[8]) {
            winnerColors(6,7,8);
        } else if (matrix[0] !== "" && matrix[0] === matrix[4] && matrix[4] === matrix[8]) {
            winnerColors(0,4,8);
        } else if (matrix[2] !== "" && matrix[2] === matrix[4] && matrix[4] === matrix[6]) {
            winnerColors(2,4,6);
        } else if (matrix[0] !== "" && matrix[0] === matrix[3] && matrix[3] === matrix[6]) {
            winnerColors(0,3,6);
        } else if (matrix[1] !== "" && matrix[1] === matrix[4] && matrix[4] === matrix[7]) {
            winnerColors(1,4,7);
        } else if (matrix[2] !== "" && matrix[2] === matrix[5] && matrix[5] === matrix[8]) {
            winnerColors(2,5,8);
        };
    };

    // reset board
    const reset = () => {
        userTurn = 0;
        matrix = ["","","","","","","","",""];
        playerDisplay.innerHTML = "Player 1 (X)";
        for (let i = 0; i < panels.length; i++) {
            panels[i].innerHTML=""; 
            panels[i].classList.remove("winner-colors");
            panels[i].classList.remove("X");
            panels[i].classList.remove("O");
        };
    };
    
    // add X or O based on user selection
    for (let i =0; i < panels.length; i++) {
        panels[i].addEventListener("click", () => {
            if (userTurn % 2 === 0 && panels[i].innerHTML === "") {
                panels[i].innerHTML = "X";
                panels[i].classList += " X";
                userTurn += 1;
                playerDisplay.innerHTML = "Player 2 (O)";
                matrix[i] = panels[i].innerHTML;
                determineWinner(); 
            } else if (userTurn %2 === 1 && panels[i].innerHTML === "") {
                panels[i].innerHTML = "O";
                panels[i].classList += " O";
                userTurn += 1;
                playerDisplay.innerHTML = "Player 1 (X)";
                matrix[i] = panels[i].innerHTML;
                determineWinner(); 
            };
        });
    };

    document.getElementById("TTT-button").addEventListener("click", () => {
        reset(); 
    });

    // *** END Tic-Tac-Toe ***

    // **************
    // END GAMEBOARD CODE
    // **************

});







// refactor 


/*----- constants -----*/

/*----- app's state (variables) -----*/

/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/