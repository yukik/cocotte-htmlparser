var rule = require('../rule');

// track テキストトラック(字幕)
module.exports = {
  empty: true,
  attributes: 'default,kind,label,src,srclang',
  parent: 'video,audio',
  rules: [
    rule.beforeType('flow')
  ]
};

