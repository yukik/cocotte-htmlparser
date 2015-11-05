var rule = require('../rule');

// tbody 行ブロック

/**
 * tableの子要素にtrが存在した場合は、complateで補完されます
 */

module.exports = {
  autoClose: 'tbody,tfoot,/*',
  parent: 'table',
  contents: {
    ok           : 'tr',
    scriptSupport: true
  },
  rules: [
    rule.afterNode('caption,colgroup,thead')
  ]
};


