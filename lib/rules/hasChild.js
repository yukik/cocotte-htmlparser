
var M = require('../message');

/**
 * 指定した子要素を持たなくてはいけない
 * 
 * tagNamesは次のとおり
 *   タグ名をカンマ区切りで指定する
 *   テキストノードはTEXT
 *   ホワイトスペースはWHITESPACE
 *   コメントノードはCOMMENT
 *
 * 第二引数にtrueを設定した場合は、子孫も対象にします
 * 
 * @method exports
 * @param  {String}   tagNames
 * @param  {Boolean}  grand
 * @return {Function} hasChild
 */
module.exports = function (tagNames, grand) {

  var map = tagNames.split(',').reduce(function(x, name){
    x[name] = true;
    return x;
  }, {});

  return function hasChild (node, e) {
    var children = node.children;
    var pass = children && children.some(function(child){
      switch(child.nodeType) {

      case 1: // ELEMENT_NODE
        return map[child.tagName] || (grand && hasChild(child));

      case 3: // TEXT_NODE
        return child.whiteSpace ? map.WHITESPACE : map.TEXT;

      case 8: // COMMENT_NODE
        return map.COMMENT;

      default:
        return false;
      }
    });

    if (e && !pass) {
      e([grand ? M.HAS_CHILD_GRAND : M.HAS_CHILD, tagNames]);
    }
    return pass;

  };
};