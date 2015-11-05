
var hasAttribute = require('./hasAttribute');
var M = require('../message');

/**
 * 指定したひとつの属性を持ってはいけない
 * 第二引数に値を指定した場合は、値が一致しなければ良い
 * @method exports
 * @param  {String}   attrName
 * @param  {String}   value
 * @return {Function} hasNotAttribute
 */
module.exports = function (attrName, value) {

  var has = hasAttribute(attrName, value);

  return function hasNotAttribute(node, e) {

    var eq = has(node);

    if (e && eq) {
      if (value === undefined) {
        e([M.HAS_NOT_ATTRIBUTE, attrName]);
      } else {
        e([M.HAS_NOT_ATTRIBUTE_VALUE, attrName, value]);
      }
    }

    return !eq;
  };
};
