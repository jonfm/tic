(function() {
  var root, views;

  root = this;

  views = {
    layout: function(d) {
      var css, js;
      return [
        ['!doctype html'], [
          'html', [
            'head', [
              'meta', {
                charset: 'utf-8'
              }
            ], ['title', d.title], (function() {
              var _i, _len, _ref, _results;
              _ref = d.css;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                css = _ref[_i];
                _results.push([
                  'link', {
                    href: '/css/' + css + '.css',
                    rel: 'stylesheet',
                    type: 'text/css'
                  }
                ]);
              }
              return _results;
            })()
          ], [
            'body', [
              'div', {
                id: 'main'
              }, ['h2', d.title], [
                'div', {
                  id: 'newgame'
                }, [
                  'a', {
                    href: '#'
                  }, 'New game'
                ]
              ], [
                'div', {
                  id: 'gamearea'
                }, ''
              ]
            ], (function() {
              var _i, _len, _ref, _results;
              _ref = d.js;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                js = _ref[_i];
                _results.push([
                  'script', {
                    src: js + '.js'
                  }, ''
                ]);
              }
              return _results;
            })()
          ]
        ]
      ];
    }
  };

  root.views = views;

}).call(this);
