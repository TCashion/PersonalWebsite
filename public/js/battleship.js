/*----- constants -----*/

const battleshipPlayerColors = {
    "1": "var(--main-minus-one)",         // player1
    "-1": "var(--main-color)"             // player2
};
const boardColors = {
    "null": "var(--main-plus-one)",
    "-1": "var(--main-plus-two)",
    "1": "orange",
    "shipColor": "var(--main-minus-one)",
    // "B": "var(--main-minus-one)",
    // "C": "var(--main-minus-one)",
    // "S": "var(--main-minus-one)",
    // "D": "var(--main-minus-one)"
    shipFinder: function(cellValue) {
        if (typeof cellValue === "string") {
            return this.shipColor;
        } else {
            return this[cellValue];
        }
    }
    
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
    let shipLayoutPositionValue = shipLayout[rowIdx][colIdx];
    // const divColor = boardColors[shipLayoutPositionValue];
    const divColor = boardColors.shipFinder(shipLayoutPositionValue);
    const radarDiv = document.getElementById(`x${colIdx}y${rowIdx}`); 
    const displayDiv = document.getElementById(`X${colIdx}Y${rowIdx}`);
    if (shipLayout === playerOneShipLayout) {
        displayDiv.setAttribute("style", `background-color: ${divColor}`); 
    };
    if (shipLayout === playerTwoShipLayout) {
        // hides enemy ship colors from player one
        if (typeof shipLayoutPositionValue === "string") {
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

// adds ships to player board data objects
function addShipsToBoard() {     
    do {
        if (shipCountVerifier(playerOneShipLayout) === 0) {
            playerOneShips.forEach((ship) => layoutShip(1, ship));
            playerTwoShips.forEach((ship) => layoutShip(-1, ship));
        } else {
            playerOneShipLayout = defineBoard(playerOneShipLayout);
            playerTwoShipLayout = defineBoard(playerTwoShipLayout);
            playerOneShips.forEach((ship) => layoutShip(1, ship));
            playerTwoShips.forEach((ship) => layoutShip(-1, ship));
        }
    } while (shipCountVerifier(playerOneShipLayout) < 17 || shipCountVerifier(playerTwoShipLayout) < 17)
};

function shipCountVerifier(playerXShipLayout) {
    let shipCounter = 0;  
    playerXShipLayout.forEach(function(row) {
        row.forEach(function(cellValue) {
            if (typeof cellValue === "string") {
                shipCounter += 1;
            }; 
        });
    });
    return shipCounter;
}

function layoutShip(player, ship) {
    const direction = randomNumber(1);
    let startingX = randomNumber(boardLength - ship.length);
    let startingY = randomNumber(boardLength - ship.length);
    let playerBoardToAddShip;
    if (player === 1) playerBoardToAddShip = playerOneShipLayout;
    if (player === -1) playerBoardToAddShip = playerTwoShipLayout;

    if (direction === 1) {
        parseShipHoriz(playerBoardToAddShip, startingX, startingY, ship);
    };
    if (direction === 0) {
        parseShipVert(playerBoardToAddShip, startingX, startingY, ship);
    }
}

function randomNumber (max) {
    return Math.round(Math.random()*Math.floor(max));
}

function parseShipHoriz(playerBoardToAddShip, startingX, startingY, ship) {
    for (let i = 0; i < ship.length; i++) {
        playerBoardToAddShip[startingX][startingY + i] = ship.identifier;
    }
};

function parseShipVert(playerBoardToAddShip, startingX, startingY, ship) {
    for (let i = 0; i < ship.length; i++) {
        playerBoardToAddShip[startingX + i][startingY] = ship.identifier;
    }
};

