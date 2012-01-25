define(
    ["lib/jquery", "lib/mustache"],
    function ($, mustache) {
        // The board template is stored in the DOM at #board_template
        var board_template = $("#board_template").html();

        // construct for the pseudo-object
        function init () {
            // instance state
            var last_move;
            var win;
            var board = [];

            // generic iterator
            function iterate_board ( fun ) {
                for (var x in [0, 1, 2]) {
                    for (var y in [0, 1, 2]) {
                        fun(board, x, y);
                    }
                }
            }

            function init_board () {
                //initialize the board spaces
                iterate_board( function (board, x, y) {
                    if (typeof board[x] === "undefined") board[x] = [];
                    board[x][y] = { val: 0 };
                });

                //iterate over the board adding links for the connections
                iterate_board( function (board, x, y) {
                    board[x][y].links = [
                        board[(x == 0 ? 3 : x) - 1][y], // horizontal
                        board[(x == 0 ? 3 : x) - 1][(y == 0 ? 3 : y) - 1], // diagonal
                        board[x][(y == 0 ? 3 : y) - 1] // vertical
                    ];
                });
            }

            // render a template stored in board
            function render_board ( selector ) {
                $(selector).html( mustache.render(board_template, { board: board } ) );
            }

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
                for (var dir in [0, 1, 2]) { //horizontal, diagonal, vertical
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

            function stalemate () {
                if (winner()) return false;
                var moves_possible = 0;
                iterate_board( function (board, x, y) {
                    if ( !board[x][y].val ) moves_possible += 1;
                });
                return moves_possible == 0 ? true : false;
            }

            init_board();

            return {
                render_board: render_board,
                move:         move,
                stalemate:    stalemate,
                winner:       winner
            };
        }
        return init;
    }
);
