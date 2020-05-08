/*----- constants -----*/

const battleshipPlayerColors = {
    "1": "var(--main-minus-one)",         // player1
    "-1": "var(--main-color)"             // player2
};
const boardColors = {
    "null": "var(--main-plus-one)",
    "-1": "var(--main-plus-two)",
    "1": "orange",
    "A": "var(--main-minus-one)",
    "B": "var(--main-minus-one)",
    "C": "var(--main-minus-one)",
    "S": "var(--main-minus-one)",
    "D": "var(--main-minus-one)"
};
boardLength = 10;

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
    playerOneShipLayout = defineBoard(playerOneShipLayout);
    playerTwoShipLayout = defineBoard(playerTwoShipLayout);
    addShipsToBoard();
    renderBs(playerOneShipLayout, playerTwoShipLayout);
}

function renderBs(playerOneShipLayout, playerTwoShipLayout) {
    matchArraysToDom(playerOneShipLayout);
    matchArraysToDom(playerTwoShipLayout);
};

function defineBoard(playerXShipLayout) {
    playerXShipLayout = [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ];
    return playerXShipLayout;
};
 
function matchArraysToDom(shipLayout) {
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
    if (shipLayout === playerOneShipLayout) {
        displayDiv.setAttribute("style", `background-color: ${divColor}`); 
    };
    if (shipLayout === playerTwoShipLayout) {
        // hides enemy ship colors from player one
        if (typeof shipLayoutPosition === "string") {
            radarDiv.setAttribute("style", `background-color: ${boardColors["null"]}`); 
        } else {
            radarDiv.setAttribute("style", `background-color: ${divColor}`); 
        };
    };  
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

function addShipsToBoard() {      
    playerOneShips.forEach(function(ship) {
        layoutShip(1, ship)
    });
    playerOneShips.forEach(function(ship) {
        layoutShip(-1, ship)
    });
};

function layoutShip(player, ship) {
    const direction = randomNumber(1);
    const startingX = randomNumber(boardLength - ship.length);
    const startingY = randomNumber(boardLength - ship.length);
    let playerBoardToAddShip;
    if (player === 1) playerBoardToAddShip = playerOneShipLayout;
    if (player === -1) playerBoardToAddShip = playerTwoShipLayout;

    if (direction === 1) {
        parseShipVert(playerBoardToAddShip, startingX, startingY, ship);
    };
    if (direction === 0) {
        parseShipHoriz(playerBoardToAddShip, startingX, startingY, ship);
    }
}

function randomNumber (max) {
    return Math.round(Math.random()*Math.floor(max));
}

function parseShipVert(playerBoardToAddShip, startingX, startingY, ship) {
    for (let i = 0; i < ship.length; i++) {
        playerBoardToAddShip[startingX][startingY + i] = ship.identifier;
    }
};

function parseShipHoriz(playerBoardToAddShip, startingX, startingY, ship) {
    for (let i = 0; i < ship.length; i++) {
        playerBoardToAddShip[startingX + i][startingY] = ship.identifier;
    }
};

