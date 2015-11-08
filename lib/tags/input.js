var rule = require('../rule');

// input フォーム部品
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    interactive: rule.hasNotAttribute('type', 'hidden'),
    palpable   : rule.hasNotAttribute('type', 'hidden')
  },
  empty: true,
  attributes: 'accept,alt,autocomplete,autofocus,checked,disabled,' +
              'form,formaction,formenctype,formmethod,formnovalidate,' +
              'formtarget,height,list,max,maxlength,min,multiple,name,' +
              'pattern,placeholder,readonly,required,size,src,step,type,' +
              'value,width'
};
