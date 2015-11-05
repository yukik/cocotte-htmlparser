var rule = require('../rule');

// data
module.exports = {
  type: {
    flow    : true,
    phrasing: true,
    palpable: true
  },
  contents: {
    phrasing: true
  },
  attributes: 'value',
  rules: [
    rule.hasAttribute('value')
  ]
};
