var rule = require('../rule');

// datalist 入力候補
module.exports = {
  type: {
    flow    : true,
    phrasing: true
  },
  contents: {
    ok: 'option',
    phrasing: true
  },
  rules: [
    rule.hasAttribute('id')
  ]
};
