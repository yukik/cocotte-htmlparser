var eq = require('assert').deepEqual;
var get = require('../../lib/utils/getRoot');
var node;

node = {nodeType: 1, tagName: 'div', x: 0};
eq(get(node), {nodeType: 1, tagName: 'div', x: 0});


node = {
  nodeType: 1,
  tagName: 'div',
  x: 0,
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

node.children[0].parent = node; // 1
node.children[0].children[0].parent = node.children[0]; // 2
node.children[0].children[1].parent = node.children[0]; // 3
node.children[0].children[1].children[0].parent = node.children[0].children[1]; // 4
node.children[0].children[1].children[1].parent = node.children[0].children[1]; // 5


eq(get(node.children[0]), node);
eq(get(node.children[0].children[0]), node);
eq(get(node.children[0].children[1]), node);
eq(get(node.children[0].children[1].children[0]), node);
eq(get(node.children[0].children[1].children[1]), node);