define(
    ["lib/jquery", "lib/mustache"],
    function ($, mustache) {

        // The board template is stored in the DOM at #board_template
        var board_template = $("#board_template").html();

        /* TODO: convert the board (and other vars at this scope) to instance
           attribute so one game can be an "object" instance. Is there a more
           idiomatic way to do this in JS?
        */
        var board = [];
        for (x in [0, 1, 2]) {
            for (y in [0, 1, 2]) {
                if (typeof board[x] === "undefined") board[x] = [];
                board[x][y] = { val: 0 };
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

        // render a template stored in board
        function render_board () {
            $('#board').html( mustache.render(board_template, { board: board } ) );
        }

        // TODO: try to make these object attributes
        var last_move;
        var win = false;
        function move ( xo, pos ) {

            // Is this your move?
            if ( last_move == xo ) return false;

            // Is there already a token in this position?
            if (
                board[ pos[0] ][ pos[1] ].val == "x"
             || board[ pos[0] ][ pos[1] ].val == "o"
            ) return false;

            // This move is allowed so we place the token:
            board[ pos[0] ][ pos[1] ].val = xo;
            // Record this token as the last to move
            last_move = xo;

            /* To check a winner we want to look for a line from this move in
               any of the three directions. Conveniently our board has the wrap-
               around links property to make this check convenient.
            */
            for (dir in [0, 1, 2]) {
                if (
                    board[ pos[0] ][ pos[1] ].links[dir].val == xo
                    && board[ pos[0] ][ pos[1] ].links[dir].links[dir].val == xo
                ) {
                    win = xo;
                }
            }

            return true;
        }

        function winner () {
            return win;
        }

        return {
            render_board: render_board,
            move:         move,
            winner:       winner
        };
    }
);
