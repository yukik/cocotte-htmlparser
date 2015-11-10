
var M = require('../message');

/**
 * 親要素にひとつしか設定してはいけない
 * @method exports
 * @return {Function} onlyOne
 */
module.exports = function () {

  return function onlyOne(node, e) {

    var name = node.tagName;
    var children = node.parent.children;
    var count = children.reduce(function(x, child) {
      if (child.tagName === name) {
        x++;
      }
      return x;
    }, 0);

    var pass = count === 1;

    if (e && !pass) {
      e([M.ONLY_ONE, name]);
    }

    return pass;
  };
};