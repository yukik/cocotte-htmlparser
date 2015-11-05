
var hasChild = require('./hasChild');
var M = require('../message');

/**
 * 指定した子要素を持ってはいけない
 *
 * tagNamesは次のとおり
 *   タグ名をカンマ区切りで指定する
 *   テキストノードはTEXT
 *   ホワイトスペースはWHITESPACE
 *   コメントノードはCOMMENT
 *
 * 第二引数にtrueを設定した場合は、子孫も対象にします
 * 
 * @method exports
 * @param  {String}   tagNames
 * @param  {Boolean}  grand
 * @return {Function} hasNotCHild
 */
module.exports = function (tagNames, grand) {

  var has = hasChild(tagNames, grand);

  return function hasNotChild(node, e) {

    var pass = !has(node);

    if (e && !pass) {
      var msg = grand ? M.HAS_NOT_CHILD_GRAND : M.HAS_NOT_CHILD;
      e([msg, tagNames]);
    }

    return pass;
  };
};