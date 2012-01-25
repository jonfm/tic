define(
    ["lib/jquery", "lib/qunit", "lib/tictactoe"],
    function ($, qunit, game) {
        module("tictactoe");
        test("a game with a winner", function () {
            ok( game.move("o", [1,1]), "placed the first o in the centre" );
            ok( !game.move("o", [2,1]), "o cannot move again" );
            ok( game.move("x", [0,1]), "placed the first x at 0,0" );
            ok( !game.move("o", [0,1]), "cannot place another piece at 0,0" );
            ok( game.move("o", [0,0]), "placed o" );
            ok( game.move("x", [2,2]), "placed x" );
            ok( !game.winner(), "no winner yet" );
            ok( game.move("o", [2,0]), "placed o" );
            ok( !game.winner(), "no winner yet" );
            ok( game.move("x", [0,2]), "placed x" );
            ok( !game.winner(), "no winner yet" );
            ok( game.move("o", [1,0]), "placed o" );
            equals( game.winner(), "o", "o wins the game" );

            game.render_board();

        });
    }
);
