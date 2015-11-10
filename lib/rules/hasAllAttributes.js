
var M = require('../message');

/**
 * 指定したすべての属性が必須である
 * @method exports
 * @param  {String}   requiredAttrs
 * @return {Function} hasAllAttributes
 */
module.exports = function (requiredAttrs) {

  var names = requiredAttrs.split(',');

  return function hasAllAttributes (node, e) {

    var attrs = node.attributes;

    var pass = attrs && names.every(function(name) {
      return attrs.hasOWnProperty(name);
    });

    if (e && !pass) {
      e([M.HAS_ALL_ATTRIBUTES, requiredAttrs]);
    }

    return pass;
  };
};
