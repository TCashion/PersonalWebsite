document.addEventListener("DOMContentLoaded", () => {

    // generate numbers function: pull numbers out of the array and line them up on the board
    const generateNums = () => {
        let index;  
        let nums = [1,2,3,4,5,6,7,8,9];
        let number = 0;
        let gameBoard = [];
        let panels = document.querySelectorAll(".sudoku-panel");

        // parse panels object: 
        let refreshObj = () => {

            gameBoard = [];
            let panel = {}; 

            let createPanel = (min, max) => {
                for (let i = min; i <= max; i++) {
                    panel[i - min] = parseInt(document.querySelectorAll(".sudoku-number")[i].innerHTML);
                };
                gameBoard.push(panel);
                panel = {};
            };

            // create object for corresponding panels
            createPanel(0, 8);
            createPanel(9, 17);
            createPanel(18,26);
            createPanel(27,35);
            createPanel(36,44);
            createPanel(45,53);
            createPanel(54,62);
            createPanel(63,71);
            createPanel(72,80);
            console.log(gameBoard);
        };

        // random number generator (0-8) to choose from nums
        let r = (n) => {
            return Math.floor( Math.random() * (n) )
        };

        // repopulate nums array
        let repop = () => {
            if (nums.length === 0) {
                nums = [1,2,3,4,5,6,7,8,9];
                refreshObj();
            };
        }

        for (let p = 0; p < 9; p++) {
            for (let i = 0; i < 9; i++) {
                let slots = panels[p].querySelectorAll(".sudoku-number");
                // for second column, remove values that have already been taken
                if (p === 1) {
                    // PSUEDOCODE
                        // create "unavailable" array that consists of values already used in the row
                        // when random number generates, check if that index value corresponds to a number that's unavailable. 
                            // if not, populate the number
                            // if so, run again until an adequate number is generated
                                // splice this number from nums array 
                    // for (let j = 0; j < 3; j++) {
                    //     let unavailable = [gameboard[p-1][0],gameboard[p-1][1],gameboard[p-1][2]];
                    //     index = r(available.length)
                    //     number = available[index];
                    //     slots[j].innerHTML = number; 
                    // };
                }; 
                index = r(nums.length)
                number = nums[index];
                slots[i].innerHTML = number;  
                nums.splice(index,1);
                repop();
            };
        }

    };

    // event listener & handler for button
    let button = document.getElementById("sudoku-button");

    button.addEventListener("click", () => {
        generateNums(); 
    });

});



// need to create object for entire board: 
    // create object of first panel to push to main array of objects
    // let panel = {}; 
    // for (let i = 0; i < 9; i++) {panel[i] = document.querySelectorAll(".sudoku-number")[i].innerHTML;}


// PROGRAM Sudoku

    // MODULE create board
        // CREATE 3x3 matrix of numbers 1 - 9
            // loop through panels 
                // add a number to each panel
                // remove corresponding number from array
            // when array length is 0, repopulate with numbers
            // SET as top left box (panel0)
        // CREATE adjacent boxes to the right
            // for panels 1, 2: 
                // DETERMINE which numbers can't be in each row based on previous panels
                // POPULATE with numbers that are remaining
        // VERIFY all rows and boxes contain 1-9
        // CREATE 2ND row of boxes 
        // CREATE 3rd row of boxes 
    // END Module

    // MODULE set difficulty
        // TRACK user selection
        // HIDE appropriate number of fields based on selection 
    // END Module 

// END PROGRAM