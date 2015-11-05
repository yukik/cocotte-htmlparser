var rule = require('../rule');

// colgroup 列グループ
module.exports = {
  parent: 'table',
  contents: {
    ok: 'col,template'
  },
  attributes: 'span',
  rules: [
    rule.afterNode('caption'),
    rule.beforeNode('thead,tbody,tfoot'),
    childRule
  ]
};

/**
 * span属性もしくはcol,template要素のどちらかを指定しなければいけない
 * @method childRule
 * @param  {Object}     node
 * @param  {Function}   e
 * @return {Boolean}    pass
 */
function childRule (node, e) {
  var hasSpan = node.attributes && 'span' in node.attributes;
  var hasChild = (node.children || []).some(function(child){
    return child.tagName === 'col' || child.tagName === 'template';
  });
  if (hasSpan && hasChild) {
    e('span属性は、colまたはtemplate要素がない場合にのみ指定することができます');
    return false;
  } else if (!hasSpan && !hasChild) {
    e('span属性を指定するかcolまたはtemplate要素を追加する必要があります');
    return false;
  } else {
    return true;
  }
}