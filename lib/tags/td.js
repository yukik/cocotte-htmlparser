var rule = require('../rule');

// td 表のセルデータ
module.exports = {
  type: {
    sectioningRoot: true
  },
  autoClose:'th,td,tr,tbody,tfoot,/*',
  contents: {
    flow: true
  },
  attributes: 'colspan,headers,rowspan',
  rules: [
    rule.parentIs('tr')
  ]
};
