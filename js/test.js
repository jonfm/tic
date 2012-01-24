define(
    ["lib/jquery", "lib/qunit", "lib/tictactoe"],
    function ($, qunit, game) {
        module("tictactoe");
        test("do something", function () {
            ok( game.move("x", [0,0]), "placed the first x at 0,0" );
            ok( !game.move("o", [0,0]), "cannot place another piece at 0,0" );
            ok( game.move("o", [1,1]), "placed the first o in the centre" );
            ok( !game.move("o", [2,1]), "o cannot move again" );
            ok( game.move("x", [1,2]), "placed x" );
            ok( game.move("o", [0,2]), "placed o" );
            //ok( game.move("x", [0,2]), "placed x" );
            //ok( game.move("o", [1,0]), "placed o" );
            game.render_board();

        });
    }
);
