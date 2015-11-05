var parse = require('../../lib/utils/parseAttributes');
var eq = require('assert').deepEqual;

// 基本形
eq(parse('att=foo')    , {att: 'foo'});
eq(parse('att="foo"')  , {att: 'foo'});
eq(parse('att=\'foo\''), {att: 'foo'});
eq(parse('att')        , {att: null});

// 大文字
eq(parse('Att'), {att: null});
eq(parse('ATT'), {att: null});
eq(parse('aTT'), {att: null});

// 許可するキー
eq(parse('att-rib'), {'att-rib': null});
eq(parse('att-000'), {'att-000': null});
eq(parse('att:rib'), {'att:rib': null});

// 空白
eq(parse('   att   ')  , {att: null});
eq(parse(' att   =   foo  '), {att: 'foo'});

// エスケープなし
eq(parse('att=f&o&o'), {att: 'f&o&o'});

// エスケープ
eq(parse('att=f&lt;o')  , {att: 'f<o'});
eq(parse('att=f&gt;o')  , {att: 'f>o'});
eq(parse('att=f&quot;o'), {att: 'f"o'});
eq(parse('att=f&apos;o'), {att: 'f\'o'});
eq(parse('att=f&amp;o') , {att: 'f&o'});

// 複数
eq(parse('att1 att2 att3'), {att1: null, att2: null, att3: null});
eq(parse('att1="foo" att2 =\'bar\''), {att1: 'foo', att2: 'bar'});

// Mastush
eq(parse('att={{foo}}'), {att: '{{foo}}'});

// 違反
eq(parse('12345')  , {FORMAT_ERRORS: ['12345']});
eq(parse('id = 123 456'), {id: '123', FORMAT_ERRORS: ['456']});
eq(parse('~foo'), {foo: null, FORMAT_ERRORS: ['~']});
eq(parse('id=ab\'cd'), {id: 'ab\'cd', ESCAPE_ERRORS:['ab\'cd']});
eq(parse('id=ab"cd'), {id: 'ab"cd', ESCAPE_ERRORS:['ab"cd']});
eq(parse('id=ab`cd'), {id: 'ab`cd', ESCAPE_ERRORS:['ab`cd']});
eq(parse('id=ab=cd'), {id: 'ab=cd', ESCAPE_ERRORS:['ab=cd']});
eq(parse('id=ab<cd'), {id: 'ab<cd', ESCAPE_ERRORS:['ab<cd']});
eq(parse('id=ab>cd'), {id: 'ab>cd', ESCAPE_ERRORS:['ab>cd']});
