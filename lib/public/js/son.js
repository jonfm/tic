(function() {
  var Son, isArray, root, toString;

  root = this;

  isArray = Array.isArray || (function(elem) {
    return toString.call(elem) === '[object Array]';
  });

  toString = Object.prototype.toString;

  Son = function() {
    var buildProperties, buildPropertyNames, buildSelector, render, toCss;
    render = function(styleSheetArray) {
      var cssSelectorArray;
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = styleSheetArray.length; _i < _len; _i++) {
          cssSelectorArray = styleSheetArray[_i];
          _results.push(toCss(cssSelectorArray));
        }
        return _results;
      })()).join("\n");
    };
    toCss = function(cssSelectorArray, parent) {
      var elem, selector;
      if (parent == null) parent = null;
      selector = buildSelector(parent, cssSelectorArray[0]);
      return [
        selector, " {\n", ((function() {
          var _i, _len, _ref, _results;
          _ref = cssSelectorArray.slice(1);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elem = _ref[_i];
            if (toString.call(elem) === '[object Object]') {
              _results.push(buildProperties(elem));
            }
          }
          return _results;
        })()).join(""), "}\n"
      ].concat((function() {
        var _i, _len, _ref, _results;
        _ref = cssSelectorArray.slice(1);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          if (isArray(elem)) _results.push(toCss(elem, selector));
        }
        return _results;
      })()).join("");
    };
    buildSelector = function(parent, selector) {
      var parent, parentParts, part, selectorParts;
      if (parent != null) {
        selectorParts = selector.split(",");
        parentParts = parent.split(",");
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = parentParts.length; _i < _len; _i++) {
            parent = parentParts[_i];
            _results.push(((function() {
              var _j, _len2, _results2;
              _results2 = [];
              for (_j = 0, _len2 = selectorParts.length; _j < _len2; _j++) {
                part = selectorParts[_j];
                _results2.push(parent + " " + part);
              }
              return _results2;
            })()).join(", "));
          }
          return _results;
        })()).join(", ");
      } else {
        return selector;
      }
    };
    buildPropertyNames = function(parentParts, cssPropertyNameParts) {
      var cssPropertyNamePart, parent, _i, _len, _results;
      if (parentParts == null) parentParts = null;
      if (parentParts != null) {
        _results = [];
        for (_i = 0, _len = cssPropertyNameParts.length; _i < _len; _i++) {
          cssPropertyNamePart = cssPropertyNameParts[_i];
          _results.push(((function() {
            var _j, _len2, _results2;
            _results2 = [];
            for (_j = 0, _len2 = parentParts.length; _j < _len2; _j++) {
              parent = parentParts[_j];
              _results2.push([parent].concat(cssPropertyNamePart).join("-"));
            }
            return _results2;
          })()).join(""));
        }
        return _results;
      } else {
        return cssPropertyNameParts;
      }
    };
    buildProperties = function(cssPropertyObj, parent) {
      var cssPropertyName, cssPropertyVal, parentParts, propertyName, propertyNames, val;
      if (parent == null) parent = null;
      parentParts = parent ? parent.split(", ") : null;
      return ((function() {
        var _results;
        _results = [];
        for (cssPropertyName in cssPropertyObj) {
          cssPropertyVal = cssPropertyObj[cssPropertyName];
          _results.push((propertyNames = buildPropertyNames(parentParts, cssPropertyName.split(",")), isArray(cssPropertyVal) ? ((function() {
            var _i, _len, _results2;
            _results2 = [];
            for (_i = 0, _len = cssPropertyVal.length; _i < _len; _i++) {
              val = cssPropertyVal[_i];
              _results2.push(buildProperties(val, propertyNames.join(",")));
            }
            return _results2;
          })()).join("") : ((function() {
            var _i, _len, _results2;
            _results2 = [];
            for (_i = 0, _len = propertyNames.length; _i < _len; _i++) {
              propertyName = propertyNames[_i];
              _results2.push("  " + propertyName + ": " + cssPropertyVal + ";\n");
            }
            return _results2;
          })()).join("")));
        }
        return _results;
      })()).join("");
    };
    this.render = render;
    return this;
  };

  root.Son = new Son();

}).call(this);
