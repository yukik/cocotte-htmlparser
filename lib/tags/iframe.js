// iframe インラインフレーム
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    embedded   : true,
    interactive: true,
    palpable   : true
  },
  contents: {
    ok: 'TEXT'
  },
  attributes: 'height,name,sandbox,seamless,src,srcdoc,width'
};
