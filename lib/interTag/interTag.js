var interHtml     = require('./interHtml');
var interHead     = require('./interHead');
var interBody     = require('./interBody');
var interTbody    = require('./interTbody');
var interColgroup = require('./interColgroup');

/**
 * html5で省略できる開始タグを補完して
 * 省略していない完全な形にもどします
 * 
 * html 
 *  ルートがdocumentの時に自動的に追加
 *
 * head
 *   htmlの最初の子要素がheadではない場合
 *   最初の要素からheadに含むことができる要素までを対象に追加
 *
 * body
 *   htmlにbodyがない場合
 *   bodyの要素に含むことができる要素から最後の要素までを対象に追加
 *
 * tbody
 *   tableの子要素にtrが存在した場合
 *   最初のtrから最後のtrまでをcolgroupの子要素にして補完します
 *
 * colgroup
 *   tableの子要素にcolが存在した場合
 *   最初のcolから最後のcolまでをcolgroupの子要素にして補完します
 */

module.exports = interTag;

function interTag(node) {

  switch(node.tagName) {
  case 'document':
    interHtml(node);
    break;
  case 'html':
    interHead(node);
    interBody(node);
    break;
  case 'table':
    interTbody(node);
    interColgroup(node);
    break;
  }

  // 子要素の確認
  var children = node.children;
  if (children) {
    children.forEach(function(child){
      if (child.nodeType === 1) {
        interTag(child);
      }
    });
  }
}













