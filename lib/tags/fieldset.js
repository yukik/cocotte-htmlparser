// fieldset フォーム部品のグループ化
module.exports = {
  type: {
    flow          : true,
    sectioningRoot: true,
    palpable      : true
    // リスト対象 かつ 再関連付け可能なフォーム関連要素
  },
  contents: {
    ok: 'legend',
    flow: true
  },
  attributes: 'disabled,form,name'
};
