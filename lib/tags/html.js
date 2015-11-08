var rule = require('../rule');

// html 文書のルート
module.exports = {
  contents: {
    ok: 'head,body'
  },
  attributes: 'manifest',

  rules: [
    rule.onlyOne()
  ]
};