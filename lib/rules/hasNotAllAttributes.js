
var M = require('../message');

/**
 * 指定したすべての属性を同時に持ってはいけない
 * @method exports
 * @param  {String}   disallowAttrs
 * @return {Function} hasNotAllAttributes
 */
module.exports = function (disallowAttrs) {

  var names = disallowAttrs.split(',');

  return function hasNotAllAttributes (node, e) {

    var attrs = node.attributes;

    var pass = !attrs || names.some(function(name) {
      return !attrs.hasOwnProperty(name);
    });

    if (e && pass) {
      e([M.HAS_NOT_ALL_ATTRIBUTES, disallowAttrs]);
    }

    return pass;
  };
};
