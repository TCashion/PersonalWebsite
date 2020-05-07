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


     Wireframe:

     ![Battleship Wireframe](https://imgur.com/dswIWhb.jpg)
            
     ``` 
     Psuedocode:



          PROGRAM Battleship

               /*----- constants -----*/

                    playerColors = {playerOne: 1, playerTwo: 2};
                    hitMissColors = {null: blue, miss: white, hit: orange, ship: gray}
                    boardSize = 10x10                  // can adjust this for smaller board size during development
                    boardLength = 10                   //                  ""

               /*----- app's state (variables) -----*/

                    turn
                    winner
                    playerOneShips
                    playerTwoShips
                    playerOneBoard
                    playerOneRadar
                    playerTwoBoard
                    playerTwoRadar
                    engageAi                 // for AI. Opens AI "session" if hit is      detected, and runs a different alogorithm for playerTwo's shots until the hit ship sinks. starts at 0, goes to 1 until ship is sunk

                    aiHits
                    shipIdentified


               /*----- cached element references -----*/

                    playerOneRadar (Divs) 
                    playerOneBoard (Divs)

               /*----- event listeners -----*/

                    Event listener on target form (see wireframe)
                         ACTIVATE on submit
                              IF coordinate provided:
                                   ARE valid x,y coordinates 
                                        must be between 0 and boardLength
                                   ARE not already marked as hit or miss (1 or -1)
                              THEN takeShot(1, x, y)        // 1 for playerOne
               
               /*----- functions -----*/

                    MODULE init()
                         turn = 1; 
                         winner = null 
                         playerOneBoard = function generateBoard()
                         playerTwoBoard = function generateBoard()
                         playerOneRadar = array of boardSize, all values null
                         playerTwoRadar = array of boardSize, all values null
                         playerOneCapturedShips = []
                         playerTwoCapturedShips = []
                         engageAi = 0
                         aiHits = {}; 
                         shipIdentified = false
                         playerOneShips = function generateShips()
                         playerTwoShips = function generateShips()
                    END MODULE 


                    MODULE render()
                         IF board position = null
                              DIV COLOR is hitMissColors(null)
                         IF board poistion = -1
                              DIV COLOR is hitMissColors(miss)
                         IF board poistion = 1
                              DIV COLOR is hitMissColors(hit)
                         IF board position = 0
                              DIV COLOR is hitMissColors(ship)
                    END MODULE 


                    MODULE generateBoard()
                         create random layout of board
                              null = blank spot
                              0 = ship present
                         **OR**
                              to save development time, I could start with set board layouts rather than randomly generated ones; 
                    END MODULE 


                    MODULE generateShips()
                         [
                              {type: carrier, 
                              length: 5, 
                              unhitSpaces: this.length, 
                              hitSpaces: 0,
                              alive: true,
                              locationCoordinates: [
                                   (x0,y0),
                                   (x1,y1),
                                   (x2,y2),
                                   (x3,y3),
                                   (x4,y4)
                              ]},
                              {type: battleship, 
                              length: 4, 
                              unhitSpaces: this.length, 
                              hitSpaces: 0,
                              alive: true,
                              locationCoordinates: [
                                   (x0,y0),
                                   (x1,y1),
                                   (x2,y2),
                                   (x3,y3)
                              ]},
                              {type: cruiser, 
                              length: 3, 
                              unhitSpaces: this.length, 
                              hitSpaces: 0,
                              alive: true,
                              locationCoordinates: [
                                   (x0,y0),
                                   (x1,y1),
                                   (x2,y2)
                              ]},
                              {type: submarine, 
                              length: 3, 
                              unhitSpaces: this.length, 
                              hitSpaces: 0,
                              alive: true,
                              locationCoordinates: [
                                   (x0,y0),
                                   (x1,y1),
                                   (x2,y2)
                              ]},
                              {type: destroyer, 
                              length: 2, 
                              unhitSpaces: this.length, 
                              hitSpaces: 0,
                              alive: true,
                              locationCoordinates: [
                                   (x0,y0),
                                   (x1,y1)
                              ]},
                         ]
                    END MODULE


                    MODULE randomShipPlacement()
                         for each ship, generate random number 0 or 1     
                              this will determine whether ship will be vertical or horizontal 
                         generate two more random numbers, one for the row coordinate and the column coordinate of the starting position
                         IF the first number is 0, start parsing the ship from left to right
                         IF the first number is 1, start parsing the ship from top to bottom
                         While parsing the ship, check if any of the slots are already occupied (containe string identifier or 1, depending on development strategy TBD)
                         If there's a conflict, try again
                         Run the above until all ships are placed 
                    END MODULE


                    MODULE randomShot() // generates random shot for playerTwo
                         IF engageAi = 1                    // meaning last shot was a hit
                              RUN opponentAi(aiHits[x], aiHits[y])
                         ASSIGN x coordinate
                              x = randomNum(0,boardLength)
                         ASSIGN y coordinate
                              y = randomNum(0,boardLength)
                         takeShot(-1, x, y)    // -1 for playerTwo turn
                    END MODULE


                    MODULE randomNum(boardLength) 
                         random number generator between 0 and (board length - 1);
                    END MODULE


                    MODULE takeShot(turn, xCoordinate, yCoordinate)                       // (-1 = miss, 1 = hit)
                         IF turn = 1
                              update playerTwoBoard at position (xCoordinate, yCoordinate)
                                   If playerTwoBoard(xCoordinate, yCoordinate) = null
                                        UPDATE to -1 (miss)     
                                        RENDER() board 
                                        checkWinner()
                                        CHANGE turn (turn *= -1)     
                                   If playerTwoBoard(xCoordinate, yCoordinate) = 0
                                        UPDATE to 1 (hit)     
                                        trackHits(-1)      
                                        RENDER() board
                                        checkWinner()
                                        CHANGE turn
                                   If playerTwoBoard(xCoordinate, yCoordinate) = 1 or -1
                                        ALERT "You've already tried to shoot there!"
                                        CLEAR input form and wait for playerOne to try again        
                         ELSE IF turn = -1
                                   If playerOneBoard(xCoordinate, yCoordinate) = null
                                        UPDATE to -1 (miss)   
                                        RENDER() board        
                                        CHANGE turn
                                   If playerOneBoard(xCoordinate, yCoordinate) = 0
                                        UPDATE to 1 (hit)    
                                        trackHits(1)       
                                        RENDER() board
                                        playerTwoHit = 1 
                                        engageAi = 1
                                        aiHits = {
                                             hits: (xCoordinate, yCoordinate)
                                        }
                                        CHANGE turn
                                   If playerOneBoard(xCoordinate, yCoordinate) = 1 or -1
                                        no change to board
                                        RUN randomShot() again 
                    END MODULE


                    MODULE trackHits(player)
                         ITERATE through (player) ships
                              IF any location coordinates = 1
                                   hitSpaces += 1
                                   unhitSpaces -=1
                                   IF hitSpaces = ship.length
                                        ship.alive = false
                    END MODULE


                    MODULE checkWinner()
                         CHECK playerOne ships to see if any are still alive
                         IF none are alive
                              winner = -1
                              turn = 0
                              ALERT playerTwo wins!
                         CHECK playerTwo ships to see if any are still alive
                         IF none are alive
                              winner = 1
                              turn = 0
                              ALERT playerOne wins!
                    END MODULE


                    MODULE opponentAi(hit)

                         IF engageAi = 0
                              BREAK
                         ELSE

                              WHILE engageAi = 1 
                                   playerTwo shots allowed only on adjacent cells to most recent hit 
                                        RUN cycle through these coordinates until playerTwo gets another hit
                                             // options (x0 + 1,  y0), (x0 - 1,  y0), (x0,  y0 + 1), (x0,  y0 - 1);
                                   ON second hit
                                        shipIdentified = true;        // prompts AI to move from 2D to 1D
                                        aiHits = {
                                             hits: [(x0, y0), (x1, y1)]              // where (x1, y1) is the second hit coordinate 
                                             }


                              WHILE shipIdentified = true {
                                   once ship is identified, playerTwo's shots will be only in same line:
                                   IF the hits have same x value
                                        next shot is (x1 + 1)
                                             if (x1 + 1) is a miss
                                                  register (x1 + 1):            // so AI knows to try in the other direction 
                                                       aiHits = {
                                                            hits: [(x0, y0), (x1, y1)], 
                                                            miss: (x1 + 1)
                                                            }
                                                  next shot is (x0 - 1)           
                                                  if it's a hit
                                                  trackHits(1)
                                                  ADD hit coordinates to aiHits object    
                                   IF the hits have same y value
                                        next shot is (y1 + 1)
                                             if (y1 + 1) is a miss
                                                  register (y1 + 1):            // so AI knows to try in the other direction 
                                                       aiHits = {
                                                            hits: [(x0, y0), (x1, y1)], 
                                                            miss: (y1 + 1)
                                                       }
                                                  next shot is (y0 - 1)
                                             if it's a hit
                                                  trackHits(1)
                                                  ADD hit coordinates to aiHits object
                                   if aiHits length > 3
                                        proceed to hit in straight line until ship is sunk 
                              }

                              IF ship is sunk, playerTwo return to taking random shots
                                   aiHits = {};
                                   playerTwoHit = 0;
                                   shipIdentified = false; 

                    END MODULE





          END PROGRAM Battleship 
     ```