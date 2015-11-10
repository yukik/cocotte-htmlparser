/**
 * parseは、splitで分割された一次配列を、ひとつのオブジェクトに変換します
 * DOMのツリー構造を模したオブジェクトです
 */
module.exports = parse;

/**
 * dependencies
 */
var allTags = require('./allTags');
var getNodeName = require('./utils/getNodeName');
var M = require('./message');

/**
 * splitで分割した開始タグ・終了タグ・空タグ・データタグ・
 * コメントノード・テキストノードをオブジェクトに変換する
 * @method parse
 * @param  {Array}    nodes
 * @param  {Function} e
 * @return {Object}   rootNode
 */
function parse(nodes, e) {
  e = e || function nothingToDo(){};
  var len = nodes.length;
  if (!len) {
    return {};
  }

  // ルートノードを作成
  var root = createRoot(nodes);

  // 各ノードをルートに追加
  buildTree(nodes, root, e);

  return root;
}

/**
 * ルートノードの作成
 * 最初の
 * @method createRoot
 * @param  {Array}   nodes
 * @return {Object}  root
 */
function createRoot(nodes) {
  var first = nodes[0];
  var root;
  var tag;
  if (first.nodeType === 10) { // document
    root = first;
    tag = allTags.document;
  } else {
    root = {
      nodeType: 1,
      tagName: 'fragment'
    };
    tag = allTags.template;
  }
  Object.defineProperty(root, 'tag', {
    value: tag,
    enumerable: false,
    configurable: true,
    writable: true
  });
  return root;
}

/**
 * 各ノードをルートに追加
 * @method buildTree
 * @param  {Array}     nodes
 * @param  {Object}    root
 * @param  {Function}  e
 */
function buildTree(nodes, root, e) {
  var len = nodes.length;
  // ルートの作成でコンテナだった場合はnodesの最初から処理
  var i = root.nodeType === 10 ? 1 : 0;
  var parent = root;

  // 各ノードをルートに追加
  while(i < len) {
    var node = nodes[i];

    // tagプロパティの追加
    if (node.nodeType === 1 && !appendTag(node)) {
      // 不明タグ
      e(node, [M.UNKNOWN_TAG, node.tagName]);
      i++;
      continue;
    }

    // 終了タグ
    if (!node.start && node.end) {
      // 閉じる対象のノードを親をさかのぼって探す
      var newParent = parent;
      while(newParent) {
        if (newParent.tagName === node.tagName) {
          break;
        }
        newParent = newParent.parent;
      }

      // 見つかった場合
      if (newParent) {
        // autoCloseで閉じれるものは閉じる
        parent = autoClose(parent, node);
        // 閉じる対象と現在のノードが一致した
        if (newParent === parent) {
          parent = parent.parent;
        // 一致していない
        } else {
          e(parent, [M.NOT_CLOSED, parent.tagName]);
          parent = newParent.parent;
        }

      // 見つからなかった場合
      } else {
        e(node, [M.NOT_OPENED, node.tagName]);
      }

    // それ以外のタグ
    } else {
      parent = autoClose(parent, node);
      addChildren(parent, node, e);
      // 開始タグの場合は親ノードを現在のノードに変更
      if (node.start && !node.end) {
        parent = node;
      }
      delete node.start;
      delete node.end;
    }
    i++;
  }
  closeEnd(parent, root, e);
}

/**
 * すべてのノードを処理後に閉じていないタグのエラーメッセージを追加
 * @method closeEnd
 * @param  {Object}   node
 * @param  {Object}   root
 * @param  {Function} e
 */
function closeEnd(node, root, e) {
  if (node !== root) {
    var autoClose = node.tag.autoClose;
    if (!(autoClose && autoClose['/*'])) {
      e(node, [M.NOT_CLOSED, node.tagName]);
    }
    closeEnd(node.parent, root, e);
  }
}






/**
 * 自動的に閉じる場合に閉じた後の親を返す
 * @method autoClose
 * @param  {Object} parent
 * @param  {Object} node
 * @return {Object} parent
 */
function autoClose(parent, node) {
  var auto = parent.tag.autoClose;
  if (!auto) {
    return parent;
  }

  var name = getNodeName(node);
  var start = node.start || node.empty || 'data' in node;
  var end = node.end;

  // 開始タグが現れた
  if (start) {
    if (auto[name] || (auto['*'] && !auto['-' + name])) {
      return autoClose(parent.parent, node);
    }
  // 終了タグが現れた
  } else if (end) {
    if (name === parent.tagName) {
      return parent;
    }
    if (auto['/' + name] || (auto['/*'] && !auto['-/' + name])) {
      return autoClose(parent.parent, node);
    }
  }
  return parent;
}

/**
 * 親ノードに子ノードを追加する
 * 追加した子ノードにはparentプロパティを隠れプロパティとして追加する
 * @method addChildren
 * @param  {Object}    parent
 * @param  {Object}    node
 */
function addChildren(parent, node) {
  if (!parent.children) {
    parent.children = [];
  }
  parent.children.push(node);
  Object.defineProperty(node, 'parent', {
    value: parent,
    enumerable: false,
    configurable: true,
    writable: true
  });
}

/**
 * tagプロパティを隠れプロパティで追加
 *   util.inspect depth=null対策
 * @method appendTag
 * @param  {Object}  node
 */
function appendTag(node) {
  var tag = allTags[node.tagName];
  if (tag) {
    Object.defineProperty(node, 'tag', {
      value: tag,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  return tag;
}
