(function() {

  $(function() {
    var game, gamearea;
    game = null;
    gamearea = $('#gamearea');
    $('#newgame a').on('click', function(evt) {
      evt.preventDefault();
      game = new tic.game('Jon', 'Tim');
      return gamearea.html(game.render(Don.render));
    });
    return $('.tic_cells a').live('click', function(evt) {
      var cell, self;
      evt.preventDefault();
      self = $(this);
      cell = self.attr('href').substr(1);
      game.move(game.board.turn + cell);
      return gamearea.html(game.render(Don.render));
    });
  });

}).call(this);
