var rule = require('../../rule');

// SVG 円
module.exports = {
  type: {
    flow: true
  },
  empty: true,
  attributes: 'cx,cy,r,fill,opacity,stroke-opacity,fill-opacity',
  parent: 'svg',
  rules: [
    rule.hasAllAttributes('cx,cy,r')
  ]
};