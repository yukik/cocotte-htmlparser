
var getChildNodes = require('../utils/getChildNodes');
var M = require('../message');

/**
 * 前のノードは指定したタグ名の必要がある
 * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
 * 
 * TEXTを指定するとテキストノード、nullを指定すると最初の要素でもよい
 * 
 * @method exports
 * @param  {String}   tagNames 
 * @return {Function} prevNodeIs
 */
module.exports = function (tagNames) {

  var map = tagNames.split(',').reduce(function(x, name){
    x[name] = true;
    return x;
  }, {});

  return function prevNodeIs (node, e) {

    var children = getChildNodes(node.parent);
    var idx = children.indexOf(node);
    var prevNode = children[idx - 1];

    var name = !prevNode               ? 'null' :
               prevNode.nodeType === 1 ? prevNode.tagName :
               'TEXT';

    var pass = map[name] || false;

    if (e && !pass) {
      e([M.PREV_NODE_IS, node.tagName, tagNames]);
    }

    return pass;
  };
};