var rule = require('../rule');

// body 文書本体
module.exports = {
  type: {
    sectioningRoot: true,
  },
  attributes: 'onafterprint,onbeforeprint,onbeforeunload,onhashchange,' +
              'onmessage,onoffline,ononline,onpagehide,onpageshow,' +
              'onpopstate,onstorage,onunload',
  parent: 'html',
  contents: {
    flow: true
  },
  rules: [
    rule.onlyOne(),
    rule.afterNode('head')
  ]
};
