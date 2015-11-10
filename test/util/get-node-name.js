var eq = require('assert');
var get = require('../../lib/utils/getNodeName');

eq(get({nodeType: 1 , tagName: 'a'}), 'a');
eq(get({nodeType: 3 , data: 'foo'}), 'TEXT');
eq(get({nodeType: 3 , data: ' ', whiteSpace: true}), 'WHITESPACE');
eq(get({nodeType: 8 , data: 'comment'}), 'COMMENT');
eq(get({nodeType: 10, tagName: 'document'}), 'document');

