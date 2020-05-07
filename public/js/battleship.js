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
const ships = [
    {type: "cruiser", 
        length: 3, 
        hitSpaces: 0,
        alive: true,
        locationCoordinates: []
    },
];

/*----- event listeners -----*/

targetDisplay.addEventListener("click", function(e) {
    e.preventDefault(); 
    
})

/*----- functions -----*/

function initBs() {
    turnBs = 1; 
    playerOneShips = ships;
    playerTwoShips = ships; 
    addShips();
    renderBs(); 
}

function renderBs() {
    console.log("Render");
}

function addShips() {       // for now, this is a set board. future dev will have random ship layout
    const boardArr = [
        [null, null, null, null],
        [null, 1, 1, 1],
        [null, null, null, null],
        [null, null, null, null]
    ];
    const locationCoordinates = [
        {"x": 1,
        "y": 1},
        {"x": 2,
        "y": 1},
        {"x": 3,
        "y": 1},
    ]
    playerOneShips.locationCoordinates = locationCoordinates;
    playerTwoShips.locationCoordinates = locationCoordinates;
    playerOneDisplay = boardArr;
    playerOneRadar = boardArr;
    playerTwoDisplay = boardArr; 
    playerTwoRadar = boardArr;
}