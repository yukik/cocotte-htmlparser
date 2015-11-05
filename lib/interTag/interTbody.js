module.exports = interTbody;

var rule = require('../rule');
var createNode = require('./createNode');
var inter = require('./inter');

/**
 * tableにtrがある場合はtbody追加する
 */
function interTbody(node) {
  var children = node.children;

  if (!children) {
    return;
  }

  var has = rule.hasChild('tr');

  var start = null;
  var end = null;

  children.forEach(function(child, i) {
    if (child.tagName === 'tr' ||
      (child.tagName === 'template' && has(child))) {
      if (start === null) {
        start = i;
      }
      end = i + 1;
    }
  });

  if (start !== null) {
    var tbody = createNode('tbody');
    inter(node, tbody, start, end);
  }
}