/**
 * splitは、HTMLテキストから「開始タグ」、「終了タグ」、「空タグ」、
 * 「テキストノード」に分割した一次配列を作成し返します
 */

module.exports = split;

/**
 * dependencies
 */
var allTags = require('./allTags');
var parseAttributes = require('./utils/parseAttributes');
var unescapeHTML = require('./utils/unescapeHTML');
var analyzeWhiteSpace = require('./utils/analyzeWhiteSpace');
var isGlobalAttribute = require('./utils/isGlobalAttribute');
var M = require('./message');

// タグ
var TAG = /<(\/)?([a-z][-_0-9a-z:]*)((?:'[^']*'|"[^"]*"|[^>]+)*)?>|(<!--)|(-->)/ig;

// ドキュメントタイプ
var REG_DOCTYPE = /^(\s*)<!doctype ([^>]*)>([\s.]*)$/i;

// 終了位置を検出するための仮タブ
var SPLIT_END_POINT = '</SPLITENDPOINT/>';

/**
 * HTMLを開始ノード・終了ノード・テキストノードなどに分割して返す
 * @method split
 * @param  {String} html
 * @param  {Array}  errs
 * @return {Array}  nodes
 */
function split(html, e) {
  html += SPLIT_END_POINT;
  e = e || function nothingToDo(){};
  var nodes = [];
  var lf = getLf(html); // 改行位置

  var m;
  var lastIndex = 0;
  var dataNode = null;
  var commentNode = null;

  while(m = TAG.exec(html)) {
    var index = m.index;
    var pos = getLineColumn(index, lf);
    var length = m[0].length;
    var endPoint = m[0] === SPLIT_END_POINT;
    var tagName = m[2] ? m[2].toLowerCase() : null;
    var tag = tagName ? allTags[tagName] : null;
    var isEmpty = tag && tag.empty || false;
    var isDataNode = tag && tag.isDataNode || false;  // script,style,textareaなど
    var attributes = m[3] ? m[3].trim() || null : null;
    var emptyEnd = attributes && attributes.slice(-1) === '/';  // "/>""
    if (emptyEnd) {
      attributes = attributes.slice(0, -1);
    }
    var start = !m[1];
    var end = isEmpty || emptyEnd || !start;
    var startComment = m[4];
    var endComment = m[5];

    // コメント内
    if (commentNode) {
      if (startComment) {
        e(pos, M.BEGIN_IN_COMMENT, 'warn');
      } else if (endPoint) {
        e(pos, M.NOT_CLOSED_COMMENT);
      }
      if (endComment || endPoint) {
        commentNode.data = html.slice(commentNode.dataIndex, index);
        delete commentNode.dataIndex;
        nodes.push(commentNode);
        commentNode = null;
        lastIndex = index + length;
      }
      continue;
    // コメント終了(コメント外)
    } else if (endComment) {
      e(pos, M.NOT_OPENED_COMMENT, 'warn');
      continue;
    }

    // script,styleなどのisDataTag=trueの内部
    if (dataNode) {
      if (endPoint) {
        e(pos, [M.NOT_CLOSED_DATANODE, dataNode.tagName]);
      }
      if ((tagName === dataNode.tagName && end) || endPoint) {
        dataNode.data = html.slice(dataNode.dataIndex, index);
        delete dataNode.dataIndex;
        nodes.push(dataNode);
        dataNode = null;
        lastIndex = index + length;
      }
      continue;
    }

    // テキストノード (正規表現のインデックス前をテキストノードと判断)
    if (index !== lastIndex) {
      var text = html.slice(lastIndex, index);
      var textNode = createTextNode(lastIndex, lf, text);
      nodes.push(textNode);
    }

    if (endPoint) {
      break;
    }

    // ここから正規表現に一致したノードの処理

    // ex. </br>
    if (isEmpty && !start) {
      e(pos, M.CLOSED_EMPTY);
      lastIndex = index + length;
      continue;
    }

    // ex. </a />
    if (!start && emptyEnd) {
      e(pos, M.ILLEGAL_TAG_FORMAT);

    // ex. <div />
    } else if(!isEmpty && emptyEnd) {
      e(pos, M.NOT_EMPTY_WITH_SLASH, 'warn');

    }

    // <!--
    if (startComment) {
      commentNode = {
        line: pos.line,
        column: pos.column,
        nodeType: 8, // Node.COMMENT_NODE
        dataIndex: index + length
      };

    // 通常ノード
    } else {
      var node = {
        line: pos.line,
        column: pos.column,
        nodeType: 1, // Node.ELEMENT_NODE
        tagName: tagName
      };
      if (attributes) {
        if (start) {
          setAttributes(node, attributes, pos, e);
        } else {
          e(pos, [M.ENDNODE_WITH_ATTRIBUTE, tagName]);
        }
      }

      // script,styleなどのisDataTag=true
      if (isDataNode) {
        if (end) {
          node.data = null;
          nodes.push(node);
        } else {
          node.dataIndex = index + length;
          dataNode = node;
        }

      // 空要素
      } else if (isEmpty) {
        node.empty = true;
        nodes.push(node);

      // 通常タグ
      } else {
        node.start = start;
        node.end = end;
        nodes.push(node);
      }
    }
    lastIndex = index + length;
  }
  checkDoctype(nodes, e, lf);
  TAG.lastIndex = 0;
  return nodes;
}

/**
 * テキストノードの作成
 * テキストノードのline,columnは最初の文字の位置でホワイトノードを省きます
 * @method createTextNode
 * @param  {Object} index
 * @param  {Array}  lf
 * @param  {String} original
 * @return {Object} textNode
 */
function createTextNode(index, lf, original) {
  var result = analyzeWhiteSpace(original);
  var pos = getLineColumn(index + result.index, lf);
  var textNode = {
    line: pos.line,
    column: pos.column,
    nodeType: 3, // Node.TEXT_NODE
    data: unescapeHTML(result.data),
    original: original
  };
  if (result.whiteSpace) {
    textNode.whiteSpace = true;
  }
  return textNode;
}

/**
 * 改行位置を配列で返す
 * @method getLf
 * @param  {String} html
 * @return {Array}  lf
 */
function getLf(html) {
  // 改行位置
  var idx = -1;
  var lf = [-1];
  while(true) {
    idx = html.indexOf('\n', idx + 1);
    if (idx === -1) {
      break;
    } else {
      lf.push(idx);
    }
  }
  return lf;
}

/**
 * 行数•カラム数を返す
 * @method getLineColumn
 * @param  {Number}     index
 * @param  {Array}      lf
 * @return {Object}     line,column
 */
function getLineColumn(index, lf) {
  for(var line = 0, len = lf.length; line < len; line++) {
    if (index < lf[line]) {
      break;
    }
  }
  var column = index - lf[line - 1];
  if (column === 0) {
    line -= 1;
    column = index - lf[line - 1];
  }
  return {
    line: line,
    column: column
  };
}

/**
 * 属性をオブジェクトにして返す
 * @method getAttributes
 * @param  {Object}   node
 * @param  {String}   attributes
 * @param  {Object}   pos
 * @param  {Function} e
 */
function setAttributes (node, attributes, pos, e) {
  var attrs =  parseAttributes(attributes);
  var formatErrors = attrs.FORMAT_ERRORS;
  if (formatErrors) {
    e(pos, [M.ILLEGAL_ATTRIBUTE, formatErrors.join(',')]);
    delete attrs.FORMAT_ERRORS;
  }
  var escapeErrors = attrs.ESCAPE_ERRORS;
  if (escapeErrors) {
    e(pos, [M.ESCAPE_ATTRIBUTE, escapeErrors.join(',')]);
    delete attrs.ESCAPE_ERRORS;
  }
  if (Object.keys(attrs).length) {
    node.attributes = attrs;
  }

  var tag = allTags[node.tagName];
  // 属性の許可チェック
    // attributes
  if (tag && attrs) {
    var enableAttrs = tag.attributes || {};
    var disabled = Object.keys(attrs).reduce(function(x, name){
      if (!(enableAttrs[name] || isGlobalAttribute(name))) {
        x.push(name);
      }
      return x;
    }, []);
    if (disabled.length) {
      e(pos, [M.DISABLED_ATTRIBUTE, disabled.join(',')], 'notice');
    }
  }
}

/**
 * 最初のノードがドキュメントタイプのノードであれば変換する
 * @method checkDoctype
 * @param  {Array}    nodes
 * @param  {Function} e
 * @param  {Array}    lf
 */
function checkDoctype(nodes, e, lf) {
  var first = nodes[0];
  if (!first || first.nodeType !== 3) {
    return;
  }
  var pos;
  var original = first.original;
  var m = original.match(REG_DOCTYPE);
  if (m) {
    // ドキュメントノードの前に不正な空白が存在する
    if (m[1]) {
      pos = getLineColumn(m[1].length, lf);
      e({line: 1, column: 1}, M.DOCTYPE_BEFORE_WHITESPACE);
    } else {
      pos = {line: 1, column: 1};
    }
    // ドキュメントノード
    nodes[0] = {
      line: pos.line,
      column: pos.column,
      nodeType: 10, // Node.DOCUMENT_TYPE_NODE
      tagName: 'document',
      data: m[2]
    };

    // ドキュメントノードの後ろにテキストノードが存在するか確認
    var text = m[3];
    if (text) {
      var textIndex = m[0].length - text.length;
      var textNode = createTextNode(textIndex, lf, text);
      nodes.splice(1, 0, textNode);
    }
  }
}
