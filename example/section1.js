var htmlParser = require('..');
var path = require('path');
var fs   = require('fs');
var util = require('util');
function l(v) {
  console.log(typeof v === 'object' ? util.inspect(v, {depth: null}) : v);
}
function parse(file) {
  var filePath = path.resolve(__dirname, './' + file + '.html');
  var html = fs.readFileSync(filePath, {encoding: 'utf-8'});
  return htmlParser(html);
}

var file = 'doc4';

var r = parse(file);

l(r.root);
l(r.errors);
l(r.bone());


