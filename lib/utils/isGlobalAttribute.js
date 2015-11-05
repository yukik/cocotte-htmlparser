
module.exports = isGlobalAttribute;

/**
 * 指定した名称の属性名がグローバル属性かを判定します
 * 
 * @method isGlobalAttribute
 * @param  {String}   name
 * @return {Boolean}
 */
function isGlobalAttribute (name) {
  name = name.toLowerCase();
  var prefix = name.slice(0,5);
  if (prefix === 'data-' || prefix === 'aria-') {
    return true;
  }
  return ALL_MAP[name] || false;
}


// 属性
var GLOBAL_ATTRIBUTES = ('accesskey,class,contenteditable,contextmenu,' +
                        'dir,draggable,dropzone,hidden,id,lang,spellcheck,' +
                        'style,tabindex,title,translate').split(',');

// body
var WINDOW_EVENTS = ('onafterprint,onbeforeprint,onbeforeunload,onerror,' +
                  'onhashchange,onload,onmessage,onoffline,ononline,' +
                  'onpagehide,onpageshow,onpopstate,onresize,' +
                  'onstorage,onunload').split(',');

var FORM_EVENTS = ('onblur,onchange,oncontextmenu,onfocus,oninput,oninvalid,' +
                  'onreset,onsearch,onselect,onsubmit').split(',');

var KEY_EVENTS = 'onkeydown,onkeypress,onkeyup'.split(',');

var MOUSE_EVENTS = ('onclick,ondblclick,ondrag,ondragend,ondragenter,' +
                  'ondragleave,ondragover,ondragstart,ondrop,onmousedown,' +
                  'onmousemove,onmouseout,onmouseover,onmouseup,onscroll,' +
                  'onwheel').split(',');

var CLIPBOARD_EVENTS = 'oncopy,oncut,onpaste'.split(',');

// audio, embed, img, object, videoなど
var MEDIA_EVENTS = ('onabort,oncanplay,oncanplaythrough,oncuechange,' +
                  'ondurationchange,onemptied,onended,onerror,onloadeddata,' +
                  'onloadedmetadata,onloadstart,onpause,onplay,onplaying,' +
                  'onprogress,onratechange,onseeked,onseeking,onstalled,' +
                  'onsuspend,ontimeupdate,onvolumechange,onwaiting').split(',');

// その他
var MISE_EVENTS = 'onerror,onshow,ontoggle'.split(',');

// 廃止予定
// var DEPRECATED = ['onmousewheel'];

var ALL_MAP = [].concat(
              GLOBAL_ATTRIBUTES,
              WINDOW_EVENTS,
              FORM_EVENTS,
              KEY_EVENTS,
              MOUSE_EVENTS,
              CLIPBOARD_EVENTS,
              MEDIA_EVENTS,
              MISE_EVENTS)
            .reduce(function(x, n){x[n] = true;return x;}, {});

