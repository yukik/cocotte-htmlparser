var rule = require('../../rule');

// SVG 文字列
module.exports = {
  type: {
    flow: true
  },
  attributes: 'x,y,font-family,font-weight,font-size,' +
            'font-style,text-decoration,text-anchor,' +
            'letter-spacing,word-spacing,fill,stroke',
  parent: 'svg',
  contents: {
    ok: 'TEXT,tspan,textpath'
  },
  rules: [
    rule.hasAllAttributes('x,y')
  ]
};