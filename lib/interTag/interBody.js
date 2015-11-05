module.exports = interBody;

var rule = require('../rule');
var createNode = require('./createNode');
var inter = require('./inter');
var isAddable = require('../utils/isAddable');

/**
 * bodyがhtml以下にない場合は追加する
 * node.childrenにbodyに追加できるコンテンツの最初のインデックスから
 * 最後のコンテンツまでまとめてbodyのchildrenに移動させる
 */
function interBody(node) {

  if (!rule.hasChild('body')(node)) {

    var body = createNode('body');

    var children = node.children;
    var start = children.length;

    for (var i = 0,len = children.length; i < len; i++) {
      if (isAddable(body, children[i])) {
        start = i;
        break;
      }
    }

    inter(node, body, start);
  }
}