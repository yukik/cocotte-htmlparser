var htmlParser = require('..');
var path = require('path');
var fs = require('fs');
var util = require('util');
function l(v) {
  console.log(typeof v === 'object' ?
    util.inspect(v, {depth: null}) : v);
}
function parse(file) {
  var filePath = path.resolve(__dirname, './' + file);
  var html = fs.readFileSync(filePath, {encoding: 'utf-8'});
  return htmlParser(html);
}

var file = 'doc2.html';
// var file = 'doc4.html';


var r = parse(file);

// l(r.nodes);

// l(r.root);

l(r.errors);
l(r.bone());



