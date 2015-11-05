var rule = require('../rule');

// base 相対パスの基準URI
module.exports = {
  type: {
    metadata: true
  },
  empty: true,
  attributes: 'href,target',
  parent: 'head',
  rules: [
    rule.onlyOne(),
    rule.hasSomeAttributes('href,target')
  ]
};
