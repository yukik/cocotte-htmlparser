module.exports = interColgroup;

var rule = require('../rule');
var createNode = require('./createNode');
var inter = require('./inter');

/**
 * tableにcolがある場合はcolgroup追加する
 */
function interColgroup(node) {
  var children = node.children;

  if (!children) {
    return;
  }

  var has = rule.hasChild('col');

  var start = null;
  var end = null;

  children.forEach(function(child, i) {
    if (child.tagName === 'col' ||
      (child.tagName === 'template' && has(child))) {
      if (start === null) {
        start = i;
      }
      end = i + 1;
    }
  });

  if (start !== null) {
    var colgroup = createNode('colgroup');
    inter(node, colgroup, start, end);
  }
}