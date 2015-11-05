/**
 * 各タグの定義は以下のとおりです
 * 全て省略でき、既定値は以下の設定のとおりです
 *
 * type: {              // コンテンツの種類
 *   metadata      : false, // head内要素と一部はbody内要素
 *   flow          : false, // body内要素
 *   sectioning    : false, // article, aside, nav, section
 *   heading       : false, // h1, h2, h3, h4, h5, h6
 *   phrasing      : false, // TEXT,a,br,code,em,i,img,input,span...
 *   embedded      : false, // audio, canvas, embed, iframe, img, object, video
 *   interactive   : false, // a, input, button...
 *   palpable      : false, // a, abbr, address....
 *   sectioningRoot: false, // blockquote, body, details, fieldset, figure, td,
 *   scriptSupport : false  // script, template
 * },
 * autoClose : null,    // 自動的に親を閉じるタグリスト
 * empty     : false,   // 閉じタグ強制省略。コンテンツを含むことができません
 * isDataNode: false,   // 子ノードを解析しないノード
 * parent    : null,    // 親に設定できるタグ名
 * contents      : {    // 子に設定できるコンテンツの種類
 *   transparent   : false, // a, audio, canvas, del, ins, map, noscript, object, video
 *   metadata      : null,  // true, false
 *   flow          : null,  // true, false
 *   sectioning    : null,  // true, false
 *   heading       : null,  // true, false
 *   phrasing      : null,  // true, false
 *   embedded      : null,  // true, false
 *   interactive   : null,  // true, false
 *   palpable      : null,  // true, false
 *   sectioningRoot: null,  // true, false
 *   scriptSupport : null,  // true, false
 *   ok            : null,  // ノード名を指定
 *   ng            : null,  // ノード名を指定
 *   whiteSpace    : false  // ホワイトスペース処理しないでそのまま受け入れる
 * },
 * attributes    : '',   // 設定できる属性名
 * rules         : [],   // 整合性チェック用ルールの登録
 *
 * [※type]
 *   typeにはtrue,false,関数を設定します
 *   関数の場合は、引数は一つだけでノードを渡しその結果が設定されます
 *   親要素のcontentsの設定により、typeが許可されている子要素かどうかを
 *   判断します
 * 
 * [※autoClose]
 *   カンマ区切りの文字列を指定します
 *   開始タグと終了タグで表記が異なります
 *   開始タグはタグ名、終了タグは/の後にタグ名です
 *   "*"とするとすべての開始タグの前に閉じます
 *   "/*"とするとすべての終了タグの前に閉じます
 *   "*"と"/*"は同時に"-タグ名"と"-/タグ名"を指定することができます
 *   "-"のついたタグでは自動的に閉じません
 *
 * [※empty]
 *   空要素を指定します
 *   閉じタグを明示的に記述することも禁止します
 *   このノードにはchildrenのプロパティは存在しません
 *   br,img,hr,meta,input,embed,area,base,col,keygen,link,param,source
 *
 * [※isDataNode]
 *   子ノードを解析せずにすべてを文字列として扱う場合にtrueにします
 *   dataプロパティに文字列がエスケープされることなく設定されます
 *   このノードにはchildrenのプロパティは存在しません
 *   script,style
 *
 * [※parent]
 *   子ノードが追加できる親ノードのタグ名を指定します
 *   親がtransparentの場合は、その親がタグ名と一致するかを確認します
 *
 * [※contents]
 *   基本はcontentsでtrueになっている種類のtypeをコンテンツとして追加できます
 *   falseの場合はtrueに優先して追加できないと判断されます
 *   okとngには他のすべてより優先されるルールです
 *   それぞれカンマ区切りでタグ名・TEXTを記述します
 *   どちらとも判断できない場合にtransparentがtrueの場合は親のcontentsのルールに従います
 *   それでも判断できない場合はfalseになります
 *   親ノードが不明のルール適用時に親を参照するルールはtrueが返されます
 *   whiteSpaceはtrueになっている場合に、半角スペースや改行を処理せずそのまま残します
 *   現在はwhiteSpace=trueになっているのはpre要素のみです
 *
 * [※attributes]
 *   設定できる属性名を指定します。
 *   複数の属性を設定するにはカンマ区切りにします
 *   id,class,onイベント名などグローバル属性は指定不要です
 *
 * [※rules]
 *   整合性をチェックするためのルールを設定します
 *   配列に関数を設定します
 *   引数はnodeとエラーメッセージを受け取るコールバック関数の２つです
 *   戻り値は真偽値です
 *   ruleの関数を指定することで、簡単に設定する事ができます
 */
