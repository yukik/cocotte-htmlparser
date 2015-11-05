
// エラーメッセージ
var M = require('../message');
// M.RP_BETWEEN_RT
// M.RP_POS

// rp ルビ対応しない場合のカッコを囲む
module.exports = {
  autoClose: 'rb,rt,rtc,rp,/*',
  parent: 'ruby',
  contents: {
    phrasing: true
  },
  rules: [
    posRule
  ]
};

/**
 * rt または rtc 要素の直前または直後のどちらかに
 * いれなければいけません。
 * rt 要素の間に入れることはできません。
 * @method
 * @param  {Object}   node
 * @param  {Function} e
 * @return {Boolean}  pass
 */
function posRule (node, e) {
  var children = node.parent.children;

  var idx = children.indexOf(node);

  var before = children[idx - 1];
  var after = children[idx + 1];

  var bName = before && before.nodeType === 1 && before.tagName || null;
  var aName = after && after.nodeType === 1 && after.tagName || null;

  if (bName === 'rt' && aName === 'rt') {
    e(M.RP_BETWEEN_RT);
    return false;
  } else if (bName === 'rt' || bName === 'rtc' || aName === 'rt' || aName === 'rt') {
    return true;
  } else {
    e(M.RP_POS);
    return false;
  }
}