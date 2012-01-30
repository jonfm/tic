(function() {
  var TicTacToe, root,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  root = this;

  TicTacToe = function() {
    var apply_move, gametempl, groups, move, other, peersOf, stalemate, valid_move, won;
    groups = ["012", "345", "678", "036", "147", "258", "048", "246"];
    peersOf = function(c) {
      var g, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = groups.length; _i < _len; _i++) {
        g = groups[_i];
        if (__indexOf.call(g, c) >= 0) _results.push(g);
      }
      return _results;
    };
    move = function(mv, board) {
      var mv_errs;
      mv_errs = valid_move(mv, board);
      board.err = mv_errs;
      if (!(mv_errs.length > 0)) {
        apply_move(mv, board);
        if (won(board)) {
          board.state = mv[0] + " wins";
        } else if (stalemate(board)) {
          board.state = "Stalemate";
        } else {
          board.turn = other(mv[0]);
        }
        board;
      }
      return board;
    };
    valid_move = function(mv, board) {
      var coord, err, mark;
      err = [];
      mark = mv[0];
      coord = mv[1];
      if (__indexOf.call("xo", mark) < 0) err.push("Invalid mark");
      if (__indexOf.call("012345678", coord) < 0) err.push("Invalid coordinate");
      if (board.cells[coord] !== "-") err.push("Position already taken");
      if (board.state !== "") {
        err.push("No turn available");
      } else if (mark !== board.turn) {
        err.push("Wrong player");
      }
      return err;
    };
    apply_move = function(mv, board) {
      var c;
      c = Array.prototype.slice.call(board.cells);
      c[mv[1]] = mv[0];
      return board.cells = c.join("");
    };
    other = function(m) {
      if (m === "x") {
        return "o";
      } else {
        return "x";
      }
    };
    won = function(board) {
      var c, cells, group, m, _ref;
      cells = board.cells;
      m = board.turn;
      return _ref = m + m + m, __indexOf.call((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = groups.length; _i < _len; _i++) {
          group = groups[_i];
          _results.push(((function() {
            var _j, _len2, _results2;
            _results2 = [];
            for (_j = 0, _len2 = group.length; _j < _len2; _j++) {
              c = group[_j];
              _results2.push(cells[c]);
            }
            return _results2;
          })()).join(""));
        }
        return _results;
      })(), _ref) >= 0;
    };
    stalemate = function(board) {
      return __indexOf.call(board.cells, "-") < 0;
    };
    gametempl = function(board) {
      var c, err, k, makecell;
      makecell = function(c, k) {
        if (c === "-") {
          return [
            'a', {
              href: '#' + k
            }, ''
          ];
        } else {
          return [
            'span', {
              "class": 'tic_' + c
            }, c
          ];
        }
      };
      return [
        'div', {
          "class": 'tic_board'
        }, [
          'div', {
            "class": 'tic_cells'
          }, (function() {
            var _len, _ref, _results;
            _ref = board.cells;
            _results = [];
            for (k = 0, _len = _ref.length; k < _len; k++) {
              c = _ref[k];
              _results.push(makecell(c, k));
            }
            return _results;
          })()
        ], [
          'div', {
            "class": 'tic_turn'
          }, board.turn + "'s turn"
        ], [
          'div', {
            "class": 'tic_state'
          }, board.state
        ], (function() {
          var _i, _len, _ref, _results;
          _ref = board.err;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            err = _ref[_i];
            _results.push([
              'p', {
                "class": 'tic_err'
              }, err
            ]);
          }
          return _results;
        })()
      ];
    };
    this.game = function(player1, player2, starter) {
      var board;
      if (starter == null) starter = "x";
      board = {
        cells: "---------",
        turn: starter,
        state: "",
        err: false
      };
      this.move = function(mv) {
        return move(mv, board);
      };
      this.get_board = function () { return board };
      this.set_board = function (new_board) { return board = new_board };
      this.board = board;
      this.templ = gametempl;
      this.render = function(render_func, templ) {
        if (templ == null) templ = gametempl;
        return render_func(board, templ);
      };
      return this;
    };
    return this;
  };

  root.tic = new TicTacToe();

}).call(this);
