var rule = require('../rule');

// dt 記述リストの用語部分
module.exports = {
  autoClose: 'dt,dd,/*',
  parent: 'dl',
  contents: {
    ok      : 'dialog',
    phrasing: true
  },
  rules: [
    rule.nextNodeIs('dd,dt,template')
  ]
};