var tags = {
  a         : require('./tags/a'),
  abbr      : require('./tags/abbr'),
  address   : require('./tags/address'),
  area      : require('./tags/area'),
  article   : require('./tags/article'),
  aside     : require('./tags/aside'),
  audio     : require('./tags/audio'),

  b         : require('./tags/b'),
  base      : require('./tags/base'),
  bdi       : require('./tags/bdi'),
  bdo       : require('./tags/bdo'),
  blockquote: require('./tags/blockquote'),
  body      : require('./tags/body'),
  br        : require('./tags/br'),
  button    : require('./tags/button'),

  canvas    : require('./tags/canvas'),
  caption   : require('./tags/caption'),
  cite      : require('./tags/cite'),
  code      : require('./tags/code'),
  col       : require('./tags/col'),
  colgroup  : require('./tags/colgroup'),

  data      : require('./tags/data'),
  datalist  : require('./tags/datalist'),
  dd        : require('./tags/dd'),
  del       : require('./tags/del'),
  details   : require('./tags/details'),
  dfn       : require('./tags/dfn'),
  dialog    : require('./tags/dialog'),
  div       : require('./tags/div'),
  dl        : require('./tags/dl'),
  'document': require('./tags/document'),
  dt        : require('./tags/dt'),

  em        : require('./tags/em'),
  embed     : require('./tags/embed'),

  fieldset  : require('./tags/fieldset'),
  figcaption: require('./tags/figcaption'),
  figure    : require('./tags/figure'),
  footer    : require('./tags/footer'),
  form      : require('./tags/form'),
  
  h1        : require('./tags/h1'),
  h2        : require('./tags/h2'),
  h3        : require('./tags/h3'),
  h4        : require('./tags/h4'),
  h5        : require('./tags/h5'),
  h6        : require('./tags/h6'),
  head      : require('./tags/head'),
  header    : require('./tags/header'),
  hr        : require('./tags/hr'),
  html      : require('./tags/html'),

  i         : require('./tags/i'),
  iframe    : require('./tags/iframe'),
  img       : require('./tags/img'),
  input     : require('./tags/input'),
  ins       : require('./tags/ins'),

  kbd       : require('./tags/kbd'),
  keygen    : require('./tags/keygen'),
  
  label     : require('./tags/label'),
  legend    : require('./tags/legend'),
  li        : require('./tags/li'),
  link      : require('./tags/link'),

  main      : require('./tags/main'),
  map       : require('./tags/map'),
  mark      : require('./tags/mark'),
  menu      : require('./tags/menu'),
  menuitem  : require('./tags/menuitem'),
  meta      : require('./tags/meta'),
  meter     : require('./tags/meter'),

  nav       : require('./tags/nav'),
  noscript  : require('./tags/noscript'),

  object    : require('./tags/object'),
  ol        : require('./tags/ol'),
  optgroup  : require('./tags/optgroup'),
  option    : require('./tags/option'),
  output    : require('./tags/output'),

  p         : require('./tags/p'),
  param     : require('./tags/param'),
  pre       : require('./tags/pre'),
  progress  : require('./tags/progress'),

  q         : require('./tags/q'),
 
  rp        : require('./tags/rp'),
  rt        : require('./tags/rt'),
  ruby      : require('./tags/ruby'),
 
  s         : require('./tags/s'),
  samp      : require('./tags/samp'),
  script    : require('./tags/script'),
  section   : require('./tags/section'),
  select    : require('./tags/select'),
  small     : require('./tags/small'),
  source    : require('./tags/source'),
  span      : require('./tags/span'),
  strong    : require('./tags/strong'),
  style     : require('./tags/style'),
  sub       : require('./tags/sub'),
  summary   : require('./tags/summary'),
  sup       : require('./tags/sup'),

  table     : require('./tags/table'),
  tbody     : require('./tags/tbody'),
  td        : require('./tags/td'),
  template  : require('./tags/template'),
  textarea  : require('./tags/textarea'),
  tfoot     : require('./tags/tfoot'),
  thead     : require('./tags/thead'),
  th        : require('./tags/th'),
  time      : require('./tags/time'),
  title     : require('./tags/title'),
  tr        : require('./tags/tr'),
  track     : require('./tags/track'),

  u         : require('./tags/u'),
  ul        : require('./tags/ul'),

  'var'     : require('./tags/var'),
  video     : require('./tags/video'),

  wbr       : require('./tags/wbr'),

  // SVG
  circle    : require('./tags/svg/circle'),
  ellipse   : require('./tags/svg/ellipse'),
  image     : require('./tags/svg/image'),
  line      : require('./tags/svg/line'),
  path      : require('./tags/svg/path'),
  polygon   : require('./tags/svg/polygon'),
  polyline  : require('./tags/svg/polyline'),
  rect      : require('./tags/svg/rect'),
  svg       : require('./tags/svg/svg'),
  text      : require('./tags/svg/text'),
  textpath  : require('./tags/svg/textpath'),
  tspan     : require('./tags/svg/tspan')

};

