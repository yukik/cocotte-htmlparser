var rule = require('../rule');

// article 記事セクション
module.exports = {
  type: {
    flow      : rule.hasNotChild('main'),
    sectioning: true,
    palpable  : true

  },
  contents: {
    ng  : 'main',
    flow: true
  }
};