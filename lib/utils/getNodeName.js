/**
 * ノード名を返します
 * ノードのタイプにより以下のように返す名前が決まります
 * 
 *   ELEMENT_NODEならタグ名
 *   テキストノードならTEXT
 *   ホワイトスペースノードならWHITESPACE
 *   コメントノードならCOMMENT
 * 
 * @method getNodeName
 * @param  {String} node
 * @return {String} name
 */
module.exports = function getNodeName(node) {
  switch(node.nodeType) {
  case 1:
  case 10:
    return node.tagName;
  case 3:
    return node.whiteSpace ? 'WHITESPACE' : 'TEXT';
  case 8:
    return 'COMMENT';
  }
};