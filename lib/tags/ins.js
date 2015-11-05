var rule = require('../rule');

// ins 追加された部分
module.exports = {
  type: {
    flow    : true,
    phrasing: rule.allChildrenTypeIs('phrasing'),
    palpable: true
  },
  contents: {
    transparent: true
  },
  attributes: 'cite,datetime'
};
