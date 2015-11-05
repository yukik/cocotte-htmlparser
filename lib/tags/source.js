var rule = require('../rule');

// source 再生候補となるメディアファイル(動画、音声)を指定
module.exports = {
  empty: true,
  attributes: 'media,src,type',
  parent: 'video,audio',
  rules: [
    rule.beforeType('flow'),
    rule.beforeNode('track'),
    rule.hasAttribute('src')
  ]
};
