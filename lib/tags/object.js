var rule = require('../rule');

// object 様々な形式のコンテンツ
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    embedded   : true,
    interactive: rule.hasAttribute('usemap'),
    // リスト対象で、サブミット可能で、再関連付け可能なフォーム関連要素
    palpable   : true
  },
  contents: {
    transparent: true,
    ok         : 'param'
  },
  attributes: 'data,form,height,name,type,usemap,width'
};
