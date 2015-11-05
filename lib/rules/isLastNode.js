
var getChildNodes = require('../utils/getChildNodes');
var M = require('../message');

/**
 * 最後の要素である
 * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
 * 
 * @method exports
 * @return {Function}  isLastNode
 */
module.exports = function () {
  
  return function isLastNode (node, e) {

    var children = getChildNodes(node.parent);
    var index = children.indexOf(node);
    var pass = index === children.length - 1;

    if (e && !pass) {
      e([M.IS_LAST_NODE, node.name]);
    }

    return pass;

  };
};
