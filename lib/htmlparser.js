/*
 * @license
 * cocotte-htmlparser v0.3.1
 * Copyright(c) 2015 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */
module.exports = htmlParser;

// クライアント用
if (typeof window === 'object') {
  if (!window.Cocotte){
    window.Cocotte = {};
  }
  window.Cocotte.htmlParser = htmlParser;
}

/**
 * dependencies
 */
var M        = require('./message');
var split    = require('./split');
var parse    = require('./parse');
var interTag = require('./interTag/interTag');
var valid    = require('./valid');
var fnBone   = require('./bone');

/**
 * @method htmlParser
 * @param  {String}   html
 * @return {Result}   result
 */
function htmlParser (html) {
  var errors = [];
  var e = M.provideE(errors);
  var nodes = split(html, e);
  var root = parse(nodes, e);
  interTag(root, e);
  valid(root, e);

  // エラー
  errors.sort(function(x, y){
    return x.line - y.line || x.column - y.column;
  });
  
  var result = Object.create(Result);
  result.root = root;
  result.errors = errors;
  return result;
}

var Result  = {};

/**
 * 枝の形式を返します
 * @method bone
 * @return {String} bone
 */
Result.bone = function () {
  return '-----------------------------------------------------------\n' +
         ' line,  col,  node\n' +
         '-----------------------------------------------------------' +
         fnBone(this.root);
};















