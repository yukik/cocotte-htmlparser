module.exports = interHead;

var rule = require('../rule');
var createNode = require('./createNode');
var inter = require('./inter');
var isAddable = require('../utils/isAddable');


/**
 * headがhtml以下にない場合は追加する
 * node.childrenにheadに追加できないコンテンツが現れるまでのコンテンツを
 * まとめてbodyのchildrenに移動させる
 */
function interHead(node) {
  if (!rule.hasChild('head')(node)) {

    var head = createNode('head');

    var children = node.children;
    if (!children) {
      inter(node, head);
      return;
    }

    var end = -1;

    for (var i = 0,len = children.length; i < len; i++) {
      if (isAddable(head, children[i])) {
        end = i + 1;
      } else {
        break;
      }
    }

    inter(node, head, 0, end);
  }
}