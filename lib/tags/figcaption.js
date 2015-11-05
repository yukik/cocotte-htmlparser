var rule = require('../rule');

// エラーメッセージ
var M = require('../message');
// M.FIGCAPTION

// figcaption 図版のキャプション
module.exports = {
  parent: 'figure',
  contents: {
    flow: true
  },
  rules: [
    rule.onlyOne(),
    isFirstOrLastNode()
  ]
};

/**
 * 最初か最後の要素である
 * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
 * 
 * @method isFirstOrLastNode
 * @return {Function}         ruleFn
 */
function isFirstOrLastNode() {

  var isFirst = rule.isFirstNode();
  var isLast = rule.isLastNode();

  return function (node, e) {
    var pass = isFirst(node) || isLast(node);

    if (!pass) {
      e(M.FIGCAPTION);
    }

    return pass;
  };
}