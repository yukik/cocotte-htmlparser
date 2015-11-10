// 既定のキリ番
var DEFAULT_BLOCK = 100;

/**
 * 何行目の何文字目かを計算する関数を返す
 * @method exports
 * @param  {String}   html
 * @param  {Number}   block  キリ番 既定値100
 * @return {Function} getLineColumn
 */
module.exports = function (html, block) {

  block = block || DEFAULT_BLOCK;

  var idx = -1;
  var nextPoint = 1;

  // 改行位置
  var lf = [-1];

  // キリ番ごとの行数
  var points = [1];

  while(true) {
    idx = html.indexOf('\n', idx + 1);
    if (idx === -1) {
      break;
    } else {
      add(idx, true);
    }
  }
  // 最後のインデックスでpointsを記録
  add(html.length + 1);

  // pointsとlfに行数を記録
  function add (idx, addLf) {
    var v = lf.length;
    if (addLf) {
      lf.push(idx);  // 改行のインデックスを記録
    }
    while (nextPoint * block < idx) {
      points[nextPoint] = v - 1; // キリ番が何行目かを記録
      nextPoint++;
    }
  }

  var len = lf.length;

  return function getLineColumn (index) {
    // キリ番の行を調査してからループ処理
    var pIdx = parseInt(index / block, 10);
    var line = pIdx in points ? points[pIdx] : lf.length - 1;

    for(; line < len; line++) {
      if (index < lf[line]) {
        break;
      }
    }
    var column = index - lf[line - 1];
    if (column === 0) {
      line -= 1;
      column = index - lf[line - 1];
    }
    return {line: line, column: column};
  };
};

