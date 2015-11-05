module.exports = interHtml;

var rule = require('../rule');
var createNode = require('./createNode');
var inter = require('./inter');

function interHtml(node) {
  if (!rule.hasChild('html')(node)) {
    var html = createNode('html');
    inter(node, html);
  }
}