
var rule = require('../rule');

// ul 項目のリスト
module.exports = {
  type: {
    flow    : true,
    palpable: rule.hasChild('li')
  },
  contents: {
    ok           : 'li',
    scriptSupport: true
  }
};
