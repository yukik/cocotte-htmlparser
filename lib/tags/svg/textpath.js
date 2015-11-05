var rule = require('../../rule');

// SVG パス上の文字列
module.exports = {
  type: {
    flow: true
  },
  attributes: 'xlink:href',
  parent: 'text',
  contents: {
    ok: 'TEXT'
  },
  rules: [
    rule.hasAttribute('xlink:href')
  ]
};


