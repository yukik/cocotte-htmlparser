module.exports = escapeHTML;

// 関数escapeHTMLで使用
var CONV_REG = /<|>|'|"|&/g;
var CONV_TABLE = {
  '<' : '&lt;',
  '>' : '&gt;',
  '\'': '&apos;',
  '"' : '&quot;',
  '&' : '&amp;'
};

/**
 * エスケープ
 * @method escapeHTML
 * @param  {String}   value
 * @return {String}   escaped
 */
function escapeHTML (value) {
  return value.replace(CONV_REG, function(m){
    return CONV_TABLE[m[0]];
  });
}
