var rule = require('../rule');


// noscript スクリプトが使用できない環境で表示
module.exports = {
  type: {
    metadata: true,
    flow    : true,
    phrasing: true
  },
  contents: {
    transparent: true,
  },
  rules: [
    rule.parentIsNot('noscript', true)
  ]
};