//プロパティの再設定
Object.keys(tags).forEach(function(name){
  var tag = tags[name];
  // autoClose
  toMap(tag, 'autoClose');
  // empty
  // type
  // parent
  toMap(tag, 'parent');
  // contents
  var contents = tag.contents;
  if (contents) {
    toMap(contents, 'ok');
    toMap(contents, 'ng');
  }
  // attributes
  toMap(tag, 'attributes');
  // rules
});

/**
 * 値にtrueをもつオブジェクトの作成
 * @method toMap
 * @param  {Object} target
 * @param  {String} name
 */
function toMap(target, name) {
  var value = target[name];
  if (typeof value === 'string') {
    target[name] = value.split(',').reduce(function(x, v){
      x[v.trim()] = true;
      return x;
    }, {});
  }
}

module.exports = tags;




// /**
//  * 不明なプロパティが設定されていないかを確認する
//  */
// (function (){
//   var props = {
//     type      : true,
//     autoClose : true,
//     empty     : true,
//     isDataNode: true,
//     parent    : true,
//     contents  : true,
//     attributes: true,
//     rules     : true
//   };
//   var typeProps = {
//     metadata      : true,
//     flow          : true,
//     sectioning    : true,
//     heading       : true,
//     phrasing      : true,
//     embedded      : true,
//     interactive   : true,
//     sectioningRoot: true,
//     palpable      : true,
//     scriptSupport : true
//   };
//   var contentsProps = {
//     transparent   : true,
//     metadata      : true,
//     flow          : true,
//     sectioning    : true,
//     heading       : true,
//     phrasing      : true,
//     embedded      : true,
//     interactive   : true,
//     sectioningRoot: true,
//     palpable      : true,
//     scriptSupport : true,
//     ok            : true,
//     ng            : true,
//     whiteSpace    : true
//   };
//   var unknownProps = [];
//   Object.keys(tags).forEach(function(name){
//     var tag = tags[name];
//     Object.keys(tag).forEach(function(key){
//       if (!props[key]) {
//         unknownProps.push(name + ' - ' + key);
//       }
//     });
//     if (tag.type) {
//       Object.keys(tag.type).forEach(function(key){
//         if (!typeProps[key]) {
//           unknownProps.push(name + ' - type - ' + key);
//         }
//       });
//     }
//     if (tag.contents) {
//       Object.keys(tag.contents).forEach(function(key){
//         if (!contentsProps[key]) {
//           unknownProps.push(name + ' - contents - ' + key);
//         }
//       });
//     }
//   });
//   console.log('unknown tag properties');
//   console.log('----------------------');
//   if (unknownProps.length) {
//     unknownProps.forEach(function(x){
//       console.log(x);
//     });
//   } else {
//     console.log('nothing');
//   }
// })();
