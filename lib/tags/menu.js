var rule = require('../rule');

// menu コマンドのリスト
module.exports = {
  type: {
    flow       : true,
    interactive: rule.hasAttribute('type', 'toolbar'),
    palpable   : isPalpable()
  },
  contents: {
    ok  : 'li',
    flow: true
  },
  attributes: 'type,label'
};


/**
 * type属性にtoolbarかlistが設定されている場合はpalpable
 * @method isPalpable
 * @return {Function} isPalpable
 */
function isPalpable() {

  var isToolbar =  rule.hasAttribute('type', 'toolbar');
  var isList = rule.hasAttribute('type', 'list');

  return function (node) {
    return isToolbar(node) || isList(node);
  };
}