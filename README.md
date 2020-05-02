# Welcome to the GitHub Repository for my portfolio

     This website showcases my programming skills. Enjoy! 

## Features: 

* ### GameBoard
    *  #### Tic-Tac-Toe
         I created the first version of this tic-tac-toe game prior to starting my software engineering immersive with General Assembly. Upon starting the SEI, I quickly saw that I had made some practical errors in implementing the game, so as a project I refactored the functionality using the principles and best practices I picked up at GA. **Check out the gameboard at: https://traviscashion.com/gameboard.html.**

         Wireframe:

         ![TTT Wireframe](https://imgur.com/9Bcijrx.png)

         Psuedocode:

         ```
          Required constants:
               -Board 
                    Layout: 
                         [
                              [c0r0, c1r0, c2r0]
                              [c0r1, c1r1, c2r1]
                              [c0r2, c1r2, c2r2]
                         ]
               - Player colors
                    {
                         1: "blue",     // player1
                         -1: "grey"     // player2
                    }
               - Winning combinations: winner declared if any of the following combinations of index positions are equal values
                    1. board[0][0], board[0][1], board[0][2]
                    2. board[1][0], board[1][1], board[1][2]
                    3. board[2][0], board[2][1], board[2][2]
                    4. board[0][0], board[1][0], board[2][0]
                    5. board[0][1], board[1][1], board[2][1]
                    6. board[0][2], board[1][2], board[2][2]
                    7. board[0][0], board[1][1], board[2][2]
                    8. board[0][2], board[1][1], board[2][0]

          Require variables to track the status of the game: 
               -Players (1 = player 1; -1 = Player 2).
               -Player turn
               -Winner (1 = player 1; -1 = Player 2; null = no winner/tie).

          
         ```

    *  #### Sudoku
    