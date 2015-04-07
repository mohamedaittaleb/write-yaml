/*!
 * write-yaml <https://github.com/jonschlinkert/write-yaml>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var YAML = require('js-yaml');
var writeFile = require('write');
var extend = require('extend-shallow');

var defaults = {
  indent:  2,
  skipInvalid:  false,
  flowLevel: -1
};

module.exports = function (dest, data, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('write-yaml async expects a callback function.');
  }
  if (typeof dest !== 'string') {
    return cb(new TypeError('write-yaml async expects dest to be a string.'));
  }
  if (typeof data !== 'object') {
    return cb(new TypeError('write-yaml async expects data to be an object.'));
  }

  opts = extend({}, defaults, opts);
  var yaml = opts.safe ? YAML.safeDump : YAML.dump;

  writeFile(dest, yaml(data, opts), cb);
};

module.exports.sync = function(dest, data, opts) {
  if (typeof dest !== 'string') {
    throw new TypeError('write-yaml expects dest to be a string.');
  }
  if (typeof data !== 'object') {
    throw new TypeError('write-yaml expects data to be an object.');
  }

  opts = extend({}, defaults, opts);
  var yaml = opts.safe ? YAML.safeDump : YAML.dump;

  try {
    return writeFile.sync(dest, yaml(data, opts));
  } catch (err) {
    err.message = 'write-yaml: failed to write "' + dest + '": ' + err.message;
    throw err;
  }
};
