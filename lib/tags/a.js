var rule = require('../rule');

// a リンク
module.exports = {
  type: {
    flow       : true,
    phrasing   : rule.allChildrenTypeIs('phrasing'),
    interactive: true,
    palpable   : true
  },
  contents: {
    transparent: true,
    interactive: false
  },
  attributes: 'href,hreflang,type,rel,media,target,download'
};

