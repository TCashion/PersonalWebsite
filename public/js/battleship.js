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

let turnBs;
let winnerBs;
let playerOneShips;
let playerTwoShips;
let playerTwoDisplay;
let playerTwoRadar;
let engageAi;                 
let aiHits;
let shipIdentified;

/*----- cached element references -----*/

const playerOneRadarDivs = document.getElementById("playerOneRadar");
const playerOneDisplayDivs = document.getElementById("playerOneDisplay");
const targetDisplay = document.getElementsByClassName("battleship-target-display")[0];
class Ship {
    constructor(type, identifier, length, hitSpaces, alive) {
        this.type = type; 
        this.identifier = identifier;
        this.length = length; 
        this.hitSpaces = hitSpaces;
        this.alive = true;
    } 
};



/*----- event listeners -----*/

targetDisplay.addEventListener("click", function(e) {
    e.preventDefault(); 
    
})

/*----- functions -----*/

function initBs() {
    turnBs = 1; 
    const boardArr = [
        [null, null, null, null],
        [null, 1, 1, 1],
        [null, null, null, null],
        [null, null, null, null]
    ]; // for now, this is a set board. future dev will have random ship layout
    createShips();
    addShipsToBoard(boardArr);
    renderBs(); 
}

function renderBs() {
    console.log("Render");
};

function createShips() {
    playerOneShips = [];
    playerTwoShips= [];
    const carrier = new Ship("carrier", "A", 5, 0 ,true);
    const battleship = new Ship("battleship", "B", 4, 0 ,true);
    const cruiser = new Ship("cruiser", "C", 3, 0 ,true);
    const submarine = new Ship("submarine", "S", 3, 0 ,true);
    const destroyer = new Ship("destroyer", "D", 2, 0 ,true);
    playerOneShips.push(carrier, battleship, cruiser, submarine, destroyer);
    playerTwoShips.push(carrier, battleship, cruiser, submarine, destroyer);
};

function addShipsToBoard(boardArr) {      
    const locationCoordinates = [
        {"x": 1,
        "y": 1},
        {"x": 2,
        "y": 1},
        {"x": 3,
        "y": 1},
    ]
    // playerOneShips.locationCoordinates = locationCoordinates;
    // playerTwoShips.locationCoordinates = locationCoordinates;
    playerOneDisplay = boardArr;
    playerOneRadar = boardArr;
    playerTwoDisplay = boardArr; 
    playerTwoRadar = boardArr;
};