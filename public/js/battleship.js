/*----- constants -----*/

const battleshipPlayerColors = {
    "1": "var(--main-minus-one)",         // player1
    "-1": "var(--main-color)"             // player2
};
const boardColors = {
    "null": "var(--main-plus-one)",
    "-1": "var(--main-plus-two)",
    "1": "orange",
    "0": "var(--main-minus-one)"
};
boardLength = 4;

/*----- app's state (variables) -----*/

let turnBs;
let winnerBs;
let playerOneShips;
let playerTwoShips;
let playerOneShipLayout;
let playerTwoShipLayout;
// let playerTwoRadar; // doesn't do anything?? 
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
    createShips();
    addShipsToBoard();
    renderBs(playerOneShipLayout, playerTwoShipLayout);
}

function renderBs(playerOneShipLayout, playerTwoShipLayout) {
    parseColors(playerOneShipLayout);
    parseColors(playerTwoShipLayout);
};

function parseColors(shipLayout) {
    for (let r = 0; r < shipLayout.length; r++) {
        const rowIdx = r; 
        for (let c = 0; c < shipLayout[r].length; c++) {
            const colIdx = c; 
            generateBoardColors(shipLayout, rowIdx, colIdx);
        };
    };
}

function generateBoardColors(shipLayout, rowIdx, colIdx) {
        // rowIdx and colIdx transposed on these two so that board matches array
    let shipLayoutPosition = shipLayout[rowIdx][colIdx];
    const divColor = boardColors[shipLayoutPosition];
    const radarDiv = document.getElementById(`x${colIdx}y${rowIdx}`); 
    const displayDiv = document.getElementById(`X${colIdx}Y${rowIdx}`);
    // player one ship display
    displayDiv.setAttribute("style", `background-color: ${divColor}`); 
    
    // player one radar: hides enemy ship colors 
    if (shipLayoutPosition === 0) {
        radarDiv.setAttribute("style", `background-color: ${boardColors["null"]}`); 
    } else {
        radarDiv.setAttribute("style", `background-color: ${divColor}`); 
    }
}

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

function addShipsToBoard() {      
    const direction = randomNumber(1);
    const startingX = randomNumber(boardLength - 1);
    const startingY = randomNumber(boardLength - 1);
    const boardArr = [
        [null, null, null, null],
        [null, 0, 0, 0],
        [null, null, null, null],
        [null, null, null, null]
    ]; // for now, this is a set board. future dev will have random ship layout
    playerOneShipLayout = boardArr;
    playerTwoShipLayout = boardArr; 
    
    
    layoutCarrier(direction, startingX, startingY);
    
    // pick up here. above demostrates how to access the board. need to now distinguish between playerboards. Maybe just pass playerOneBoard and playerTwoBoard as arguments?




    // const locationCoordinates = [
    //     {"x": 1,
    //     "y": 1},
    //     {"x": 2,
    //     "y": 1},
    //     {"x": 3,
    //     "y": 1},
    // ]
    // playerOneShips.locationCoordinates = locationCoordinates;
    // playerTwoShips.locationCoordinates = locationCoordinates;
    
};

function layoutCarrier(direction, startingX, startingY) {
    // to test
    playerOneShipLayout[startingX][startingY] = 1;
}

function randomNumber (max) {
    return Math.round(Math.random()*Math.floor(max));
}