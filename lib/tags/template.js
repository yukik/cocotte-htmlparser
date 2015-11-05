// template HTMLフラグメント
module.exports = {
  type: {
    metadata     : true,
    flow         : true,
    phrasing     : true,
    scriptSupport: true
  },
  contents: {
    ok: 'ol,ul,dl,figure,ruby,object,video,audio,table,colgroup,' +
        'thead,tbody,tfoot,tr,fieldset,select',
    metadata: true,
    flow: true
  }
};


