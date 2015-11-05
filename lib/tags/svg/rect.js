var rule = require('../../rule');

// SVG 四角形
module.exports = {
  type: {
    flow: true
  },
  empty: true,
  attributes: 'x,y,width,height,rx,ry,fill',
  parent: 'svg',
  rules: [
    rule.hasAllAttributes('x,y,width,height')
  ]
};