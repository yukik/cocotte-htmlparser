/**
 * validはrootオブジェクトの整合性を確認し、エラーが存在する場合は
 * コールバック関数を呼び出します
 */

module.exports = valid;

/**
 * dependencies
 */
var isAddable = require('./utils/isAddable');

/**
 * @method valid
 * @param  {Object} root
 */
function valid(node, e) {

  function err (message, level) {
    e(node, message, level);
  }

  // addableContents
  var parent = node.parent;
  if (parent){
    isAddable(parent, node, err);
  }

  // rules
  var tag = node.tag;
  if (tag) {
    var rules = tag.rules;
    if (rules) {
      rules.forEach(function(rule){
        rule(node, err);
      });
    }
  }

  // children
  var children = node.children;
  if (children) {
    children.forEach(function(child){
      valid(child, e);
    });
  }
}
