document.addEventListener("DOMContentLoaded", () => {

    // random number generator (1-9)
    let r = () => {
        return Math.ceil( Math.random() * (9) )
    };

});

// PROGRAM Sudoku

    // MODULE create board
        // CREATE 3x3 matrix of numbers 1 - 9
            // SET as top left box
        // CREATE adjacent boxes to the right
            // VERIFY all rows and boxes contain 1-9
        // CREATE 2ND row of boxes 
        // CREATE 3rd row of boxes 
    // END Module

    // MODULE set difficulty
        // TRACK user selection
        // HIDE appropriate number of fields based on selection 
    // END Module 

// END PROGRAM