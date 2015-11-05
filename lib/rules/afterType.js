
var isType = require('../utils/isType');

// エラーメッセージ
var M = require('../message');
// M.AFTER_TYPE tagName, ngChild.tagName 

/**
 * 指定したタイプのコンテンツより後に設置する
 * @method exports
 * @param  {String}   type
 * @return {Function} afterType
 */
module.exports = function (type) {

  var types = type.split(',');

  return function afterType(node, e) {

    var children = node.parent.children;
    var idx = children.indexOf(node);
    var tagName = node.tagName;

    var ngChild = children.reduce(function(x, child, i){
      if (x) {
        return x;
      }
      if (idx < i && isType(child, types)) {
        return child;
      } else {
        return null;
      }
    }, null);

    var pass = !ngChild;

    if (e && !pass) {
      e([M.AFTER_TYPE, tagName, ngChild.tagName || 'TEXT']);
    }

    return pass;
  };
};