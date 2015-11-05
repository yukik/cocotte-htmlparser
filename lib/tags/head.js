var rule = require('../rule');

// head メタデータの集まり
module.exports = {
  parent: 'html',
  contents: {
    metadata: true
  },
  rules: [
    rule.isFirstNode(),
    rule.hasChild('title')
  ]
};
