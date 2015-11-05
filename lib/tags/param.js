var rule = require('../rule');

// param プラグインに渡すパラメータ
module.exports = {
  empty: true,
  attributes: 'name,value',
  parent: 'object',
  rules: [
    rule.beforeType('flow')
  ]
};