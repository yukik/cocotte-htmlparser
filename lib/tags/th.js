// th テーブルの見出しセル
module.exports = {
  autoClose:'th,td,tr,tbody,tfoot,/*',
  attributes: 'abbr,colspan,headers,rowspan,scope,sorted,valign,width',
  parent: 'tr',
  contents: {
    ok        : 'dialog',
    ng        : 'header,footer',
    flow      : true,
    sectioning: false,
    heading   : false
  }
};