
var M = require('../message');

/**
 * 指定した属性のうちひとつは設定する
 * @method exports
 * @param  {String}   orAttrs
 * @return {Function} hasSomeAttributes
 */
module.exports = function (orAttrs) {

  var names = orAttrs.split(',');

  return function hasSomeAttributes (node, e) {

    var attrs = node.attributes || {};
    var pass = names.some(function(name) {
      return attrs.hasOwnProperty(name);
    });

    if (e && !pass) {
      e([M.HAS_SOME_ATTRIBUTES, orAttrs]);
    }

    return pass;
  };
};
