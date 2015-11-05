var split = require('../../lib/split');
var eq = require('assert').deepEqual;

// なし
eq(split(''), []);

// テキストノード
eq(split('foo'), [
  {
    line:1,
    column:1,
    nodeType: 3,
    data: 'foo',
    original: 'foo'
  }
]);

// テキストノード
eq(split('foo&amp;bar'), [
  {
    line:1,
    column:1,
    nodeType: 3,
    data: 'foo&bar',
    original: 'foo&amp;bar'
  }
]);

// ホワイトスペース1
eq(split('  \n \n  '), [
  {
    line:1,
    column:1,
    nodeType: 3,
    data: ' ',
    original: '  \n \n  ',
    whiteSpace: true
  }
]);

// ホワイトスペース2
eq(split('  \n f    o    o \n  '), [
  {
    line:2,
    column:2,
    nodeType: 3,
    data: ' f o o ',
    original: '  \n f    o    o \n  '
  }
]);

// 開始タグ
eq(split('<a>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'a',
    start: true,
    end: false
  }
]);

// 終了タグ
eq(split('</a>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'a',
    start: false,
    end: true
  }
]);

// 空タグ
eq(split('<br>'), [
  {
    line: 1,
    column: 1,
    nodeType: 1,
    tagName: 'br',
    empty: true
  }
]);

// 開始＆終了タグ
eq(split('<a />'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'a',
    start: true,
    end: true
  }
]);

// 属性あり
eq(split('<a href=#>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'a',
    start: true,
    end: false,
    attributes: {href:'#'}
  }
]);

// 開始タグ・テキストタグ・終了タグ
eq(split('<span>foo</span>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'span',
    start: true,
    end: false
  },
  {
    line:1,
    column:7,
    nodeType: 3,
    data: 'foo',
    original: 'foo'
  },
  {
    line:1,
    column:10,
    nodeType: 1,
    tagName: 'span',
    start: false,
    end: true
  }
]);

// 開始タグ・ホワイトスペース・終了タグ
eq(split('<span>\n</span>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'span',
    start: true,
    end: false
  },
  {
    line:1,
    column:7,
    nodeType: 3,
    data: ' ',
    original: '\n',
    whiteSpace: true
  },
  {
    line:2,
    column:1,
    nodeType: 1,
    tagName: 'span',
    start: false,
    end: true
  }
]);

// 開始タグ・テキストタグ・終了タグ (ホワイトスペース込み)
eq(split('<span>\n  foo\n</span>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'span',
    start: true,
    end: false
  },
  {
    line:2,
    column:3,
    nodeType: 3,
    data: ' foo ',
    original: '\n  foo\n'
  },
  {
    line:3,
    column:1,
    nodeType: 1,
    tagName: 'span',
    start: false,
    end: true
  }
]);

// データタグ(script,styleなど)
eq(split('<script>alert("<a>")</script>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'script',
    data: 'alert("<a>")'
  }
]);

// テータタグ 終了タグ省略
eq(split('<script>alert("<a>")'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'script',
    data: 'alert("<a>")'
  }
]);

// コメントノード
eq(split('<!--<a>-->'), [
  {
    line:1,
    column:1,
    nodeType: 8,
    data: '<a>'
  }
]);

// データタグ コメント含む
eq(split('<script><!--<a>--></script>'), [
  {
    line:1,
    column:1,
    nodeType: 1,
    tagName: 'script',
    data: '<!--<a>-->'
  }
]);

// コメントノード データタグ含む
eq(split('<!--<script>alert(1)</script>-->'), [
  {
    line:1,
    column:1,
    nodeType: 8,
    data: '<script>alert(1)</script>'
  }
]);

// ドキュメントタイプ
eq(split('<!DOCTYPE html>'), [
  {
    line:1,
    column:1,
    nodeType: 10,
    tagName: 'document',
    data: 'html'
  }
]);

// ドキュメントタイプ
eq(split('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" ' +
         '"http://www.w3.org/TR/html4/loose.dtd">'), [
  {
    line:1,
    column:1,
    nodeType: 10,
    tagName: 'document',
    data: 'HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" ' +
          '"http://www.w3.org/TR/html4/loose.dtd"'
  }
]);

// ドキュメントタイプ
eq(split(' \n <!doctype html> \n  <br>'), [
  {
    line:2,
    column:2,
    nodeType: 10,
    tagName: 'document',
    data: 'html'
  },
  {
    line:2,
    column:17,
    nodeType: 3,
    data: ' ',
    original: ' \n  ',
    whiteSpace: true
  },
  {
    line:3,
    column:3,
    nodeType: 1,
    tagName: 'br',
    empty: true
  },
]);








