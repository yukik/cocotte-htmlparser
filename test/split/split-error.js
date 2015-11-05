var split = require('../../lib/split');
var M = require('../../lib/message');
var eq = require('assert').deepEqual;

// sprint('$1は$2です', 'ハト', '鳥') -> 'ハトは鳥です'
function sprint() {
  var message = [].slice.call(arguments);
  return message[0].replace(/\$(\d)/g, function(m, idx){
    return message[+idx];
  });
}

// エラーメッセージを追加する関数
var e;

// なし
e = M.provideE();
split('', e);
eq(e.errors, []);

// テキストノード
e = M.provideE();
split('foo', e);
eq(e.errors, []);

// 通常ノード
e = M.provideE();
split('<a>', e);
eq(e.errors, []);

// テキストノード
e = M.provideE();
split('foo', e);
eq(e.errors, []);

// 閉じタグに空タグの/が存在する
e = M.provideE();
split('</a />', e);
eq(e.errors, [
  {
    line: 1,
    column: 1,
    level: 'error',
    message: M.ILLEGAL_TAG_FORMAT
  }
]);

// 空要素の終了タグ
e = M.provideE();
split('</br>', e);
eq(e.errors, [
  {
    line: 1,
    column: 1,
    level: 'error',
    message: M.CLOSED_EMPTY
  }
]);

// コメントノード
e = M.provideE();
split('<!--comment-->', e);
eq(e.errors, []);

// コメントにさらにコメントの開始が含まれている
e = M.provideE();
split('<!-- <!-- -->', e);
eq(e.errors, [
  {
    line:1,
    column: 6,
    level: 'warn',
    message: M.BEGIN_IN_COMMENT
  }
]);

// コメントの外でコメント終了が存在している
e = M.provideE();
split('<!--', e);
eq(e.errors, [
  {
    line:1,
    column: 5,
    level: 'error',
    message: M.NOT_CLOSED_COMMENT
  }
]);

// コメントの外でコメント終了が存在している
e = M.provideE();
split('-->', e);
eq(e.errors, [
  {
    line:1,
    column: 1,
    level: 'warn',
    message: M.NOT_OPENED_COMMENT
  }
]);

// スクリプトが閉じていない
e = M.provideE();
split('<script>', e);
eq(e.errors, [
  {
    line:1,
    column: 9,
    level: 'error',
    message: sprint(M.NOT_CLOSED_DATANODE, 'script')
  }
]);

// 空要素以外にスラッシュ
e = M.provideE();
split('<div />', e);
eq(e.errors, [
  {
    line:1,
    column: 1,
    level: 'warn',
    message: M.NOT_EMPTY_WITH_SLASH
  }
]);

// 属性あり
e = M.provideE();
split('<link class="foo" />', e);
eq(e.errors, []);

// 属性あり(許可されていない)
e = M.provideE();
split('<link unknown />', e);
eq(e.errors, [
  {
    line: 1,
    column: 1,
    level: 'notice',
    message: sprint(M.DISABLED_ATTRIBUTE, 'unknown')
  }
]);

// 終了タグに属性が存在する
e = M.provideE();
split('</div class="foo">', e);
eq(e.errors, [
  {
    line: 1,
    column: 1,
    level: 'error',
    message: sprint(M.ENDNODE_WITH_ATTRIBUTE, 'div')
  }
]);

// 不正な属性
e = M.provideE();
split('<a 123>', e);
eq(e.errors, [
  {
    line:1,
    column: 1,
    level: 'error',
    message: sprint(M.ILLEGAL_ATTRIBUTE, '123')
  }
]);

// エスケープが必要な属性
e = M.provideE();
split('<a href=xxx"xxx>', e);
eq(e.errors, [
  {
    line:1,
    column: 1,
    level: 'error',
    message: sprint(M.ESCAPE_ATTRIBUTE, 'xxx"xxx')
  }
]);

// ドキュメントノードの前に空白
e = M.provideE();
split('  <!DOCTYPE html>', e);
eq(e.errors, [
  {
    line:1,
    column: 1,
    level: 'error',
    message: M.DOCTYPE_BEFORE_WHITESPACE
  }
]);
