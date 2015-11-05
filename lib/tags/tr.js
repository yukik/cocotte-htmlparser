// tr 表の行
module.exports = {
  autoClose: 'tbody,thead,tfoot,tr,/*',
  // tableの子要素として設置できるが、validの前にinterTagで
  // tbodyを補完するため含めていません
  parent: 'thead,tbody,tfoot',
  contents: {
    ok           : 'th,td',
    scriptSupport: true
  }
};


/**
 * 次のルールは、interTagで自動的にtbodyが補完されるため
 * tbodyでのルールで確認されます
 * 
 * caption,colgroup,thead要素より後ろに位置し、
 * table要素の子となるtbody要素が1つもない場合に限ります。
 */