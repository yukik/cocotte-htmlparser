// textarea 複数行の入力フィールド
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    interactive: true,
    palpable   : true
  },
  isDataNode: true,
  attributes: 'autofocus,cols,disabled,form,maxlength,' +
              'name,placeholder,readonly,required,rows,wrap'
};

