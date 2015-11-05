var rule = require('../rule');

// img 画像
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    embedded   : true,
    interactive: rule.hasAttribute('usemap'),
    palpable   : true
  },
  empty: true,
  attributes: 'alt,crossorigin,height,ismap,src,usemap,width',
  rules: [
    rule.hasAttribute('src')
  ]
};
