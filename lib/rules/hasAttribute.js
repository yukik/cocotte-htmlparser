
var M = require('../message');

/**
 * 指定した属性をもつ
 * 第二引数に値を設定した場合は、値が一致しなければならない
 * @method exports
 * @param  {String}   attrName
 * @param  {String}   value
 * @return {Function} hasAttribute
 */
module.exports = function (attrName, value) {

  var valueCheck = value !== undefined;

  return function hasAttribute(node, e) {

    var attrs = node.attributes;

    var eq = attrs && attrs.hasOwnProperty(attrName) &&
              (!valueCheck || attrs[attrName] === value);

    if (e && !eq) {
      if (valueCheck) {
        e([M.HAS_ATTRIBUTE_VALUE, attrName, value]);
      } else {
        e([M.HAS_ATTRIBUTE, attrName]);
      }
    }

    return eq;
  };
};
