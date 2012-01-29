(function() {
  var root, styles;

  root = this;

  styles = function() {
    var alink, boardside, cellside, rounded, shadow;
    shadow = function(x, y, b, clr) {
      return {
        "box-shadow,-moz-box-shadow,-webkit-box-shadow": "" + x + "px " + y + "px " + b + "px " + clr
      };
    };
    rounded = function() {
      var k, v;
      return {
        "border-radius,-moz-border-radius,-webkit-border-radius": ((function() {
          var _results;
          _results = [];
          for (k in arguments) {
            v = arguments[k];
            _results.push(v + "px");
          }
          return _results;
        }).apply(this, arguments)).join(" ")
      };
    };
    boardside = 300;
    cellside = boardside / 3;
    alink = "a, a:link, a:hover, a:active, a:visited";
    return [
      [
        'body', {
          'margin,padding': '0px',
          background: '#fff',
          color: '#000',
          font: [
            {
              family: 'Arial,Helvetica',
              size: '1.2em'
            }
          ]
        }
      ], [
        alink, {
          color: '0000ff',
          'text-decoration': 'none'
        }
      ], [
        '#main', {
          width: '800px',
          margin: '0px auto'
        }
      ], [
        'h1,h2,h3,h4,h5,h6', {
          'font-weight': 'normal'
        }
      ], [
        '.tic_board', {
          'width,height': boardside + 'px',
          border: '1px solid #000',
          margin: '0px auto'
        }
      ], [
        '.tic_cells', [
          alink, {
            padding: '10px',
            'font-style': 'normal',
            float: 'left',
            display: 'block',
            'width,height': cellside - 20 + 'px'
          }, shadow(1, 1, 1, '#000')
        ], [
          'span', {
            display: 'block',
            float: 'left',
            'font-size': '1.5em',
            'text-align': 'center',
            'width,height': cellside + 'px'
          }, shadow(1, 1, 1, '#000')
        ], [
          '.tic_x', {
            background: '#ffcccc'
          }
        ], [
          '.tic_o', {
            background: '#ccffcc'
          }
        ]
      ]
    ];
  };

  root.styles = styles();

}).call(this);
