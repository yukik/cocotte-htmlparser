/**
 * ドキュメントのルートを取得する
 * @method exports
 * @param  {Object} node
 * @return {Object} root
 */
module.exports = function getRoot(node) {
  while(node) {
    if (!node.parent) {
      break;
    }
    node = node.parent;
  }
  return node;
};