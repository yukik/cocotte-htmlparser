cocotte-htmlparser
======

# はじめに

このモジュールはHTML5パーサーです

大量のHTMLページをスクレイピングするためのものではありません  
次のような目的で使用します  
そのため、速度よりその後の再利用に重点を置いています

  + コーディング時のHTMLファイルの整合性を確認する
  + テンプレートエンジンのコンパイルを行う対象にする

# 使用例

```
var htmlParser = require('cocotte-htmlparser');
var input  = '<ul><li>foo<li>bar</ul>';
var parsed = htmlParser(input);
var root   = parsed.root;
var errors = parsed.errors;
var bone   = parsed.bone();
```

プロパティ・メソッド

  + root   : HTMLを解析したオブジェクト
  + errors : 違反情報
  + bone() : アウトラインの取得

# 対象

html5以外のフォーマットには対応しません  
完全なドキュメントでなくとも一部のドキュメントでも構いません  
最初の文字が`<!DOCTYPE html>`のように、DOCTYPE宣言の場合は完全なドキュメントとして
それ以外を一部のドキュメントして扱います

# 違反

違反は、エラーと警告が存在します  
違反を検出すると次のようなメッセージを表示します

message.jsより抜粋

```
var M = {};

// split.js
M.ILLEGAL_TAG_FORMAT        = 'タグのフォーマットが不正です';
M.CLOSED_EMPTY              = '空要素の終了タグが記述されています';
M.BEGIN_IN_COMMENT          = 'コメントを開始している中にさらにコメントの開始が存在します';
M.NOT_CLOSED_COMMENT        = 'コメントが閉じられていません';
M.NOT_OPENED_COMMENT        = 'コメントの終了に対になる開始が存在しません';
M.NOT_CLOSED_DATANODE       = '$1は閉じられていません';
M.NOT_EMPTY_WITH_SLASH      = '/>は空要素にのみ使用できます';
M.ILLEGAL_ATTRIBUTE         = '不明な属性$1が存在します';
M.ESCAPE_ATTRIBUTE          = '$1はエスケープが必要です';
M.DISABLED_ATTRIBUTE        = '$1に属性$2は許可されていません';
M.ENDNODE_WITH_ATTRIBUTE    = '/$1に属性が設定されています';
M.DOCTYPE_BEFORE_WHITESPACE = 'DOCTYPEの前に空白文字が存在します';

// parse.js
M.UNKNOWN_TAG = '$1は定義されていません';
M.NOT_OPENED  = '$1に対応する開始タグが存在しません';
M.NOT_CLOSED  = '$1は閉じていません';

// rules
M.AFTER_NODE              = '$1は$2より後に設置してください';
M.AFTER_TYPE              = '$1は$2より後に設置してください';
M.ALL_CHILDREN_IS         = '$1は$2以外の子要素を持てません';
M.ALL_CHILDREN_TYPE_IS    = '$1はタイプ$2以外の子要素を持てません';
M.BEFORE_NODE             = '$1は$2より前に設置してください';
M.BEFORE_TYPE             = '$1は$2より前に設置してください';
M.HAS_ALL_ATTRIBUTES      = '属性$1は必ず設定しなければなりません';
M.HAS_ATTRIBUTE           = '属性$1は必ず設定しなければなりません';
M.HAS_ATTRIBUTE_VALUE     = '属性$1に値$2を設定しなければなりません';
M.HAS_CHILD               = '子に$1が必要です';
M.HAS_CHILD_GRAND         = '子孫に$1が必要です';
M.HAS_NOT_ALL_ATTRIBUTES  = '属性$1を同時に設定できません';
M.HAS_NOT_ATTRIBUTE       = '属性$1は設定してはいけません';
M.HAS_NOT_ATTRIBUTE_VALUE = '属性$1に値$2を設定してはいけません';
M.HAS_NOT_CHILD           = '子に$1を含んではいけません';
M.HAS_NOT_CHILD_GRAND     = '子孫に$1を含んではいけません';
M.HAS_NOT_SOME_ATTRIBUTES = '属性$1は設定してはいけません';
M.HAS_SOME_ATTRIBUTES     = '属性$1のいずれかひとつは設定してください';
M.IS_FIRST_NODE           = '$1は最初の要素である必要があります';
M.IS_LAST_NODE            = '$1は最後の要素である必要があります';
M.NEXT_NODE_IS            = '$1は$2の直前に配置する必要があります';
M.ONLY_ONE                = '子要素に$1を複数設定することはできません';
M.PARENT_IS               = '$1の親は$2ではなくてなりません';
M.PARENT_IS_GRAND         = '$1の祖先に$2がありません';
M.PARENT_IS_NOT           = '$1の親は$2ではいけません';
M.PARENT_IS_NOT_GRAND     = '$1の祖先に$2があってはいけません';
M.PREV_NODE_IS            = '$1は$2の直後に配置する必要があります';

// utils
M.ISADDABLE_NOT_ENABLE = '$1は$2の配置することのできるコンテンツの種類ではありません';
M.ISADDABLE_DISABLE    = '$2の配置制限に$1が違反しています';
M.ISADDABLE_PARENT     = '$1の親は$2でなければなりません';

// tags
M.FIGCAPTION    = 'figcaptionは最初または最後の要素である必要があります';
M.OPTION        = 'optionはlabel属性を指定するか子要素にテキストノードを設定する必要があります';
M.RP_BETWEEN_RT = 'rp要素をrt要素の間に配置することはできません';
M.RP_POS        = 'rp要素はrtまたはrtc要素の直前または直後のどちらかに配置しなければいけません';
```











