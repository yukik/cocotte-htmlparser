
var getChildNodes = require('../utils/getChildNodes');
var M = require('../message');

/**
 * 次のノードは指定したタグ名の必要がある
 * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
 * 
 * TEXTを指定するとテキストノード、nullを指定すると最後の要素でもよい
 * 
 * @method exports
 * @param  {String}   tagNames 
 * @return {Function} nextNodeIs
 */
module.exports = function (tagNames) {

  var map = tagNames.split(',').reduce(function(x, name){
    x[name] = true;
    return x;
  }, {});

  return function nextNodeIs (node, e) {

    var children = getChildNodes(node.parent);
    var idx = children.indexOf(node);
    var nextNode = children[idx + 1];

    var name = !nextNode               ? 'null' :
               nextNode.nodeType === 1 ? nextNode.tagName :
               'TEXT';

    var pass = map[name] || false;

    if (e && !pass) {
      e([M.NEXT_NODE_IS, node.tagName, tagNames]);
    }

    return pass;
  };
};