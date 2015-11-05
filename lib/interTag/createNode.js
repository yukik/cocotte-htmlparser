module.exports = createNode;

var allTags = require('../allTags');

function createNode(tagName) {

  var node = {
    nodeType: 1,
    tagName: tagName
  };

  Object.defineProperty(node, 'tag', {
    value: allTags[tagName],
    enumerable: false,
    configurable: true,
    writable: true
  });

  return node;
}