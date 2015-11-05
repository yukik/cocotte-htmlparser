var rule = require('../rule');

// meter 数量や割合
module.exports = {
  type: {
    flow    : true,
    phrasing: true,
    palpable: true
  },
  contents: {
    flow    : true,
    phrasing: true
  },
  attributes: 'form,high,low,max,min,optimum,value',
  rules: [
    rule.hasAttribute('value')
  ]
};


