var rule = require('../rule');

// ol 順序付きリスト
module.exports = {
  type: {
    flow    : true,
    palpable: rule.hasChild('li')
  },
  contents: {
    ok           : 'li',
    scriptSupport: true
  },
  attributes: 'reserved,start,type'
};
