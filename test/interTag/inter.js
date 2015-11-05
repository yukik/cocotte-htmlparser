var assert = require('assert');
var eq = assert.deepEqual;
var inter = require('../../lib/interTag/inter');

var parent, node;

// no-children
parent = {};
node = {
  tagName: 'div'
};
inter(parent, node);
eq(parent, {
  children: [
    {
      tagName: 'div'
    }
  ]
});


// unset start & end
parent = {
  children: [
    {tagName: 'a'},
    {tagName: 'b'},
    {tagName: 'c'},
  ]
};
node = {
  tagName: 'div'
};
inter(parent, node);
eq(parent, {
  children: [
    {
      tagName: 'div',
      children: [
        {tagName: 'a'},
        {tagName: 'b'},
        {tagName: 'c'},
      ]
    }
  ]
});


// start=1, end=2
parent = {
  children: [
    {tagName: 'a'},
    {tagName: 'b'},
    {tagName: 'c'},
  ]
};
node = {
  tagName: 'div'
};
inter(parent, node, 1, 2);
eq(parent, {
  children: [
    {tagName: 'a'},
    {
      tagName: 'div',
      children: [
        {tagName: 'b'}
      ]
    },
    {tagName: 'c'},
  ]
});

// start=0
parent = {
  children: [
    {tagName: 'a'},
    {tagName: 'b'},
    {tagName: 'c'},
  ]
};
node = {
  tagName: 'div'
};
inter(parent, node, 0);
eq(parent, {
  children: [
    {
      tagName: 'div',
      children: [
        {tagName: 'a'},
        {tagName: 'b'},
        {tagName: 'c'}
      ]
    }
  ]
});


// start=1
parent = {
  children: [
    {tagName: 'a'},
    {tagName: 'b'},
    {tagName: 'c'},
  ]
};
node = {
  tagName: 'div'
};
inter(parent, node, 1);
eq(parent, {
  children: [
    {tagName: 'a'},
    {
      tagName: 'div',
      children: [
        {tagName: 'b'},
        {tagName: 'c'}
      ]
    }
  ]
});

// start=0, end=3 
parent = {
  children: [
    {tagName: 'a'},
    {tagName: 'b'},
    {tagName: 'c'},
  ]
};
node = {
  tagName: 'div'
};
inter(parent, node, 0, 3);
eq(parent, {
  children: [
    {
      tagName: 'div',
      children: [
        {tagName: 'a'},
        {tagName: 'b'},
        {tagName: 'c'}
      ]
    }
  ]
});
assert(node.parent === parent);
assert(node.children[0].parent === node);
assert(node.children[1].parent === node);
assert(node.children[2].parent === node);















