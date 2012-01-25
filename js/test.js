define(
    ["lib/jquery", "lib/qunit", "lib/tictactoe"],
    function ($, qunit, tictactoe) {

        module("tictactoe");

        test("a game with a winner", function () {
            var game = tictactoe();
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
            ok( !game.stalemate(), "not a draw" );

            game.render_board('#winning_board');

        });

        test("a game with a stalemate", function () {
            var game = tictactoe();
            ok( game.move("o", [0,0]), "placed the first o" );
            ok( game.move("x", [1,1]), "placed the first x" );
            ok( game.move("o", [0,2]), "placed o" );
            ok( game.move("x", [0,1]), "placed x" );
            ok( game.move("o", [2,1]), "placed o" );
            ok( game.move("x", [1,0]), "placed x" );
            ok( game.move("o", [1,2]), "placed o" );
            ok( game.move("x", [2,2]), "placed x" );
            ok( game.move("o", [2,0]), "placed o" );

            ok( !game.winner(), "no winner" );
            ok( game.stalemate(), "a draw" );

            game.render_board('#stalemate_board');

        });
    }
);
