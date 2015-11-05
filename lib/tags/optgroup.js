// optgroup プルダウンメニューのグループ化
module.exports = {
  autoClose: 'optgroup,/*',
  attributes: 'disabled,label',
  parent: 'select',
  contents: {
    ok: 'option',
    scriptSupport: true
  }
};
