// button ボタン
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    interactive: true,
    palpable   : true
    // リスト対象で、ラベル付け可能で、サブミット可能で、
    // 再関連付け可能なフォーム関連要素
  },
  contents: {
    phrasing   : true,
    interactive: false
  },
  attributes: 'autofocus,disabled,form,formaction,' +
              'formenctype,formmethod,formnovalidate,' +
              'formtarget,name,type,value'
};
