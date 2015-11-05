var rule = require('../rule');

// dd 記述リストの説明
module.exports = {
  autoClose: 'dt,dd,/*',
  parent: 'dl',
  contents: {
    flow: true,
  },
  rules: [
    rule.prevNodeIs('dt,dd,template')
  ]
};



