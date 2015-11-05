
module.exports = unescapeHTML;

var CONV_REG1 = /&([a-z]+);/g;
var CONV_REG2 = /&#([0-9]+);/g;
var CONV_TABLE = {
  'lt'  : '<',
  'gt'  : '>',
  'quot': '"',
  'apos': '\'',
  'amp' : '&'
};

/**
 * 文字参照を通常文字に戻す
 * @method unescapeHTML
 * @param  {String}     value
 * @return {String}     value
 */
function unescapeHTML(value){
  return value.replace(CONV_REG1, function (m, c) {
    return CONV_TABLE[c] || m;
  }).replace(CONV_REG2, function (m, num) {
    return String.fromCharCode(+num);
  });
}

