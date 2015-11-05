var rule = require('../rule');

// legend 部品グループのキャプション
module.exports = {
  parent: 'fieldset',
  contents: {
    phrasing: true
  },
  rules: [
    rule.isFirstNode(),
    rule.onlyOne()
  ]
};
