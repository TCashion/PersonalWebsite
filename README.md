# Welcome to the GitHub Repository for my portfolio
     
     This website showcases my programming skills. Enjoy! 

     https://traviscashion.com/

## Features: 

* ### Blog 
     I created this blog not only to showcase my personal writing samples, but also to demonstrate the filter function and unique styling that I created to display the various stories. The format of the post previews (round images that alternate from left to right) is the same as the *portfolio* page, however only the *blog* page has the filter function to sort through story types. 

     **Visit the blog at https://traviscashion.com/blog.html.** 

* ### GameBoard
    *  #### Tic-Tac-Toe
         I created the first version of this tic-tac-toe game prior to starting my software engineering immersive with General Assembly. Upon starting the SEI, I quickly saw that I had made some practical errors in implementing the game (my initial game was visual-centric, not data-centric), so as a project I refactored the functionality using the principles and best practices I picked up at GA. 
         
         **Find the live gameboard at: https://traviscashion.com/gameboard.html.**

         Code for this game can be found in this repository at: https://github.com/TCashion/PersonalWebsite/blob/master/public/js/tictactoe.js. 

         Wireframe:

         ![TTT Wireframe](https://imgur.com/9Bcijrx.png)
         **note: coordinates were reversed during development to be `r(#)c(#)`

         Psuedocode:

         ```
          Required constants:
               
               - Player colors
                    {
                         1: "blue",     // player1
                         -1: "grey"     // player2
                    }
               - Winning combinations: winner declared if any of the following combinations of index positions are equal values and are 1 or -1. Determine by absolute sum = 3.
                    1. board[0][0], board[0][1], board[0][2]
                    2. board[1][0], board[1][1], board[1][2]
                    3. board[2][0], board[2][1], board[2][2]
                    4. board[0][0], board[1][0], board[2][0]
                    5. board[0][1], board[1][1], board[2][1]
                    6. board[0][2], board[1][2], board[2][2]
                    7. board[0][0], board[1][1], board[2][2]
                    8. board[0][2], board[1][1], board[2][0]

          Require variables to track the status of the game: 
               -Board 
                    Layout: 
                         [
                              [c0r0, c1r0, c2r0]
                              [c0r1, c1r1, c2r1]
                              [c0r2, c1r2, c2r2]
                         ]
                    All positions start at null
               -Player turn
               -Winner (1 = player 1; -1 = Player 2; null = no winner/tie).

          Functionality: 
               // PROGRAM TicTacToe

                    // MODULE listen for player selection
                         // READ player turn (1 or -1)
                         // ON CLICK 
                              // READ click position
                              // IF box is empty
                                   // UPDATE value at array position to be equal to player turn
                                   // RUN module checkForWinner
                                   // RENDER new board data so DOM is updated 
                                   // CHANGE player turn 
                              // ELSE do nothing
                    // END MODULE

                    // MODULE reset
                         // ON CLICK of reset button
                              // run init() function to reset game 
                    // END MODULE

                    // MODULE checkForWinner
                         // IF any of the defined winner combinations are found
                              // UPDATE winner board to reflect the value inside the winning combo array (1 or -1) 
                    // END MODULE

               // END PROGRAM TicTacToe

          
         ```
     

    *  #### Sudoku

          This app allows the user to mimic the popular Sudoku puzzle by generating a Sudoku gameboard of their own. Currently, the app does not allow any "playability" functions, meaning that the user can generate the gameboard but not hide any of the numbers in order to try to solve the puzzle on their own. I plan to implement playability in future versions of this app. 

          The generator will create a Sudoku board that meets the following game rules: 

               * each 3x3 section of the board holds numbers 1 through 9, with 0 repeats. 
               * each horizontal row and vertical column also hold all numbers 1 - 9, with 0 repeats. 

          When using the generator, the user may notice a slight lag between clicking the "Reset" button and seeing the board populate. This is because the app goes through many combinations of numbers to fill the 9 x 9 gameboard until it finds a combination that meets the requirements. 

    *  #### Battleship
    