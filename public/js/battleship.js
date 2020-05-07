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
    // const boardArr = [
    //     [null, null, null, null],
    //     [null, 0, 0, 0],
    //     [null, null, null, null],
    //     [null, null, null, null]
    // ]; // for now, this is a set board. future dev will have random ship layout
    createShips();
    addShipsToBoard();
    renderBs(playerOneShipLayout);
}

function renderBs(boardArr) {
    for (let r = 0; r < boardArr.length; r++) {
        const rowIdx = r; 
        for (let c = 0; c < boardArr[r].length; c++) {
            const colIdx = c; 
            generateBoardColors(boardArr, rowIdx, colIdx);
            // generateBoardColors(playerOneShipLayout, rowIdx, colIdx)
        };
    };
};

function generateBoardColors(boardArr, rowIdx, colIdx) {
        // rowIdx and colIdx transposed on these two so that board matches array
    let boardArrPostion = boardArr[rowIdx][colIdx];
    const divColor = boardColors[boardArrPostion];
    const radarDiv = document.getElementById(`x${colIdx}y${rowIdx}`); 
    const displayDiv = document.getElementById(`X${colIdx}Y${rowIdx}`);
    // player one ship display
    displayDiv.setAttribute("style", `background-color: ${divColor}`); 
    
    // player one radar: hides enemy ship colors 
    if (boardArrPostion === 0) {
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
    const boardArr = [
        [null, null, null, null],
        [null, 0, 0, 0],
        [null, null, null, null],
        [null, null, null, null]
    ];
    boardArr[0][0] = "test";
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
    playerOneShipLayout = boardArr;
    playerTwoShipLayout = boardArr; 
};

function randomNumber (max) {
    return Math.round(Math.random()*Math.floor(max));
}