define(
    ["lib/jquery", "lib/mustache"],
    function ($, mustache) {
        var board_template = $("#board_template").html();
        var board = [];
        for (x in [0, 1, 2]) {
            for (y in [0, 1, 2]) {
                if (typeof board[x] === "undefined") board[x] = [];
                board[x][y] = { val: "_"};
            }
        }
        for (x in [0, 1, 2]) {
            for (y in [0, 1, 2]) {
                board[x][y].links = [
                        board[(x == 0 ? 3 : x) - 1][y], // west
                        board[(x == 0 ? 3 : x) - 1][(y == 0 ? 3 : y) - 1], // south west
                        board[x][(y == 0 ? 3 : y) - 1] // south
                ];
            }
        }

        function render_board () {
            window.console.log("rendering board " + board);
            $('#board').html( mustache.render(board_template, { board: board } ) );
        }

        var last_move;
        function move ( xo, pos ) {
            window.console.log("moving");
            if (
                board[ pos[0] ][ pos[1] ].val == "x"
             || board[ pos[0] ][ pos[1] ].val == "o"
            ) return false;
            if ( last_move == xo ) return false;
            board[ pos[0] ][ pos[1] ].val = xo;
            last_move = xo;
            return true;
        }

        return {
            render_board: render_board,
            move:         move
        };
    }
);
