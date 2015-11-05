
// エラーメッセージ
var M = require('../message');
// M.ALL_CHILDREN_TYPE_IS, node.tagName, type

/**
 * すべての子は指定されたタイプの要素である
 * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
 * 
 * @method exports
 * @param  {String}   type
 * @return {Function} allChildrenTypeIs
 */
module.exports = function (type) {

  return function allChildrenTypeIs (node, e) {

    var children = node.children;
    if (!children) {
      return true;
    }

    var pass = children.every(function(child) {

      var childType;

      switch(child.nodeType) {
      case 1: // ELEMENT_NODE
        childType = child.tag.type;
        if (!childType) {
          return false;
        }
        break;
      case 3: // TEXT_NODE
        if (child.whiteSpace) {
          return true;
        } else {
          childType = {flow: true, phrasing: true};
        }
        break;
      case 8: // COMMENT_NODE
        return true;
      default:
        return false;
      }

      var v = childType[type];
      if (v === true) {
        return true;
      } else if (typeof v === 'function'){
        return v(child);
      } else {
        return false;
      }
    });

    if (e && !pass) {
      e([M.ALL_CHILDREN_TYPE_IS, node.tagName, type]);
    }

    return pass;
  };
};

