document.addEventListener("DOMContentLoaded", () => {

    // clear board 
    const clearBoard = (min, max) => {
        document.querySelectorAll(".sudoku-number").forEach(slot => {
            slot.innerHTML = "";
        });
    };

    // clear panel 
    const clearPanel = (min, max) => {
        let indivPanel = [];
        for (let i = min; i <= max; i++) {
            indivPanel.push(document.querySelectorAll(".sudoku-number")[i]);
        };
        indivPanel.forEach(value => 
            value.innerHTML = "")
        return indivPanel;
    };

    // generate numbers function: pull numbers out of the array and line them up on the board
    const generateNums = () => {
        let index;  
        let nums = [1,2,3,4,5,6,7,8,9];
        let number = 0;
        let gameBoard = [];
        let panels = document.querySelectorAll(".sudoku-panel");
        let errorTracker = 0;

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
        };

        // create numbers in DOM
        // iterates through panels
        for (let p = 0; p < 9; p++) {
            let domSlots = panels[p].querySelectorAll(".sudoku-number");

            // iterates through individual slots in panels 
            for (let i = 0; i < 9; i++) {

                // function expressions: 
                    // this creates the numbers that go in each panel's slots, taking into account the previous panels in order to avoid duplicates. 
                        // variable "i" points to individual slots inside panels
                    // where ...usedNumbers accounts for numbers already used in previous columns or rows (per sudoku rules)
                let switchCaseFunction = (...usedNumbers) => {
                        let unavailable = [];
                        let available = [];     
                        unavailable = usedNumbers;
                        console.log("START unavailable " + unavailable);
                        available = nums.filter(value => unavailable.includes(value) !== true);
                        console.log("available " + available);
                        index = r(available.length)
                        console.log("index: " + index);
                        number = available[index];
                        console.log("number: " + number + " goes in slot " + p + "-" + i);
                        if (number !== undefined) {
                            domSlots[i].innerHTML = number;  
                            nums.splice(nums.indexOf(number),1);
                            console.log("remaining numbers:" + nums);
                        } else {
                            // clear panel and object
                            for (let j = 0; j < 9; j++) {
                                domSlots[j].innerHTML = "";
                            };
                            gameBoard[p] = {};
                            errorTracker = 1;
                            //resart code: 
                            // i = 0;
                            // continue restartLoop;
                        };
                };

                    // for populating panels 1 - 8
                    // this iterates through each panel slot (i) and invokes switchCaseFunction in order to put a number in the slot
                let populatePanel = (p) => {                  
                    // restartLoop:
                    switch (i) {
                        case 0: 
                            errorTracker = 0;
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
                            if (errorTracker === 1) {
                                // continue restartLoop; creates error
                                // i = 0; breaks page
                                // populatePanel(); breaks page
                                // populateBoard(); breaks page
                            };
                            break; 
                    };
                };
                    
                let checkForErrors = () => {
                    // re-runs code if any slots are "undefined"
                    // stop code from running if there are duplicates in panel 2, which manifests itself as the last position being "NaN" in the object
                    // ********************in progress***************
                    let verifier = Object.values(gameBoard[p]);
                    if (verifier.includes(1) && verifier.includes(2) && verifier.includes(3) && verifier.includes(4) && verifier.includes(5) && verifier.includes(6) && verifier.includes(7) && verifier.includes(8) && verifier.includes(9)) {
                        console.log("has em all")
                        errorTracker = 0;
                        return errorTracker;
                    } else {
                        errorTracker = 1;
                        return errorTracker;
                    }; 
                };

                // this iterates through each panel (p) and populates it with numbers 
                // NEEDS TO BE MOVED! outside of for loop that loops thorugh slots "i" 
                let populateBoard = () => {

                    
                    switch (p) {
                            case 0: 
                                index = r(nums.length)
                                number = nums[index];
                                domSlots[i].innerHTML = number;  
                                nums.splice(index,1);
                                repop();
                                break;
                            case 1: 
                                populatePanel(p);
                                checkForErrors(); 
                                while (errorTracker === 1) {
                                    populatePanel(p);
                                };
                                break; 
                            // case 2: 
                            //     populatePanel();
                            //     checkForErrors();
                            //     break; 
                            // case 3: 
                            //     populatePanel();
                            //     checkForErrors();
                            //     break; 
                            // case 4: 
                            //     populatePanel();
                            //     checkForErrors();1
                            //     break; 
                            // case 5: 
                            //     populatePanel();
                            //     checkForErrors();
                            //     break; 
                            // case 6: 
                            //     populatePanel();
                            //     checkForErrors();
                            //     break; 
                            // case 7: 
                            //     populatePanel();
                            //     checkForErrors();
                            //     break; 
                            // case 8: 
                            //     populatePanel();
                            //     checkForErrors();
                            //     break;
                            // default: 
                            //     index = r(nums.length)
                            //     number = nums[index];
                            //     domSlots[i].innerHTML = number;  
                            //     nums.splice(index,1);
                            //     repop();
                            //     break;
                    };
                };
                // invoke function
                populateBoard();
            };
        };

    };

    // event listener & handler for button
    let button = document.getElementById("sudoku-button");

    button.addEventListener("click", (e) => {
        clearBoard();    
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