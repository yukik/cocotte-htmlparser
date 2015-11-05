var rule = require('../rule');

// summary
module.exports = {
  parent: 'details',
  contents: {
    phrasing: true
  },
  rules: [
    rule.isFirstNode()
  ]
};
