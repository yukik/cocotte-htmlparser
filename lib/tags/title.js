var rule = require('../rule');

// title タイトル
module.exports = {
  type: {
    metadata: true
  },
  parent: 'head',
  contents: {
    ok: 'TEXT'
  },
  rules: [
    rule.onlyOne()
  ]
};
