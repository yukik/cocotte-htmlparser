/*jshint indent:false*/
// var util = require('util');

var eq = require('assert').deepEqual;
var parse = require('../../lib/parse');
var nodes;


// null
nodes = [];
eq(parse(nodes), {});

// foo
nodes = [
  {nodeType: 3, data: 'foo'}
];
eq(parse(nodes),
  {nodeType: 1, tagName : 'fragment', children: [
    {nodeType: 3, data: 'foo'}
  ]}
);

// <a>foo</a>
nodes = [
  {nodeType: 1, tagName: 'a', start: true},
  {nodeType: 3, data: 'foo'},
  {nodeType: 1, tagName: 'a', end: true},
];
eq(parse(nodes),
  {nodeType: 1, tagName: 'fragment', children: [
    {nodeType: 1, tagName: 'a', children: [
      {nodeType: 3, data: 'foo'}
      ]
    }
  ]}
);

// <a>foo</a>
nodes = [
  {nodeType: 1, tagName: 'a', start: true},
  {nodeType: 3, data: 'foo'},
  {nodeType: 1, tagName: 'a', end: true},
];
eq(parse(nodes),
  {nodeType: 1, tagName: 'fragment', children: [
    {nodeType: 1, tagName: 'a', children: [
      {nodeType: 3, data: 'foo'}
      ]
    }
  ]}
);


