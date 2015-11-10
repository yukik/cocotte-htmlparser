var eq = require('assert').deepEqual;
var get = require('../../lib/utils/getNodeList');
var node;

// SET NODE
node = {
  children: [
    {nodeType: 1, tagName: 'a'},
    {nodeType: 1, tagName: 'span'},
    {nodeType: 3, data: 'foo'},
    {nodeType: 3, data: ' ', whiteSpace: true},
    {nodeType: 8, data: 'comment'}
  ]
};

// a
eq(get(node, 'a'), [
  {nodeType: 1, tagName: 'a'}
]);
eq(get(node, 'a', true), [
  {nodeType: 1, tagName: 'a'}
]);


// TEXT
eq(get(node, 'TEXT'), [
  {nodeType: 3, data: 'foo'}
]);

// WHITESPACE
eq(get(node, 'WHITESPACE'), [
  {nodeType: 3, data: ' ', whiteSpace: true}
]);

// COMMENT
eq(get(node, 'COMMENT'), [
  {nodeType: 8, data: 'comment'}
]);

// ALL
eq(get(node, 'a,span,TEXT,WHITESPACE,COMMENT'), [
  {nodeType: 1, tagName: 'a'},
  {nodeType: 1, tagName: 'span'},
  {nodeType: 3, data: 'foo'},
  {nodeType: 3, data: ' ', whiteSpace: true},
  {nodeType: 8, data: 'comment'}
]);

// a
node = {
  children: [
    {nodeType: 1, tagName: 'a'},
    {nodeType: 1, tagName: 'a'},
    {nodeType: 1, tagName: 'a'}
  ]
};
eq(get(node, 'a'), [
  {nodeType: 1, tagName: 'a'},
  {nodeType: 1, tagName: 'a'},
  {nodeType: 1, tagName: 'a'}
]);


// SET NODE
node = {
  children: [
    {nodeType: 1, tagName: 'div', x: 1, children: [
      {nodeType: 1, tagName: 'div', c: 2},
      {nodeType: 1, tagName: 'div', c: 3, children: [
        {nodeType: 1, tagName: 'div', c: 4},
        {nodeType: 1, tagName: 'div', c: 5},
      ]},
    ]},
  ]
};

// tree div
eq(get(node, 'div'), [
  {nodeType: 1, tagName: 'div', x: 1, children: [
    {nodeType: 1, tagName: 'div', c: 2},
    {nodeType: 1, tagName: 'div', c: 3, children: [
      {nodeType: 1, tagName: 'div', c: 4},
      {nodeType: 1, tagName: 'div', c: 5},
    ]},
  ]}
]);

// tree div grand
eq(get(node, 'div', true), [
  {nodeType: 1, tagName: 'div', x: 1, children: [
    {nodeType: 1, tagName: 'div', c: 2},
    {nodeType: 1, tagName: 'div', c: 3, children: [
      {nodeType: 1, tagName: 'div', c: 4},
      {nodeType: 1, tagName: 'div', c: 5},
    ]},
  ]},
  {nodeType: 1, tagName: 'div', c: 2},
  {nodeType: 1, tagName: 'div', c: 3, children: [
    {nodeType: 1, tagName: 'div', c: 4},
    {nodeType: 1, tagName: 'div', c: 5},
  ]},
  {nodeType: 1, tagName: 'div', c: 4},
  {nodeType: 1, tagName: 'div', c: 5}
]);



