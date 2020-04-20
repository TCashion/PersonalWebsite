document.addEventListener("DOMContentLoaded", () => {

    // generate numbers function: pull numbers out of the array and line them up on the board
    const generateNums = () => {
        let index;  
        let nums = [1,2,3,4,5,6,7,8,9];
        let number = 0;
        let panels = document.querySelectorAll(".sudoku-panel");
        let panel0 = [];

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

        // second panel
        for (let i = 0; i < 2; i++) {
            
        }

    };

    // event listener & handler for button
    let button = document.getElementById("sudoku-button");

    button.addEventListener("click", () => {
        generateNums(); 
    });

});

// PROGRAM Sudoku

    // MODULE create board
        // CREATE 3x3 matrix of numbers 1 - 9
            // loop through panels 
                // add a number to each panel
                // remove corresponding number from array
            // when array length is 0, repopulate with numbers
            // SET as top left box
        // CREATE adjacent boxes to the right
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