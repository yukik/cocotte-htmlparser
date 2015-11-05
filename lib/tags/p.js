
// p 段落
module.exports = {
  type: {
    flow    : true,
    palpable: true
  },
  autoClose: 'address,article,aside,blockquote,div,dl,fieldset,' +
             'footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,' +
             'main,nav,ol,p,pre,section,table,ul,' +
             '/*,-/a',
  contents: {
    phrasing: true
  }
};
