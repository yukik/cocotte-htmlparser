var M = require('../message');

/**
 * 指定した属性をひとつでも持ってはいけない
 * @method exports
 * @param  {String}   attrNames
 * @return {Function} hasNotSomeAttributes
 */
module.exports = function (attrNames) {

  var names = attrNames.split(',');

  return function hasNotSomeAttributes (node, e) {

    var attrs = node.attributes || {};

    var exists = names.reduce(function(x, name) {
      if (attrs.hasOwnProperty(name)){
        x.push(name);
      }
      return x;
    }, []);

    if (e && exists.length) {
      e([M.HAS_NOT_SOME_ATTRIBUTES, exists.join(',')]);
    }

    return exists.length === 0;
  };
};
