module.exports = analyzeWhiteSpace;

var NOT_WHITE_SPACE = /\S/;
var WHITE_SPACE = /\s+/g;

/**
 * ホワイトスペースを分析し、置き換えた文字列と
 * 最初の有効な文字が現れたインデックスを結果で返します
 *
 * 有効な文字の前後に半角スペースが入るのかは、前後にホワイトスペースが
 * ある場合です
 * 
 * @method analyzeWhiteSpace
 * @param  {String} text
 * @return {Object} result
 *             {Number}  index
 *             {String}  data
 *             {Boolean} whiteSpace
 */
function analyzeWhiteSpace(text) {
  var index = 0;
  var data;
  var whiteSpace = false;
  var m = text.match(NOT_WHITE_SPACE);
  if (m) {
    index = m.index;
    data = text.replace(WHITE_SPACE, ' ');
  } else {
    data = text.length ? ' ' : '';
    whiteSpace = true;
  }
  return {
    index: index,
    data: data,
    whiteSpace: whiteSpace
  };
}






