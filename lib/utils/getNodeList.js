
/**
 * 子ノードで指定したtagNamesのノードをリストします
 * grandをtrueにすると、子孫も対象とします
 * @method exports
 * @param  {Object} node
 * @param  {String}  tagNames
 * @param  {Boolean} grand
 * @return {Array}   nodes
 */
module.exports = function getNodeList (node, tagNames, grand) {

  var map = tagNames.split(',').reduce(function(x, name){
    x[name] = true;
    return x;
  }, {});

  var nodes = [];

  function find (node) {
    var children = node.children;
    if (!children) {
      return;
    }
    children.filter(function(child) {
      switch(child.nodeType) {
      case 1:
        if (map[child.tagName]) {
          nodes.push(child);
        }
        if (grand) {
          find(child);
        }
        break;
      case 3:
        if ((map.TEXT && !child.whiteSpace) ||
            (map.WHITESPACE && child.whiteSpace)) {
          nodes.push(child);
        }
        break;
      case 8:
        if (map.COMMENT) {
          nodes.push(child);
        }
        break;
      }
    });
  }

  find(node);

  return nodes;
};