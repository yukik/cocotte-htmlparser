var rule = require('../rule');

// エラーメッセージ
var M = require('../message');
// M.OPTION

// option プルダウンメニューの選択肢
module.exports = {
  autoClose: 'option,optgroup,/*',
  attributes: 'disabled,label,selected,value',
  parent: 'select,datalist,optgroup',
  contents: {
    ok: 'TEXT'
  },
  rules: [
    childrenRule()
  ]
};

/**
 * この要素が label 属性と value 属性を持つ場合: 空
 * この要素が label 属性を持つが value 属性を持たない場合: テキスト
 * この要素が label 属性を持たない場合: 要素間ホワイトスペースではないテキスト
 */
function childrenRule() {

  var hasLabel = rule.hasAttribute('label');
  var hasValue = rule.hasAttribute('value');
  var hasText =  rule.hasChild('TEXT');

  return function (node, e) {

    var label = hasLabel(node);
    var value = hasValue(node);
    var text  = hasText(node);

    if (label && value && !text) {
      return true;
    }

    if (label && !value) {
      return true;
    }

    if (!label && text) {
      return true;
    }

    e(M.OPTION);
    return false;
  };
}