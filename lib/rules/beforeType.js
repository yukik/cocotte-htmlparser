var isType = require('../utils/isType');
var getNodeName = require('../utils/getNodeName');
var M = require('../message');

/**
 * 指定したタイプのコンテンツより前に設置する
 * @method exports
 * @param  {String}   type
 * @return {Function} beforeType
 */
module.exports = function (type) {

  var types = type.split(',');

  return function beforeType(node, e) {

    var children = node.parent.children;
    var idx = children.indexOf(node);
    var tagName = node.tagName;

    var ngChild = children.reduce(function(x, child, i){
      if (x) {
        return x;
      }
      if (i < idx && isType(child, types)) {
        return child;
      } else {
        return null;
      }
    }, null);

    var pass = !ngChild;

    if (e && !pass) {
      e([M.BEFORE_TYPE, tagName, getNodeName(ngChild)]);
    }

    return pass;
  };
};