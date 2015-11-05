var rule = require('../rule');

// dl 記述リスト
module.exports = {
  type: {
    flow    : true,
    palpable: isPalpable
  },
  contents: {
    ok: 'dt,dd,template',
    scriptSupport: true
  }
};

var hasTm = rule.hasChild('template');
var hasDt = rule.hasChild('dt');
var hasDd = rule.hasChild('dd');
function isPalpable(node) {
  return hasTm(node) || (hasDt(node) && hasDd(node));
}