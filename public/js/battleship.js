/*----- constants -----*/

    const playerColors = {
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

    let turn;
    let winner;
    let playerOneShips;
    let playerTwoShips;
    let playerOneBoard;
    let playerOneRadar;
    let playerTwoBoard;
    let playerTwoRadar;
    let engageAi;                 
    let aiHits;
    let shipIdentified;

/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/