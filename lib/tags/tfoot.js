
var rule = require('../rule');

// tfoot テーブルフッター
module.exports = {
  autoClose: 'tbody,/*',
  contents: {
    ok           : 'tr',
    scriptSupport: true
  },
  rules: [
    rule.parentIs('table'),
    rule.onlyOne(),
    rule.afterNode('caption,colgroup,thead')
  ]
};
