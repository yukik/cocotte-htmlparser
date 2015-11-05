
var getChildNodes = require('../utils/getChildNodes');
var M = require('../message');

/**
 * 最初の要素である
 * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
 * 
 * @method exports
 * @return {Function} isFirstNode
 */
module.exports = function () {

  return function isFirstNode (node, e) {

    var children = getChildNodes(node.parent);
    var index = children.indexOf(node);
    var pass = index === 0;

    if (e && !pass) {
      e([M.IS_FIRST_NODE, node.tagName]);
    }

    return pass;
  };
};