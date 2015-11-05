var rule = require('../../rule');

// SVG パス
module.exports = {
  type: {
    flow: true
  },
  empty: true,
  attributes: 'd,stroke,fill',
  parent: 'svg',
  rules: [
    rule.hasAttribute('d')
  ]
};