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

            let createObjPanel = (min, max) => {
                for (let i = min; i <= max; i++) {
                    panel[i - min] = parseInt(document.querySelectorAll(".sudoku-number")[i].innerHTML);
                };
                gameBoard.push(panel);
                panel = {};
            };

            // create object for corresponding panels
            createObjPanel(0, 8);
            createObjPanel(9, 17);
            createObjPanel(18,26);
            createObjPanel(27,35);
            createObjPanel(36,44);
            createObjPanel(45,53);
            createObjPanel(54,62);
            createObjPanel(63,71);
            createObjPanel(72,80);
            // console.log(gameBoard);
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

        // create numbers in DOM
        // iterates through panels
        for (let p = 0; p < 9; p++) {
            // iterates through individual slots in panels 
            for (let i = 0; i < 9; i++) {
                // variable declarations necessary for functions: 
                let domSlots = panels[p].querySelectorAll(".sudoku-number");
                let unavailable = [];
                let available = [];

                // function expressions: 
                    // where ...usedNumbers accounts for numbers already used in previous columns or rows (per sudoku rules)
                let switchCaseFunction = (...usedNumbers) => {
                    unavailable = usedNumbers;
                    console.log("unavailable " + unavailable);
                    available = nums.filter(value => unavailable.includes(value) !== true);
                    console.log("available " + available);
                    domSlots[i].innerHTML = 1; 
                    index = r(available.length)
                    number = available[index];
                    domSlots[i].innerHTML = number;  
                    available.splice(number,1);
                    nums.splice(nums.indexOf(number),1);
                    console.log("remaining numbers:" + nums)
                }

                    // for populating panels 1 - 8
                let populatePanel = () => {                  
                    switch (i) {
                        case 0: 
                            switchCaseFunction(gameBoard[p-1][0],gameBoard[p-1][1],gameBoard[p-1][2]);
                            break;
                        case 1: 
                            switchCaseFunction(gameBoard[p-1][0],gameBoard[p-1][1],gameBoard[p-1][2]);
                            break; 
                        case 2: 
                            switchCaseFunction(gameBoard[p-1][0],gameBoard[p-1][1],gameBoard[p-1][2]);
                            break; 
                        case 3: 
                            switchCaseFunction(gameBoard[p-1][3],gameBoard[p-1][4],gameBoard[p-1][5]);
                            break; 
                        case 4: 
                            switchCaseFunction(gameBoard[p-1][3],gameBoard[p-1][4],gameBoard[p-1][5]);
                            break; 
                        case 5: 
                            switchCaseFunction(gameBoard[p-1][3],gameBoard[p-1][4],gameBoard[p-1][5]);
                            break; 
                        case 6: 
                            switchCaseFunction(gameBoard[p-1][6],gameBoard[p-1][7],gameBoard[p-1][8]);
                            break; 
                        case 7: 
                            switchCaseFunction(gameBoard[p-1][6],gameBoard[p-1][7],gameBoard[p-1][8]);
                            break; 
                        case 8: 
                            switchCaseFunction(gameBoard[p-1][6],gameBoard[p-1][7],gameBoard[p-1][8]);
                            repop();
                            break; 
                    };
                };

                    // re-runs code if any slots are "undefined"
                let checkForErrors = () => {
                    if (!gameBoard[p][8]) {
                        populatePanel();
                    } else if (!gameBoard[p][7]) {
                        console.log("error");
                    };
                }

                switch (p) {
                        case 0: 
                            index = r(nums.length)
                            number = nums[index];
                            domSlots[i].innerHTML = number;  
                            nums.splice(index,1);
                            repop();
                            break;
                        case 1: 
                            // invoke functions
                            populatePanel();
                            checkForErrors(); 
                            break; 
                        // case 2: 
                        //     ;
                        //     break; 
                        // case 3: 
                        //     ;
                        //     break; 
                        // case 4: 
                        //     ;
                        //     break; 
                        // case 5: 
                        //     ;
                        //     break; 
                        // case 6: 
                        //     ;
                        //     break; 
                        // case 7: 
                        //     ;
                        //     break; 
                        // case 8: 
                        //     ;
                        //     break;
                        default: 
                            index = r(nums.length)
                            number = nums[index];
                            domSlots[i].innerHTML = number;  
                            nums.splice(index,1);
                            repop();
                            break;
                };
            };
        };

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