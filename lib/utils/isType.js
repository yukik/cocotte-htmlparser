/**
 * 指定したタイプかどうか
 * @method isType
 * @param  {Object}       node
 * @param  {String|Array} type(s)    配列をした場合は、どれかひとつでも一致ならtrue
 * @param  {Boolean}      whiteSpace ホワイトスペースもテキストノードとして扱う
 * @return {Boolean}      is
 */
module.exports = function isType(node, type, whiteSpace) {
  var nodeType = null;
  switch(node.nodeType) {
  case 1: // ELEMENT_NODE
    nodeType = node.tag.type;
    break;
  case 3: // TEXT_NODE
    if (whiteSpace || !node.whiteSpace) {
      nodeType = {
        flow: true,
        phrasing: true
      };
    }
    break;
  default:
    break;
  }

  if (!nodeType) {
    return false;

  } else if (Array.isArray(type)) {
    return type.some(function(t){
      return match(node, nodeType, t);
    });

  } else {
    return match(node, nodeType, type);

  }
};

function match(node, nodeType, type) {
  var p = nodeType[type];
  if (p === true) {
    return true;
  } else if (typeof p === 'function') {
    return p(node);
  } else {
    return false;
  }
}