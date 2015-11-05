var rule = require('../rule');

// caption 表のタイトル・説明
module.exports = {
  parent: 'table',
  contents: {
    ng  : 'table',
    flow: true,
  },
  rules: [
    rule.onlyOne(),
    rule.isFirstNode()
  ]
};
