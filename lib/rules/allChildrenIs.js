
var M = require('../message');

/**
 * すべての子は指定された要素(タグ名もしくはTEXT)である
 * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
 * 
 * @method exports
 * @param  {String}   tagNames        テキストノードを指定する場合はTEXT
 * @return {Function} allChildrenIs
 */
module.exports = function (tagNames) {

  var map = tagNames.split(',').reduce(function(x, name){
    x[name] = true;
    return x;
  }, {});

  return function allChildrenIs (node, e) {
    var children = node.children;

    if (!children) {
      return true;
    }

    var pass = children.every(function(child){
      switch(child.nodeType) {

      case 1: // ELEMENT_NODE
        var type = child.tag.type;
        return type && type.scriptSupport ? true : map[child.tagName];

      case 3: // TEXT_NODE
        return child.whiteSpace ? true : map.TEXT;

      case 8: // COMMENT_NODE
        return true;

      default:
        return false;
      }
    });
    if (e && !pass) {
      e([M.ALL_CHILDREN_IS, node.tagName, tagNames]);
    }
    return pass;
  };
};