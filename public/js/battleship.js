/*----- constants -----*/

const battleshipPlayerColors = {
    "1": "var(--main-minus-one)",         // player1
    "-1": "var(--main-color)"             // player2
};
const hitMissColors = {
    "null": "var(--main-plus-one)",
    "miss": "var(--main-plus-two)",
    "hit": "orange",
    "ship": "var(--main-minus-two)"
};
boardLength = 4;

/*----- app's state (variables) -----*/

let bsTurn;
let bsWinner;
let playerOneShips;
let playerTwoShips;
let playerTwoDisplay;
let playerTwoRadar;
let engageAi;                 
let aiHits;
let shipIdentified;

/*----- cached element references -----*/

const playerOneRadar = document.getElementById("playerOneRadar");
const playerOneDisplay = document.getElementById("playerOneDisplay");
const targetDisplay = document.getElementsByClassName("battleship-target-display");

/*----- event listeners -----*/


/*----- functions -----*/

// create gameboard on page load
function createBoard(boardLength) {
    for (let i = 0; i <= boardLength; i++) {
        const div = document.createElement("div");
        div.style.height = "20px";
        div.style.width = "20px";
        div.style.backgroundColor = "black";
        playerOneRadar.append(div);
    }
}
createBoard(boardLength);

// make a grid layout 