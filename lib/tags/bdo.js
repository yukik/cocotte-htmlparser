var rule = require('../rule');

// bdo 書字方向
module.exports = {
  type: {
    flow    : true,
    phrasing: true,
    palpable: true
  },
  contents: {
    phrasing: true
  },
  rules: [
    rule.hasAttribute('dir')
  ]
};