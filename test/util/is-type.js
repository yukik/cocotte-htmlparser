var eq = require('assert');
var allTags = require('../../lib/allTags');
var is = require('../../lib/utils/isType');

eq(!is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'metadata'));
eq( is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'flow'));
eq(!is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'sectioning'));
eq(!is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'heading'));
eq( is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'phrasing'));
eq(!is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'embedded'));
eq(!is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'interactive'));
eq( is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'palpable'));
eq(!is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'sectioningRoot'));
eq(!is({nodeType: 1, tagName: 'span', tag: allTags.span}, 'scriptSupport'));


