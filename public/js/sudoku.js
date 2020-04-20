document.addEventListener("DOMContentLoaded", () => {

    // generate numbers function: pull numbers out of the array and line them up on the board
    const generateNums = () => {
        let index;  
        let nums = [1,2,3,4,5,6,7,8,9];
        let number = 0;
        let gameBoard = [];
        let panels = document.querySelectorAll(".sudoku-panel");
        let panel0 = [];

        // parse panels object: 
        let refreshObj = () => {

            gameBoard = [];
            let panel = {}; 

            let createPanel = (min, max) {
                for (let i = min; i < max; i++) {
                    panel[i] = parseInt(document.querySelectorAll(".sudoku-number")[i].innerHTML);
                };
                gameBoard.push(panel);
                panel = {};
            }
            
            for (let i = 0; i < 9; i++) {
                panel[i] = parseInt(document.querySelectorAll(".sudoku-number")[i].innerHTML);
            };
            gameBoard.push(panel);
            panel = {};

            for (let i = 9; i < 18; i++) {
                panel[i - 9] = parseInt(document.querySelectorAll(".sudoku-number")[i].innerHTML);
            }
            gameBoard.push(panel);
            panel = {}; 
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
            };
        }

        // first panel 
        for (let i = 0; i < 9; i++) {
            let slots = panels[0].querySelectorAll(".sudoku-number");
            index = r(nums.length)
            number = nums[index];
            // populate panel array to track for next panels to meet sudoku requirements
            panel0.push(number);
            slots[i].innerHTML = number;  
            nums.splice(index,1);
            repop();
        };

        refreshObj();

        // second panel
        for (let i = 0; i < 9; i++) {
            let slots = panels[1].querySelectorAll(".sudoku-number");
            index = r(nums.length)
            number = nums[index];
            // populate panel array to track for next panels to meet sudoku requirements
            panel0.push(number);
            slots[i].innerHTML = number;  
            nums.splice(index,1);
            repop();
        };
        refreshObj();

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