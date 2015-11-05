var rule = require('../rule');

// del 削除された部分
module.exports = {
  type: {
    flow    : true,
    phrasing: rule.allChildrenTypeIs('phrasing')
  },
  contents: {
    transparent: true
  },
  attributes: 'cite,datetime'
};
