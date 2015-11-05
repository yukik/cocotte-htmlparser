
var M = require('../message');

/**
 * 親は指定された要素である
 * grundをtrueに指定した場合は祖先もたどって調査します
 * @method exports
 * @param  {String}   parents
 * @param  {Boolean}  grand
 * @return {Function} parentIs
 */
module.exports = function (tagNames, grand) {

  var map = tagNames.split(',').reduce(function(x, name){
    x[name] = true;
    return x;
  }, {});

  map.template = true;

  return function parentIs (node, e) {

    var parent = node.parent;
    var pass = parent && map[parent.tagName] || false;

    if (grand && !pass && parent) {
      pass = parentIs(parent);
    }

    if (e && !pass) {
      var msg = grand ? M.PARENT_IS_GRAND : M.PARENT_IS;
      e([msg, node.tagName, tagNames]);
    }

    return pass;
  };
};