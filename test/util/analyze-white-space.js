var an = require('../../lib/utils/analyzeWhiteSpace');
var eq = require('assert').deepEqual;

eq(an('foo'), {
  index: 0,
  data: 'foo',
  whiteSpace: false
});

eq(an(' foo'), {
  index: 1,
  data: ' foo',
  whiteSpace: false
});

eq(an(' foo '), {
  index: 1,
  data: ' foo ',
  whiteSpace: false
});

eq(an('  foo  '), {
  index: 2,
  data: ' foo ',
  whiteSpace: false
});

eq(an(' \n\n\n foo  '), {
  index: 5,
  data: ' foo ',
  whiteSpace: false
});

eq(an('f        o        o'), {
  index: 0,
  data: 'f o o',
  whiteSpace: false
});

eq(an(''), {
  index: 0,
  data: '',
  whiteSpace: true
});

eq(an(' '), {
  index: 0,
  data: ' ',
  whiteSpace: true
});

eq(an('  \n  \n '), {
  index: 0,
  data: ' ',
  whiteSpace: true
});
