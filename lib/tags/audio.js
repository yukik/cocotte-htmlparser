var rule = require('../rule');

// audio 音声
module.exports = {
  type: {
    flow       : true,
    phrasing   : true,
    embedded   : true,
    interactive: rule.hasAttribute('controls'),
    palpable   : rule.hasAttribute('controls')
  },
  contents: {
    transparent: true,
    ok         : 'track,source',
    ng         : 'video,audio'
  },
  attributes: 'autoplay,controls,loop,muted,preload,src',
  rules : [
    childRule()
  ]
};


function childRule () {

  var hasSrc = rule.hasAttribute('src');

  /**
   * TODO: メディア要素を調査中!!
   */
  return function (node, e) {
    var pass;
    var src = hasSrc(node);
    if (src) {
      /**
       * この要素に src 属性がある場合: 
       * 0 個以上の track 要素に続き、トランスペアレント。
       * ただし、子孫にメディア要素が存在しないこと。
       */
      pass = true;
    } else {
      /**
       * この要素に src 属性がない場合: 
       * 0 個以上の source 要素に続き、0 個以上の track 要素、
       * それから、トランスペアレント。
       * ただし、子孫にメディア要素が存在しないこと。
       */
      pass = true;
    }
    if (!pass) {
      e('TODO');
    }
    return pass;
  };
}


