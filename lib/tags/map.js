var rule = require('../rule');

// map イメージマップ
module.exports = {
  type: {
    flow    : true,
    phrasing: rule.allChildrenTypeIs('phrasing'),
    palpable: true
  },
  contents: {
    transparent: true
  },
  attributes: 'name'
};
