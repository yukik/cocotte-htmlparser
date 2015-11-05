var rule = require('../../rule');

// SVG 画像
module.exports = {
  type: {
    flow: true
  },
  empty: true,
  attributes: 'x,y,width,height,xlink:href,preserveAspectRatio',
  parent: 'svg',
  rules: [
    rule.hasAllAttributes('x,y,width,height,xlink:href')
  ]
};