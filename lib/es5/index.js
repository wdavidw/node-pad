"use strict";

// Generated by CoffeeScript 2.3.2
var wcwidth;
wcwidth = require('wcwidth');

module.exports = function (text, length, options) {
  var escapecolor, invert, pad, padlength, textnocolors;

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
      char: options
    };
  }

  if (options.char == null) {
    options.char = ' ';
  }

  if (options.strip == null) {
    options.strip = false;
  }

  if (typeof text !== 'string') {
    text = text.toString();
  }

  textnocolors = null;
  pad = '';

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

  pad += options.char.repeat(padlength);

  if (invert) {
    return pad + text;
  } else {
    return text + pad;
  }
};