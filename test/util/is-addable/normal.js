var eq = require('assert');
var allTags = require('../../../lib/allTags');
var isAddable = require('../../../lib/utils/isAddable');

eq(isAddable(
  {nodeType: 1, tagName: 'div' , tag: allTags.div},
  {nodeType: 1, tagName: 'span', tag: allTags.span}
));

eq(!isAddable(
  {nodeType: 1, tagName: 'div' , tag: allTags.div},
  {nodeType: 1, tagName: 'meta', tag: allTags.meta}
));

eq(isAddable(
  {nodeType: 1, tagName: 'div' , tag: allTags.div},
  {nodeType: 3, data: 'foo'}
));

eq(!isAddable(
  {nodeType: 1, tagName: 'ul' , tag: allTags.ul},
  {nodeType: 3, data: 'foo'}
));

eq(isAddable(
  {nodeType: 1, tagName: 'ul' , tag: allTags.ul},
  {nodeType: 3, data: ' ', whiteSpace: true}
));

eq(isAddable(
  {nodeType: 1, tagName: 'ul' , tag: allTags.ul},
  {nodeType: 8, data: 'comment'}
));