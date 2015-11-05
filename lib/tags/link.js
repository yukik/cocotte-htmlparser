var rule = require('../rule');

// link 別文書との関連付け
module.exports = {
  type: {
    metadata: true
  },
  empty: true,
  attributes: 'crossorigin,href,hreflang,media,rel,sizes,type',
  rules: [
    rule.hasAttribute('href')
  ]
};

