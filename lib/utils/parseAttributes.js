module.exports = parseAttributes;

var unescapeHTML = require('./unescapeHTML');

// 'もしくは"で囲む必要がある文字
var REG_IN_BRACE = /"|'|`|=|<|>/;

// 属性を抜き出す正規表現
var ATTR = / *([a-z][-:0-9a-z]*)(?: *= *('[^']*'|"[^"]*"|[^ ]+))?/ig;

/**
 * 属性パーサー
 *
 * HTML5に準拠しますが、少しゆるいルールで解析します
 *   属性名=値、属性名='値'、属性名="値"、属性名のいずれか
 *   属性値は大文字小文字を区別せずすべて小文字とみなします
 *   値に半角スペース、"、'、`、=、<、>を含まない場合は、"や'でくくらなくでもかまいません
 *   属性値とスペースと値の間にいくつ半角スペースがあっても無くても構いません。
 *   複数の属性を定義する場合は、１つ以上の半角スペースで区切ります
 *   "や'で値をくくった場合は、次の属性の定義との半角スペースを省略できます
 *   解析できない文字列はスキップします（処理は続行し、）
 *
 * @method parseAttributes
 * @param  {String} text
 * @return {Object} attributes 属性キー値の組み合わせ
 *                    フォーマットエラーの文字列はキーにERRORSに配列で設定されます
 */
function parseAttributes(text) {
  text = text ? text.trim() || null : null;
  if (!text) {
    return {};
  }
  var ENDPOINT = ' ENDPOINT';
  text = text.trim() + ENDPOINT;
  var attrs = {};
  var formatErrors = [];
  var escapeErrors = [];
  var m;
  var lastIndex = 0;

  // ひとつひとつ属性を抜き出しattrsに追加
  while (m = ATTR.exec(text)) {
    var name = m[1].toLowerCase();
    var index = m.index;
    var length = m[0].length;
    // 属性の正規表現にかからない文字があり、フォーマット違反が存在する
    if (lastIndex !== index) {
      formatErrors.push(text.slice(lastIndex, index).trim());
    }
    if (m[0] === ENDPOINT) {
      break;
    }
    attrs[name] = m[2] ? unescape(m[2], escapeErrors) : null;
    lastIndex = index + length;
  }

  // エラーが存在する場合
  if (formatErrors.length) {
    attrs.FORMAT_ERRORS = formatErrors;
  }
  if (escapeErrors.length) {
    attrs.ESCAPE_ERRORS = escapeErrors;
  }


  ATTR.lastIndex = 0;
  return attrs;
}

/**
 * アンエスケープ
 * @method unescape
 * @param  {String} value
 * @param  {Array}  escapeErrors
 * @return {String} unescaped
 */
function unescape(value, escapeErrors) {
  var chr = value[0];
  if (chr === '\'' || chr === '"') {
    value = value.slice(1, value.length - 1);
  } else if (REG_IN_BRACE.test(value)) {
    escapeErrors.push(value);
  }
  return unescapeHTML(value);
}

