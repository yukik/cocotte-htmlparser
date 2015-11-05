var rule = require('../../rule');

// SVG 楕円
module.exports = {
  type: {
    flow: true
  },
  empty: true,
  attributes: 'cx,cy,rx,ry,fill',
  parent: 'svg',
  rules: [
    rule.hasAllAttributes('cx,cy,rx,ry')
  ]
};