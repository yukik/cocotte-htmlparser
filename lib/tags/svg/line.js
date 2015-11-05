var rule = require('../../rule');

// SVG 直線
module.exports = {
  type: {
    flow: true
  },
  empty: true,
  attributes: 'x1,x2,y1,y2,stroke',
  parent: 'svg',
  rules: [
    rule.hasAllAttributes('x1,x2,y1,y2')
  ]
};