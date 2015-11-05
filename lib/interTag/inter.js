
module.exports = inter;

/**
 * ノードを差し込む
 * parentからnodeに移動させる子ノードのインデックスをstart,endで指定できる
 * @method inter
 * @param  {Object} parent
 * @param  {Object} node
 * @param  {Number} start
 * @param  {Number} end     移動させる最後のインデックスより1多く設定します
 */
function inter (parent, node, start, end) {


  Object.defineProperty(node, 'parent', {
    value: parent,
    enumerable: false,
    configurable: true,
    writable: true
  });

  if (!parent.children) {
    parent.children = [node];
    return;
  }

  var children = parent.children;
  start = start || 0;
  end = end || children.length;

  if (start < end) {
    node.children = children.slice(start, end);
    node.children.forEach(function(child){
      Object.defineProperty(child, 'parent', {
        value: node,
        enumerable: false,
        configurable: true,
        writable: true
      });
    });
    parent.children[start] = node;
    parent.children = children.filter(function(child, i){
      return i - 1 < start || end <= i;
    });
  } else {
    parent.children.splice(start, 0, node);
  }
}
