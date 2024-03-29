# TicTacToe

## Setup

In repo root:

Install node dependencies from package.json:

    npm install

Start coffeescript compiler

    coffee -w -c . 

Start dev server (watches js files, restarts app when they change)

    cd lib start
    node start 
   
## Notes

Fully js - no html/css.

js libraries in public/js are available for both serverside and clientside inclusion.

### Notable files

    lib/
      start.js <- Starts dev server
      game.js  <- Express app with http routes. Socket serverside connectors would go here too
         public/
            css/
               styles.js <- Son.js sheet (compiled to css when app starts)
            js/
               client.js <- UI setup, socket clientside connectors (todo)
               tic.js    <- Tic Tac Toe game logic
               views.js  <- Don.js view templates

## Simple example:

1) Open http://localhost:3000 in two browser windows.
2) Click "new game" in one, observe the board render in both.
3) Click squares to make moves in either window, observe new state render in both.
