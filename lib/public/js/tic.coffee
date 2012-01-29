# TicTacToe Server

root = @

TicTacToe = ->

        # a Mark is: "x" | "o"
        # a Coord is: "0" .. "8"
        # a Move is Mark + Coord
        # a Board is { cells: String Mark, turn: String, state: String, err: [String]  }

        # rows, cols, diagonals. grid small enough to write literally
        groups = ["012","345","678","036","147","258","048","246"]

        # peersOf :: Coord
        peersOf = (c) -> g for g in groups when c in g

        # move :: Move, Board -> Board
        move = (mv, board) ->

                mv_errs   = valid_move mv, board
                board.err = mv_errs

                unless mv_errs.length > 0

                        apply_move mv, board

                        if won board
                                board.state = mv[0] + " wins"
                        else if stalemate board
                                board.state = "Stalemate"
                        else
                                board.turn = other mv[0]
                        board
                board

        # valid_move :: Move, Board -> Bool
        valid_move = (mv, board) ->

                err = []
                mark  = mv[0]
                coord = mv[1]

                if mark not in "xo"
                        err.push "Invalid mark"
                if coord not in "012345678"
                        err.push "Invalid coordinate"
                if board.cells[coord] isnt "-"
                        err.push "Position already taken"
                if board.state isnt ""
                        err.push "No turn available"
                else if mark isnt board.turn
                        err.push "Wrong player"
                err

        # apply_move :: Move, Board -> Null
        # !! mutates the given board !!
        apply_move = (mv, board) ->
                c = Array::slice.call board.cells
                c[mv[1]] = mv[0]
                board.cells = c.join ""

        # other :: Mark -> Mark
        other = (m) -> if m is "x" then "o" else "x"

        # won :: Board -> Bool
        # checks if any group on the board has all the same mark of the turn
        won = (board) ->
                cells = board.cells
                m     = board.turn
                m+m+m in ((cells[c] for c in group).join "" for group in groups)

        # stalemate :: Board -> Bool
        stalemate = (board) -> "-" not in board.cells

        # default template (Don.js)
        gametempl = (board) ->

                makecell = (c,k) ->
                        if c is "-" then ['a', href:'#'+k, ''] else ['span', class: 'tic_'+c, c]

                ['div', class: 'tic_board',
                        ['div', {class: 'tic_cells'},
                                makecell c,k for c,k in board.cells]
                        ['div', {class: 'tic_turn'}, board.turn + "'s turn"]
                        ['div', {class: 'tic_state'}, board.state]
                        ['p', {class: 'tic_err'}, err] for err in board.err]

        # builds a Game object
        # from game id, player names, and optional starter
        @game = (player1, player2, starter = "x") ->

                # all game state held here
                board =
                        cells: "---------"
                        turn: starter
                        state: ""
                        err: false

                @move = (mv) ->
                        move mv, board

                @board = board

                @render = (render_func, templ = gametempl) ->
                        render_func board, templ

                @
        @

root.tic = new TicTacToe()