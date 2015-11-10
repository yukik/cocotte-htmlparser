var eq = require('assert').deepEqual;

var allTags = require('../../lib/allTags');
var get = require('../../lib/utils/getChildNodes');
var node;

// all
node = {
  children: [
    {nodeType: 1, tagName: 'a', tag: allTags.a},
    {nodeType: 1, tagName: 'a', tag: allTags.a},
    {nodeType: 1, tagName: 'a', tag: allTags.a}
  ]
};
eq(get(node), [
  {nodeType: 1, tagName: 'a', tag: allTags.a},
  {nodeType: 1, tagName: 'a', tag: allTags.a},
  {nodeType: 1, tagName: 'a', tag: allTags.a}
]);

// none
node = {};
eq(get(node), []);

// scriptSupport
node = {
  children: [
    {nodeType: 1, tagName: 'script', tag: allTags.script}
  ]
};
eq(get(node), []);

// scriptSupport
node = {
  children: [
    {nodeType: 1, tagName: 'template', tag: allTags.template}
  ]
};
eq(get(node), []);

// TEXT
node = {
  children: [
    {nodeType: 3, data: 'foo'}
  ]
};
eq(get(node), [
  {nodeType: 3, data: 'foo'}
]);

// WHITESPACE
node = {
  children: [
    {nodeType: 3, data: ' ', whiteSpace: true}
  ]
};
eq(get(node), []);

// WHITESPACE
node = {
  children: [
    {nodeType: 8, data: 'comment'}
  ]
};
eq(get(node), []);

// mix
node = {
  children: [
    {nodeType: 1, tagName: 'a', tag: allTags.a},
    {nodeType: 1, tagName: 'script', tag: allTags.script},
    {nodeType: 1, tagName: 'span', tag: allTags.span},
    {nodeType: 3, data: 'foo'},
    {nodeType: 3, data: ' ', whiteSpace: true},
    {nodeType: 8, data: 'comment'}
  ]
};
eq(get(node), [
  {nodeType: 1, tagName: 'a', tag: allTags.a},
  {nodeType: 1, tagName: 'span', tag: allTags.span},
  {nodeType: 3, data: 'foo'}
]);