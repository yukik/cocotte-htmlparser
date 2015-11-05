var util = require('util');

var M = require('../../lib/message');
var split = require('../../lib/split');
var parse = require('../../lib/parse');
var eq = require('assert').deepEqual;
var er, sp, ps;


var html;

html = '<ul>  <li>foo   <li>bar</ul>';

er = [];
sp = split(html, er);
ps = parse(sp, er);

console.log(sp);

console.log('\n\n\n');

console.log(util.inspect(ps, {depth: null}));

console.log('\n\n\n');

console.log(er);




