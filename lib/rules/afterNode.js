
// エラーメッセージ
var M = require('../message');
// M.AFTER_NODE node.tagName tagNames

/**
 * 指定した要素よりも後に設定する必要がある
 *
 * tagNamesは次のとおり
 *   タグ名をカンマ区切りで指定する
 *   テキストノードはTEXT
 *   ホワイトスペースはWHITESPACE
 *   コメントノードはCOMMENT
 * 
 * @method exports
 * @param  {String}   tagNames
 * @return {Function} afterNode
 */
module.exports = function (tagNames) {

  var map = tagNames.split(',').reduce(function(x, name){
    x[name] = true;
    return x;
  }, {});

  return function afterNodes (node, e) {
    var children = node.parent.children;
    var nodeIdx = children.indexOf(node);
    var pass = children.every(function(child, i){

      if (i < nodeIdx) {
        return true;
      }

      switch (child.nodeType) {
      case 1: // ELEMENT_NODE
        return !map[child.tagName];

      case 3: // TEXT_NODE
        return !(child.whiteSpace ? map.WHITESPACE : map.TEXT);

      case 8: // COMMENT_NODE
        return !child.COMMENT;
      }
    });

    if (e && !pass) {
      e([M.AFTER_NODE, node.tagName, tagNames]);
    }

    return pass;
  };
};