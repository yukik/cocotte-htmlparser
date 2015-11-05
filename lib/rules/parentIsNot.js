
var parentIs = require('./parentIs');
var M = require('../message');

/**
 * 親は指定された要素ではない
 * grundをtrueに指定した場合は祖先をたどり調査します
 * @method exports
 * @param  {String}   parents
 * @param  {Boolean}  grand
 * @return {Function} parentIsNot
 */
module.exports = function (tagNames, grand) {

  var pIs = parentIs(tagNames, grand);

  return function (node, e) {
    var pass = !pIs(node);

    if (e && !pass) {
      var msg = grand ? M.PARENT_IS_NOT_GRAND : M.PARENT_IS_NOT;
      e([msg, node.tagName, tagNames]);
    }

    return pass;
  };

};