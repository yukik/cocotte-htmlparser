var rule = require('../rule');

// thead テーブルヘッダー
module.exports = {
  autoClose: 'tbody,tfoot,/*',
  parent: 'table',
  contents: {
    ok           : 'tr',
    scriptSupport: true
  },
  rules: [
    rule.onlyOne(),
    rule.afterNode('caption,colgroup'),
    rule.beforeNode('tbody,tfoot')
  ]
};
