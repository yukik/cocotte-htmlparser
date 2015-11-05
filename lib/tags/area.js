var rule = require('../rule');

// area イメージマップ領域
module.exports = {
  type: {
    flow    : true,
    phrasing: true
  },
  empty: true,
  attributes: 'alt,coords,download,href,hreflang,media,rel,shape,target,type',
  rules: [
    rule.parentIs('map,template', true)
  ]
};
