var rule = require('../rule');

// video 動画
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    embedded   : true,
    interactive: rule.hasAttribute('controls'),
    palpable   : true
  },
  contents: {
    transparent: true,
    ok         : 'track,source',
    ng         : 'video,audio'
  },
  attributes: 'autoplay,controls,height,loop,muted,poster,preload,src,width'
};
