var util = require('util');


var htmlParser = require('..');

var html = '' +
  '<!DOCTYPE html>\n' +
  // '<!-- commmmmm -->\n' +
  // '<html lang="en">\n' +
  '<head>\n' +
  '  <meta charset="UTF-8">\n' +
  '  <title>Document</title>\n' +
  '<body>\n' +
  '  <h1>title</h1>\n' +
  '  <ul>\n' +
  '    <li class=foo>bar1\n' +
  '    <li class=foo>bar2\n' +
  '    <li class=foo>bar3\n' +
  '    <li class=foo>bar4\n' +
  '    <li class=foo>bar5\n' +
  '  </ul>\n' +
  '<hr />' +
  // '</body>\n' +
  // '</html>' +
  '';


var result = htmlParser(html);

// console.log(util.inspect(result.root, {depth: null}));

// console.log(util.inspect(result.errors, {depth: null}));

console.log(result.bone());

console.log(result.errors);



