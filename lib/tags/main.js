var rule = require('../rule');
var getRoot = require('../utils/getRoot');
var getNodeList = require('../utils/getNodeList');

// main メインコンテンツ
module.exports = {
  type: {
    flow    : true,
    palpable: true
  },
  contents: {
    flow: true
  },
  rules: [
    rule.parentIsNot('article,aside,footer,header,nav', true),
    onlyOneInDoc
  ]
};


function onlyOneInDoc (node, e) {
  var root = getRoot(node);
  var nodes = getNodeList(root, 'main', true);
  var pass = nodes.length === 1;

  if (!pass) {
    e('main要素はドキュメント内でひとつだけ設定してください');
  }
  return pass;
}

