(function() {

  $(function() {
    var game, gamearea;
    game = null;
    gamearea = $('#gamearea');
    var socket = io.connect('http://localhost:3000');

    $('#newgame a').on('click', function(evt) {
      evt.preventDefault();
      game = new tic.game('Jon', 'Tim');
      socket.emit("newgame", { newgame: true, board: game.board });
    });

    socket.on('newstate', function (data) {
        window.console.log("receiving board: " + data.board.cells);
        if (data.newgame) game = new tic.game('Jon', 'Tim');
        game.set_board( data.board );
        //Don.render(game.board, game.templ);
        return gamearea.html(game.render(Don.render));
    });

    return $('.tic_cells a').live('click', function(evt) {
      var cell, self;
      evt.preventDefault();
      self = $(this);
      cell = self.attr('href').substr(1);
      game.move(game.get_board().turn + cell);
      window.console.log("sending board: " + game.get_board().cells);
      //gamearea.html(game.render(Don.render));
      socket.emit('move', { board: game.get_board() });
      //return gamearea.html(game.render(Don.render));
    });
  });

}).call(this);
