(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('wcwidth')) :
  typeof define === 'function' && define.amd ? define(['wcwidth'], factory) :
  (global = global || self, global.mixme = factory(global.wcwidth));
}(this, function (wcwidth) { 'use strict';

  // Generated by CoffeeScript 2.4.1
  var _pad;

  _pad = function pad(text, length, options) {
    var escapecolor, invert, padlength, textnocolors;

    if (options == null) {
      options = {};
    }

    invert = typeof text === 'number';

    if (invert) {
      var _ref = [text, length];
      length = _ref[0];
      text = _ref[1];
    }

    if (typeof options === 'string') {
      options = {
        "char": options
      };
    }

    if (options["char"] == null) {
      options["char"] = ' ';
    }

    if (options.strip == null) {
      options.strip = false;
    }

    if (typeof text !== 'string') {
      text = text.toString();
    }

    textnocolors = null;
    _pad = '';

    if (options.colors) {
      escapecolor = /\x1B\[(?:[0-9]{1,2}(?:;[0-9]{1,2})?)?[m|K]/g;
      textnocolors = text.replace(escapecolor, '');
    }

    padlength = options.fixed_width ? length - (textnocolors || text).length : length - wcwidth.config(options.wcwidth_options)(textnocolors || text);

    if (padlength < 0) {
      if (options.strip) {
        if (invert) {
          return text.substr(length * -1);
        } else {
          return text.substr(0, length);
        }
      }

      return text;
    }

    _pad += options["char"].repeat(padlength);

    if (invert) {
      return _pad + text;
    } else {
      return text + _pad;
    }
  };

  var pad = _pad;

  // Generated by CoffeeScript 2.4.1
  var color;

  color = function color(string, size) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof options === 'string') {
      options = {
        "char": options
      };
    }

    options.colors = true;
    return pad(string, size, options);
  };

  var color$1 = color;

  return color$1;

}));
