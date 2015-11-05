
module.exports = getChildNodes;

/**
 * scriptSupportタイプ、コメントノード、ホワイトスペースを除いた
 * 子ノードの配列を返します
 * @method getChildNodes
 * @param  {Object}      node
 * @return {Array}       childNodes
 */
function getChildNodes(node) {

  var children = node.children || [];

  return children.filter(function (child){

    switch(child.nodeType) {

    case 1: // ELEMENT_NODE
      var type = child.tag.type;
      return !type || !type.scriptSupport;

    case 3: // TEXT_NODE
      return !child.whiteSpace;

    case 8: // COMMENT_NODE
      return false;

    }
  });
}