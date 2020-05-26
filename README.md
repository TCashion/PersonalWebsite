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
     

    *  #### Sudoku

          This app allows the user to mimic the popular Sudoku puzzle by generating a Sudoku gameboard of their own. Currently, the app does not allow any "playability" functions, meaning that the user can generate the gameboard but not hide any of the numbers in order to try to solve the puzzle on their own. I plan to implement playability in future versions of this app. 

          The generator will create a Sudoku board that meets the following game rules: 

               * each 3x3 section of the board holds numbers 1 through 9, with 0 repeats. 
               * each horizontal row and vertical column also hold all numbers 1 - 9, with 0 repeats. 

          When using the generator, the user may notice a slight lag between clicking the "Reset" button and seeing the board populate. This is because the app goes through many combinations of numbers to fill the 9 x 9 gameboard until it finds a combination that meets the requirements. 
