var rule = require('../../rule');

// SVG 多角形

module.exports = {
  type: {
    flow: true
  },
  empty: true,
  attributes: 'points,stroke,fill',
  parent: 'svg',
  rules: [
    rule.hasAttribute('points')
  ]
};