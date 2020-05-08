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
    shipFinder: function(cellValue) {
        if (typeof cellValue === "string") {
            return this.shipColor;
        } else {
            return this[cellValue];
        }
    }
};
boardLength = 10;
const inputRegEx = /[A-z][0-9]/;

/*----- app's state (variables) -----*/

let turnBs;
let winnerBs;
let playerOneShips;
let playerTwoShips;
let playerOneShipLayout;
let playerTwoShipLayout;
let engageAi;                 
let aiHits;
let shipIdentified;

/*----- cached element references -----*/

const playerOneRadarDivEls = document.getElementById("playerOneRadar");
const playerOneDisplayDivEls = document.getElementById("playerOneDisplay");
const targetDisplay = document.getElementsByClassName("battleship-target-display")[0];
const targetInput = document.getElementById("battleship-target-input");
class Ship {
    constructor(type, identifier, length, hitSpaces) {
        this.type = type; 
        this.identifier = identifier;
        this.length = length; 
        this.hitSpaces = hitSpaces;
        this.alive = true;
        this.boardLocation = [];
    } 
};


/*----- event listeners -----*/

targetDisplay.addEventListener("click", function(e) {
    e.preventDefault(); 
    const eventTarget = e.target.id;
    if (eventTarget === "battleship-render-button") initBs();
    if (eventTarget === "battleship-fire-button") {
        if (turnBs === 1 && inputRegEx.test(targetInput.value)) {
            console.log("valid shot");
            targetInput.value = "";
        } else {
            alert("Not a valid shot");
        };
    };
});

/*----- functions -----*/

function initBs() {
    turnBs = 1; 
    createShips();
    playerOneShipLayout = defineBoard(playerOneShipLayout);
    playerTwoShipLayout = defineBoard(playerTwoShipLayout);
    addShipsToBoard();
    updateShipObjects(1);
    updateShipObjects(-1);
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

// iterates through each cell in the DOM and renders the colors of the board based on current data
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
    const divElColor = boardColors.shipFinder(shipLayoutPositionValue);
    const radarDivEl = document.getElementById(`x${colIdx}y${rowIdx}`); 
    const displayDivEl = document.getElementById(`X${colIdx}Y${rowIdx}`);
    if (shipLayout === playerOneShipLayout) {
        displayDivEl.setAttribute("style", `background-color: ${divElColor}`); 
    };
    if (shipLayout === playerTwoShipLayout) {
        // hides enemy ship colors from player one
        if (typeof shipLayoutPositionValue === "string") {
            radarDivEl.setAttribute("style", `background-color: ${boardColors["null"]}`); 
        } else {
            radarDivEl.setAttribute("style", `background-color: ${divElColor}`); 
        };
    };  
};

// creates each player's ship data objects
function createShips() {
    playerOneShips = [];
    playerTwoShips= [];
    const carrier = new Ship("carrier", "A", 5, 0 ,true);
    const battleship = new Ship("battleship", "B", 4, 0 ,true);
    const cruiser = new Ship("cruiser", "C", 3, 0 ,true);
    const submarine = new Ship("submarine", "S", 3, 0 ,true);
    const destroyer = new Ship("destroyer", "D", 2, 0 ,true);
    const carrierTwo = new Ship("carrier", "A", 5, 0 ,true);
    const battleshipTwo = new Ship("battleship", "B", 4, 0 ,true);
    const cruiserTwo = new Ship("cruiser", "C", 3, 0 ,true);
    const submarineTwo = new Ship("submarine", "S", 3, 0 ,true);
    const destroyerTwo = new Ship("destroyer", "D", 2, 0 ,true);
    playerOneShips.push(carrier, battleship, cruiser, submarine, destroyer);
    playerTwoShips.push(carrierTwo, battleshipTwo, cruiserTwo, submarineTwo, destroyerTwo);
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
    } while (shipCountVerifier(playerOneShipLayout) < 17 || shipCountVerifier(playerTwoShipLayout) < 17);
};

// ensures that ships do not overlap on board
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

