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
        // wrapped in do/while loop to account for errors
        do {
            for (let p = 0; p < 9; p++) {
                let domSlots = panels[p].querySelectorAll(".sudoku-number");


                // iterates through individual slots in panels 
                for (let i = 0; i < 9; i++) {

                    let available = [];
                    let unavailable = [];

                    // function expressions: 

                        //accounts for p - 6 panel, which is necessary for filling the bottom three panels
                    let thirdTierCounter = (...prevSlots) => {
                        let slots = [...prevSlots];
                        if (gameBoard[p-6]) {
                            for (let k = 0; k < slots.length; k++) {
                                index = slots[k];
                                unavailable.push(gameBoard[p-6][index]);
                            };
                        };
                    };

                    let currentPanelUsed = (startIndex, endIndexPlusOne) => {
                        unavailable.concat(Object.values(gameBoard[p]).slice(startIndex, endIndexPlusOne));
                    };

                    let slotFiller = (slot) => {
                        available = nums.filter(value => unavailable.includes(value) !== true);
                        available = available.filter(value => typeof value === "number");
                        index = r(available.length);
                        number = available[index];
                        domSlots[slot].innerHTML = number;
                        available.splice(index,1); 
                        refreshObj();
                    };

                    let firstColumn = (row, column) => {

                        if (column === 0) { 
                            switch (row) {
                                case 0:
                                    unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6]];
                                    thirdTierCounter(0,3,6);
                                    slotFiller(0);
                                    break;
                                case 1: 
                                    unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2]];
                                    thirdTierCounter(0,3,6);
                                    slotFiller(3);
                                    break;
                                case 2: 
                                    unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5]];
                                    thirdTierCounter(0,3,6);
                                    slotFiller(6);
                                    break;
                            };
                        } else if (column === 1) {
                            switch (row) {
                                case 0: 
                                    unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p][0]];
                                    thirdTierCounter(1,4,7);
                                    slotFiller(1);
                                    break;
                                case 1: 
                                    unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3]];
                                    thirdTierCounter(1,4,7);
                                    slotFiller(4);
                                    break;
                                case 2:
                                    unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6]];
                                    thirdTierCounter(1,4,7);
                                    slotFiller(7);
                                    break;
                            };
                        } else if (column === 2) {
                            switch (row) {
                                case 0:
                                    unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p][0], gameBoard[p][1]];
                                    thirdTierCounter(2,5,8);
                                    slotFiller(2);
                                    break;
                                case 1: 
                                    unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4]];
                                    thirdTierCounter(2,5,8);
                                    slotFiller(5);
                                    break;
                                case 2: 
                                    unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6], gameBoard[p][7]];
                                    thirdTierCounter(2,5,8);
                                    slotFiller(8);
                                    break; 
                            }
                        };
                    };

                    // this is for populating panels
                        // numbers are mixed manually to give some randomness
                    let secondColumn = (row, column) => {

                        switch (p) {
                            case 1:
                                if (row === 0) {
                                    available = [gameBoard[p-1][6],gameBoard[p-1][4],gameBoard[p-1][5]];
                                    for (let s = 0; s < 3; s++) {
                                        index = r(available.length);
                                        number = available[index];
                                        domSlots[s].innerHTML = number;
                                        available.splice(index,1);
                                    };
                                } else if (row === 1) {
                                    available = [gameBoard[p-1][0],gameBoard[p-1][7],gameBoard[p-1][8]];
                                    for (let s = 3; s < 6; s++) {
                                        index = r(available.length);
                                        number = available[index];
                                        domSlots[s].innerHTML = number;
                                        available.splice(index,1);
                                    };
                                } else if (row === 2) {
                                    available = [gameBoard[p-1][3],gameBoard[p-1][1],gameBoard[p-1][2]];
                                    for (let s = 6; s < 9; s++) {
                                        index = r(available.length);
                                        number = available[index];
                                        domSlots[s].innerHTML = number;
                                        available.splice(index,1);
                                    }; 
                                };  
                                break;
                            case 4:
                                if (column === 0) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(0);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p][0], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p][1], gameBoard[p][2]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(3);
                                            break;
                                        case 2: 
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(6);
                                            break; 
                                    }
                                        
                                } else if (column === 1) {
                                    switch (row) {
                                        case 0: 
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p][0], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(1);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p][0], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(4);
                                            break;
                                        case 2:
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(7);
                                            break;
                                    };
                                } else if (column === 2) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p][0], gameBoard[p][1]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(2);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(5);
                                            break;
                                        case 2: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6], gameBoard[p][7]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(8);
                                            break; 
                                    };
                                };
                                break;
                            case 7:
                                if (column === 0) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(0)
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p][0]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(3);
                                            break;
                                        case 2:
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p][0], gameBoard[p][3]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(6);
                                            break;
                                    };
                                } else if (column === 1) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p][0], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(1);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(4);
                                            break;
                                        case 2:
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6], gameBoard[p][7]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(7);
                                            break;
                                    };
                                } else if (column === 2) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p][0], gameBoard[p][1]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(2);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(5);
                                            break;
                                        case 2: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6], gameBoard[p][7]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(8);
                                            break;
                                    };
                                };
                                break;
                        };         
                    };

                    let thirdColumn = (row, column) => {
                          

                        switch (p) {
                            case 2:
                                if (row === 0) {
                                    let unavailable = [gameBoard[p-2][0], gameBoard[p-2][1], gameBoard[p-2][2], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2]];
                                    let available = nums.filter(value => unavailable.includes(value) !== true);
                                    for (let s = 0; s < 3; s++) {
                                        index = r(available.length);
                                        number = available[index];
                                        domSlots[s].innerHTML = number;
                                        available.splice(index,1);
                                    };
                                } else if (row === 1) {
                                    let unavailable = [gameBoard[p-2][3], gameBoard[p-2][4], gameBoard[p-2][5], gameBoard[p-1][3], gameBoard[p-1][4], gameBoard[p-1][5]];
                                    let available = nums.filter(value => unavailable.includes(value) !== true);
                                    for (let s = 3; s < 6; s++) {
                                        index = r(available.length);
                                        number = available[index];
                                        domSlots[s].innerHTML = number;
                                        available.splice(index,1);
                                    };
                                } else if (row === 2) {
                                    let unavailable = [gameBoard[p-2][6], gameBoard[p-2][7], gameBoard[p-2][8], gameBoard[p-1][6], gameBoard[p-1][7], gameBoard[p-1][8]];
                                    let available = nums.filter(value => unavailable.includes(value) !== true);
                                    for (let s = 6; s < 9; s++) {
                                        index = r(available.length);
                                        number = available[index];
                                        domSlots[s].innerHTML = number;
                                        available.splice(index,1);
                                    };
                                };   
                                break;
                            case 5:
                                if (column === 0) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p-2][0], gameBoard[p-2][1], gameBoard[p-2][2]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(0);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p-2][0 + 3], gameBoard[p-2][1 + 3], gameBoard[p-2][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(3);
                                            break;
                                        case 2: 
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p-2][0 + 6], gameBoard[p-2][1 + 6], gameBoard[p-2][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(6);
                                            break; 
                                    };
                                } else if (column === 1) {
                                    switch (row) {
                                        case 0: 
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p-2][0], gameBoard[p-2][1], gameBoard[p-2][2], gameBoard[p][0]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(1);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1],  gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p-2][0 + 3], gameBoard[p-2][1 + 3], gameBoard[p-2][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(4);
                                            break;
                                        case 2:
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p-2][0 + 6], gameBoard[p-2][1 + 6], gameBoard[p-2][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(7);
                                            break;
                                    };
                                } else if (column === 2) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p-2][0], gameBoard[p-2][1], gameBoard[p-2][2], gameBoard[p][0], gameBoard[p][1]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(2);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p-2][0 + 3], gameBoard[p-2][1 + 3], gameBoard[p-2][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(5);
                                            break;
                                        case 2: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p-2][0 + 6], gameBoard[p-2][1 + 6], gameBoard[p-2][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6], gameBoard[p][7]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(8);
                                            break; 
                                    };
                                };
                                break;
                            case 8: 
                                if (column === 0) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p-2][0], gameBoard[p-2][1], gameBoard[p-2][2]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(0);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p-2][0 + 3], gameBoard[p-2][1 + 3], gameBoard[p-2][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(3);
                                            break;
                                        case 2: 
                                            unavailable = [gameBoard[p-3][0], gameBoard[p-3][3], gameBoard[p-3][6], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p-2][0 + 6], gameBoard[p-2][1 + 6], gameBoard[p-2][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5]];
                                            thirdTierCounter(0,3,6);
                                            slotFiller(6);
                                            break; 
                                    };
                                } else if (column === 1) {
                                    switch (row) {
                                        case 0: 
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p-2][0], gameBoard[p-2][1], gameBoard[p-2][2], gameBoard[p][0]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(1);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1],  gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p-2][0 + 3], gameBoard[p-2][1 + 3], gameBoard[p-2][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(4);
                                            break;
                                        case 2:
                                            unavailable = [gameBoard[p-3][0 + 1], gameBoard[p-3][3 + 1], gameBoard[p-3][6 + 1], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p-2][0 + 6], gameBoard[p-2][1 + 6], gameBoard[p-2][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6]];
                                            thirdTierCounter(1,4,7);
                                            slotFiller(7);
                                            break;
                                    };
                                } else if (column === 2) {
                                    switch (row) {
                                        case 0:
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0], gameBoard[p-1][1], gameBoard[p-1][2], gameBoard[p-2][0], gameBoard[p-2][1], gameBoard[p-2][2], gameBoard[p][0], gameBoard[p][1]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(2);
                                            break;
                                        case 1: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 3], gameBoard[p-1][1 + 3], gameBoard[p-1][2 + 3], gameBoard[p-2][0 + 3], gameBoard[p-2][1 + 3], gameBoard[p-2][2 + 3], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(5);
                                            break;
                                        case 2: 
                                            unavailable = [gameBoard[p-3][0 + 2], gameBoard[p-3][3 + 2], gameBoard[p-3][6 + 2], gameBoard[p-1][0 + 6], gameBoard[p-1][1 + 6], gameBoard[p-1][2 + 6], gameBoard[p-2][0 + 6], gameBoard[p-2][1 + 6], gameBoard[p-2][2 + 6], gameBoard[p][0], gameBoard[p][1], gameBoard[p][2], gameBoard[p][3], gameBoard[p][4], gameBoard[p][5], gameBoard[p][6], gameBoard[p][7]];
                                            thirdTierCounter(2,5,8);
                                            slotFiller(8);
                                            break; 
                                    };
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
                        }; 
                    };

                    // this iterates through each panel (p) and populates it with numbers 
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
                                    console.log("made it to panel " + p);
                                    secondColumn(0);
                                    secondColumn(1);
                                    secondColumn(2);
                                    break; 
                                case 2: 
                                    console.log("made it to panel " + p);
                                    thirdColumn(0);
                                    thirdColumn(1);
                                    thirdColumn(2);
                                    break; 
                                case 3: 
                                    console.log("made it to panel " + p);
                                    // goes one row at a time and adds numbers to slots. Must be in this order. 
                                    firstColumn(0,0);
                                    firstColumn(0,1);
                                    firstColumn(0,2);
                                    firstColumn(1,0);
                                    firstColumn(1,1);
                                    firstColumn(1,2);
                                    firstColumn(2,0);
                                    firstColumn(2,1);
                                    firstColumn(2,2);
                                    break; 
                                case 4: 
                                    console.log("made it to panel " + p);
                                    secondColumn(0,0);
                                    secondColumn(0,1);
                                    secondColumn(0,2);
                                    secondColumn(1,0);
                                    secondColumn(1,1);
                                    secondColumn(1,2);
                                    secondColumn(2,0);
                                    secondColumn(2,1);
                                    secondColumn(2,2);
                                    break; 
                                case 5: 
                                    console.log("made it to panel " + p);
                                    thirdColumn(0,0);
                                    thirdColumn(0,1);
                                    thirdColumn(0,2);
                                    thirdColumn(1,0);
                                    thirdColumn(1,1);
                                    thirdColumn(1,2);
                                    thirdColumn(2,0);
                                    thirdColumn(2,1);
                                    thirdColumn(2,2);
                                    break; 
                                case 6: 
                                    console.log("made it to panel " + p);
                                    firstColumn(0,0);
                                    firstColumn(0,1);                                
                                    firstColumn(0,2);
                                    firstColumn(1,0);
                                    firstColumn(1,1);
                                    firstColumn(1,2);
                                    firstColumn(2,0);
                                    firstColumn(2,1);
                                    firstColumn(2,2);
                                    break; 
                                case 7: 
                                    console.log("made it to panel " + p);
                                    secondColumn(0,0);
                                    secondColumn(0,1);
                                    secondColumn(0,2);
                                    secondColumn(1,0);
                                    secondColumn(1,1);
                                    secondColumn(1,2);
                                    secondColumn(2,0);
                                    secondColumn(2,1);
                                    secondColumn(2,2);
                                    break; 
                                case 8: 
                                    console.log("made it to panel " + p);
                                    thirdColumn(0,0);
                                    thirdColumn(0,1);
                                    thirdColumn(0,2);
                                    thirdColumn(1,0);
                                    thirdColumn(1,1);
                                    thirdColumn(1,2);
                                    thirdColumn(2,0);
                                    thirdColumn(2,1);
                                    thirdColumn(2,2);
                                    break;
                        };    
                    };
                    // invoke function
                    populateBoard();
                };
            };
        } while (
            Object.values(gameBoard[3]).includes(NaN) 
        || Object.values(gameBoard[4]).includes(NaN) 
        || Object.values(gameBoard[5]).includes(NaN) 
        || Object.values(gameBoard[6]).includes(NaN) 
        || Object.values(gameBoard[7]).includes(NaN)
        || Object.values(gameBoard[8]).includes(NaN) 
        ); //end while


    };

    // event listener & handler for button
    let button = document.getElementById("sudoku-button");

    button.addEventListener("click", (e) => {
        clearBoard();    
        generateNums();            
    });

});



// notes for refactoring:
    // unavailable arrays already include things like gameBoard[p-1][0+3]... so you can change the "3" in this example to a variable based on the position of the board. 
    // also, current order of nested loops may not be most efficient... review this. 
