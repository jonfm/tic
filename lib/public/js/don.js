(function() {
  var Don, isArray, root, toString;

  root = this;

  isArray = Array.isArray || (function(elem) {
    return toString.call(elem) === '[object Array]';
  });

  toString = Object.prototype.toString;

  Don = function() {
    /*
        renderInner : contentArray -> string
        e.g: ["text",["span","innertext"]] -> "text<span>innertext</span>"
    */
    var renderAttrs, renderInner, toHtml;
    renderInner = function(contentArray) {
      var elem;
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = contentArray.length; _i < _len; _i++) {
          elem = contentArray[_i];
          _results.push(isArray(elem) ? toHtml(elem) : elem);
        }
        return _results;
      })()).join("");
    };
    /*
        renderAttrs : object -> string
        e.g: {id:123,class:"someclass"} -> ' id="123" class="someclass"'
    */
    renderAttrs = function(attrObj) {
      var attr, val;
      return ((function() {
        var _results;
        _results = [];
        for (attr in attrObj) {
          val = attrObj[attr];
          _results.push([" ", attr, '="', val, '"'].join(""));
        }
        return _results;
      })()).join("");
    };
    /*
        toHtml : htmlArray -> html
        the main convertor func
        e.g: ["div",["h1","title"],["p","body"]] -> '<div><h1>title</h1><p>body</p></div>'
    */
    toHtml = function(arr) {
      var elem;
      if (isArray(arr[0])) {
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arr.length; _i < _len; _i++) {
            elem = arr[_i];
            _results.push(toHtml(elem));
          }
          return _results;
        })()).join("");
      } else if (arr.length === 0) {
        return "";
      } else {
        if (arr.length === 1) {
          return ["<", arr[0], ">"].join("");
        } else {
          if (toString.call(arr[1]) === '[object Object]') {
            if (arr.length === 2) {
              return ["<", arr[0], renderAttrs(arr[1]), ">"].join("");
            } else {
              return ["<", arr[0], renderAttrs(arr[1]), ">", renderInner(arr.slice(2)), "</", arr[0], ">"].join("");
            }
          } else {
            return ["<", arr[0], ">", renderInner(arr.slice(1)), "</", arr[0], ">"].join("");
          }
        }
      }
    };
    this.toHtml = toHtml;
    this.render = function(data, template, key) {
      return toHtml(template(data, key));
    };
    this.mapRender = function(dataArr, template) {
      var data, key;
      return ((function() {
        var _results;
        _results = [];
        for (key in dataArr) {
          data = dataArr[key];
          _results.push(this.render(data, template, key));
        }
        return _results;
      }).call(this)).join("");
    };
    this.map = this.mapRender;
    this.renderIn = function(data, template, key, parent) {
      return toHtml(template.call(data, key, parent));
    };
    this.mapRenderIn = function(dataArr, template, parent) {
      var data, key;
      return ((function() {
        var _results;
        _results = [];
        for (key in dataArr) {
          data = dataArr[key];
          _results.push(this.renderIn(data, template, key, parent));
        }
        return _results;
      }).call(this)).join("");
    };
    this.mapIn = this.mapRenderIn;
    return this;
  };

  root.Don = new Don();

}).call(this);