// randomly lays ships out on board 
function layoutShip(player, ship) {
    const direction = randomNumber(1);
    let playerBoardToAddShip;
    if (player === 1) playerBoardToAddShip = playerOneShipLayout;
    if (player === -1) playerBoardToAddShip = playerTwoShipLayout;
    if (direction === 1) {
        let startingColCoord = randomNumber(boardLength - 1);
        let startingRowCoord = randomNumber(boardLength - ship.length - 1);
        parseShipHoriz(playerBoardToAddShip, startingColCoord, startingRowCoord, ship);
    };
    if (direction === 0) {
        let startingColCoord = randomNumber(boardLength - ship.length - 1);
        let startingRowCoord = randomNumber(boardLength - 1);
        parseShipVert(playerBoardToAddShip, startingColCoord, startingRowCoord, ship);
    };
}

function randomNumber (max) {
    return Math.round(Math.random()*Math.floor(max));
}

function parseShipHoriz(playerBoardToAddShip, startingColCoord, startingRowCoord, ship) {
    for (let i = 0; i < ship.length; i++) {
        playerBoardToAddShip[startingColCoord][startingRowCoord + i] = ship.identifier;
    }

};

function parseShipVert(playerBoardToAddShip, startingColCoord, startingRowCoord, ship) {
    for (let i = 0; i < ship.length; i++) {
        playerBoardToAddShip[startingColCoord + i][startingRowCoord] = ship.identifier;
    }
};

// updates the data in each player's ship objects, according to ship placements
function updateShipObjects(player) {
    let shipArrayToUpdate;
    let shipLayoutToScan; 
    if (player === 1) {
        shipArrayToUpdate = playerOneShips;
        shipLayoutToScan = playerOneShipLayout;
    } else {
        shipArrayToUpdate = playerTwoShips;
        shipLayoutToScan = playerTwoShipLayout;
    };
    shipArrayToUpdate.forEach(function(ship) {
        shipLayoutToScan.forEach(function(row) {
            for (let col = 0; col < row.length; col++) {
                if (row[col] === ship.identifier) {
                    const rowIdx = shipLayoutToScan.indexOf(row);
                    const colIdx = col; 
                    const coordObj = {
                        row: rowIdx,
                        col: colIdx
                    };
                    ship.boardLocation.push(coordObj);
                };
            };
        });
    });
};

function playerOneShot(shotCoordinates) {

}


// MODULE takeShot(turn, xCoordinate, yCoordinate)      // (-1 = miss, 1 = hit)
//         IF turn = 1
//             update playerTwoBoard at position (xCoordinate, yCoordinate)
//                 If playerTwoBoard(xCoordinate, yCoordinate) = null
//                     UPDATE to -1 (miss)     
//                     RENDER() board 
//                     checkWinner()
//                     CHANGE turn (turn *= -1)     
//                 If playerTwoBoard(xCoordinate, yCoordinate) = 0
//                     UPDATE to 1 (hit)     
//                     trackHits(-1)      
//                     RENDER() board
//                     checkWinner()
//                     CHANGE turn
//                 If playerTwoBoard(xCoordinate, yCoordinate) = 1 or -1
//                     ALERT "You've already tried to shoot there!"
//                     CLEAR input form and wait for playerOne to try again        
//         ELSE IF turn = -1
//                 If playerOneBoard(xCoordinate, yCoordinate) = null
//                     UPDATE to -1 (miss)   
//                     RENDER() board        
//                     CHANGE turn
//                 If playerOneBoard(xCoordinate, yCoordinate) = 0
//                     UPDATE to 1 (hit)    
//                     trackHits(1)       
//                     RENDER() board
//                     playerTwoHit = 1 
//                     engageAi = 1
//                     aiHits = {
//                             hits: (xCoordinate, yCoordinate)
//                     }
//                     CHANGE turn
//                 If playerOneBoard(xCoordinate, yCoordinate) = 1 or -1
//                     no change to board
//                     RUN randomShot() again 
// END MODULE
