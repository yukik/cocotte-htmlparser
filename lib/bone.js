module.exports = bone;

var INDENT = 2;

/**
 * タグ名、TEXT、COMMENT、WHITESPACEのみで構造を表した文字列を返します
 * @method bone
 * @param  {Object}  node
 * @param  {Number}  nest
 * @param  {Boolean} whiteSpace ホワイトスペースも表示する
 * @return {String}  bone
 */
function bone (node, nest, whiteSpace) {
  nest = nest || 0;
  switch(node.nodeType) {

  case 10: // document
  case 1:  // ELEMENT_NODE 
    var value = getItem(node, node.tagName, nest);
    var children = node.children || [];
    whiteSpace = whiteSpace || enableWhiteSpace(node);
    children.forEach(function(child){
      value += bone(child, nest + 1, whiteSpace);
    });
    return value;

  case 3:  // TEXT_NODE
    if (!node.whiteSpace) {
      return getItem(node, 'TEXT', nest);
    } else if (whiteSpace) {
      return getItem(node, 'WHITESPACE', nest);
    }
    return '';
  case 8:  // COMMENT_NODE
    return getItem(node, 'COMMENT', nest);

  default: // 不明
    return getItem(node, '???undefined???', nest);
  }
}

function enableWhiteSpace(node) {
  var contents = node.tag.contents;
  return contents && contents.whiteSpace === true;
}

/**
 * 表示用一行分
 * @method getItem
 * @param  {Object} node
 * @param  {String} title
 * @param  {Number} nest
 * @return {String} value
 */
function getItem(node, title, nest) {
  var indent = nest ? new Array(nest * INDENT + 1).join(' ') : '';
  var prefix = node.line ?
              ('    ' + node.line   + ',').slice(-6) +
              ('    ' + node.column + ',').slice(-6) :
            '   interTag,';
  return '\n' + prefix + '  '+ indent + title;
}

