
module.exports = isAddable;

// エラーメッセージ
var M = require('../message');
// ISADDABLE_NOT_ENABLE, child.tagName, parent.tagName
// ISADDABLE_DISABLE   , child.tagName, parent.tagName
// ISADDABLE_PARENT    , child.tagName, child.tag.parent


/**
 * parentにchildは追加できるノードかを確認します
 *
 * 次の条件をすべてクリアしている場合に追加できます
 *
 *   (1) childのparentプロパティが存在しない、もしくはparentのタグが登録されている
 *         parentプロパティがなく、parentのtransparentがtrueなら、parent.parentも同様に確認する
 * 
 *   (2) parentのokにタグが存在する、もしくはcontentsのタイプがtrueのものが一つでもある
 *         なかった場合でもparentのtransparentがtrueなら、parent.parentも同様に確認する
 * 
 *   (3) parentのngにタグが存在しない、かつcontentsのタイプがfalseのものがひとつもない
 *         このチェックはすべての祖先も同様に確認します
 * 
 * @method isAddable
 * @param  {Object}   parent
 * @param  {Object}   child
 * @param  {Function} e        追加できない理由を受け取るコールバック関数
 * @return {Boolean}  addable
 */
function isAddable (parent, child, e) {

  // 子のタグ情報で親のタグ制限に
  if (child.nodeType === 1 && !parentCheck(parent, child, e)) {
    return false;
  }

  var tagName;
  var types;

  switch(child.nodeType) {
  case 1:  // ELEMENT_NODE
    tagName = child.tagName;
    types = getTypes(child);
    break;
  case 3:  // TEXT_NODE
    if (child.whiteSpace) {
      return true;
    } else {
      tagName = 'TEXT';
      types = ['flow', 'phrasing'];
    }
    break;

  case 8:  // COMMENT_NODE
    return true;

  default:
    tagName = child.tagName || 'unknown';
    if (e) {
      e([M.ISADDABLE_NOT_ENABLE, tagName, parent.tagName]);
    }
    return false;
  }

  // 許可されたコンテンツではない
  if(!enable(parent, tagName, types, e)) {
    return false;
  }

  // 許可されていないコンテンツである 
  if (disable(parent, tagName, types, e)) {
    return false;
  }

  return true;
}

/**
 * ノードのタイプを配列で返します
 * 関数が設定されている場合は、処理し真偽値にしtrueのものを含ませます
 * 
 * @method getTypes
 * @param  {Object} node
 * @return {Array}  types
 */
function getTypes(node) {
  var type = node.tag.type;
  if (type) {
    return Object.keys(type).reduce(function(x, key){
      var value = type[key];
      if (value === true || (typeof value === 'function' && value(node))) {
        x.push(key);
      }
      return x;
    }, []);
  } else {
    return [];
  }
}

/**
 * 許可されたコンテンツである
 *
 * 次のいずれかに該当する場合にtrue、それ以外はfalse
 *   okにタグ名が存在する
 *   type=trueとなるタイプを持つ
 *   nodeがtransparent=trueで、親のノードで上記の条件に該当する
 * 
 * @method enable
 * @param  {Object}   node
 * @param  {String}   tagName
 * @param  {Array}    types
 * @param  {Function} e
 * @return {Boolean}
 */
function enable(node, tagName, types, e) {
  var contents = node.tag.contents;

  // 許可されたコンテンツが無い
  if (!contents) {
    if(e) {
      e([M.ISADDABLE_NOT_ENABLE, tagName, node.tagName]);
    }
    return false;
  }

  // ok
  if (contents.ok && contents.ok[tagName]) {
    return true;
  }

  // typeごと
  var typeOK = types.some(function(t){return contents[t];});
  if (typeOK) {
    return true;
  }

  // 親ノードに依存している場合
  if (contents.transparent && node.parent) {
    return enable(node.parent, tagName, types);
  } else {
    if(e) {
      e([M.ISADDABLE_NOT_ENABLE, tagName, node.tagName]);
    }
    return false;
  }
}

/**
 * 許可されないコンテンツである
 *
 * 次のいずれかに該当する場合にtrue、それ以外はfalse
 *   ngにタグ名が存在する
 *   type=falseとなるタイプを持つ
 *   ルートまでさかのぼって繰り返し上記の条件に該当するか確認する
 *   
 * @method disable
 * @param  {Object}   node
 * @param  {String}   tagName
 * @param  {Array}    types
 * @param  {Function} e
 * @return {Boolean}
 */
function disable(node, tagName, types, e) {
  var contents = node.tag.contents;

  if (contents) {
    // ng
    if (contents.ng && contents.ng[tagName]) {
      if (e) {
        e([M.ISADDABLE_DISABLE, tagName, node.tagName]);
      }
      return true;
    }

    // typeごと
    var typeNG = types.some(function(t){return contents[t] === false;});
    if (typeNG) {
      if (e) {
        e([M.ISADDABLE_DISABLE, tagName, node.tagName]);
      }
      return true;

    }
  }

  // 祖先も調査
  var parent = node.parent;
  if (parent) {
    return disable(parent, tagName, types, e);
  } else {
    return false;
  }
}

/**
 * 以下のいずれかの条件に一致する場合はにtrueを返す
 *
 *   (1) 親タグ名がtemplateである
 *   (2) 親限定していない
 *   (3) 親限定をしている場合に親タグ名が含まれている
 *
 * 1であるか、2,3でtransparent=trueの場合は親の親ノードも同じ条件で再度調査する
 *   
 * @method parentCheck
 * @param  {Object}    parent
 * @param  {Object}    child
 * @param  {Function}  e
 * @return {Boolean}   pass
 */
function parentCheck(parent, child, e) {
  var pTagName = parent.tagName;
  var isTemplate = pTagName === 'template';
  var allow = child.tag.parent;

  if (!isTemplate && allow && !allow[pTagName]) {
    if (e) {
      var names = Object.keys(allow).join(',');
      e([M.ISADDABLE_PARENT, child.tagName, names]);
    }
    return false;
  }

  var contents = parent.tag.contents;
  var transparent = contents && contents.transparent && parent.parent;

  if (parent.parent && (isTemplate || transparent)) {
    return parentCheck(parent.parent, child, e);
  } else {
    return true;
  }
}
