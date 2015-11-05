/**
 * ルールは高階関数(関数を返す関数)を設定します
 *
 * 各タグの整合性をチェックするためにrulesに設定したり
 * typeを確定するために使用します
 * 
 * 返された関数の引数はnodeとエラーメッセージを受け取るコールバック関数です
 * コールバック関数は引数に設定されなかった場合でも適切に動作するようにします
 * 戻り値は、ルールに従っているか従っていないかの真偽値です
 */
var rule = {

  /**
   * 指定した要素よりも後に設定する必要がある
   *
   * tagNamesは次のとおり
   *   タグ名をカンマ区切りで指定する
   *   テキストノードはTEXT
   *   ホワイトスペースはWHITESPACE
   *   コメントノードはCOMMENT
   * 
   * @param  {String}   tagNames
   * @return {Function} afterNode
   */
  afterNode: require('./rules/afterNode'),

  /**
   * 指定したタイプのコンテンツより後に設置する
   * @param  {String}   type
   * @return {Function} afterType
   */
  afterType: require('./rules/afterType'),

  /**
   * すべての子は指定された要素(タグ名もしくはTEXT)である 
   * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
   * 
   * @param  {String}   tagNames        テキストノードを指定する場合はTEXT
   * @return {Function} allChildrenIs
   */
  allChildrenIs: require('./rules/allChildrenIs'),

  /**
   * すべての子は指定されたタイプの要素である
   * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
   * 
   * @param  {String}   type
   * @return {Function} allChildrenTypeIs
   */
  allChildrenTypeIs: require('./rules/allChildrenTypeIs'),

  /**
   * 指定した要素よりも前に設定する必要がある
   *
   * tagNamesは次のとおり
   *   タグ名をカンマ区切りで指定する
   *   テキストノードはTEXT
   *   ホワイトスペースはWHITESPACE
   *   コメントノードはCOMMENT
   *
   * @param  {String}   tagNames
   * @return {Function} beforeNode
   */
  beforeNode: require('./rules/beforeNode'),

  /**
   * 指定したタイプのコンテンツより前に設置する
   * @param  {String}   type
   * @return {Function} beforeType
   */
  beforeType: require('./rules/beforeType'),

  /**
   * 指定したすべての属性が必須である
   * @param  {String}   requiredAttrs
   * @return {Function} hasAllAttributes
   */
  hasAllAttributes: require('./rules/hasAllAttributes'),

  /**
   * 指定した属性をもつ
   * 第二引数に値を設定した場合は、値が一致しなければならない
   * @param  {String}   attrName
   * @param  {String}   value
   * @return {Function} hasAttribute
   */
  hasAttribute: require('./rules/hasAttribute'),

  /**
   * 指定した子要素を持たなくてはいけない
   * 
   * tagNamesは次のとおり
   *   タグ名をカンマ区切りで指定する
   *   テキストノードはTEXT
   *   ホワイトスペースはWHITESPACE
   *   コメントノードはCOMMENT
   *
   * 第二引数にtrueを設定した場合は、子孫も対象にします
   * 
   * @param  {String}   tagNames
   * @param  {Boolean}  grand
   * @return {Function} hasChild
   */
  hasChild: require('./rules/hasChild'),

  /**
   * 指定したすべての属性を同時に持ってはいけない
   * @param  {String}   disallowAttrs
   * @return {Function} hasNotAllAttributes
   */
  hasNotAllAttributes: require('./rules/hasNotAllAttributes'),

  /**
   * 指定したひとつの属性を持ってはいけない
   * 第二引数に値を指定した場合は、値が一致しなければ良い
   * @param  {String}   attrName
   * @param  {String}   value
   * @return {Function} hasNotAttribute
   */
  hasNotAttribute: require('./rules/hasNotAttribute'),

  /**
   * 指定した子要素を持ってはいけない
   *
   * tagNamesは次のとおり
   *   タグ名をカンマ区切りで指定する
   *   テキストノードはTEXT
   *   ホワイトスペースはWHITESPACE
   *   コメントノードはCOMMENT
   *
   * 第二引数にtrueを設定した場合は、子孫も対象にします
   * 
   * @param  {String}   tagNames
   * @param  {Boolean}  grand
   * @return {Function} hasNotCHild
   */
  hasNotChild: require('./rules/hasNotChild'),

  /**
   * 指定した属性をひとつでも持ってはいけない
   * @param  {String}   attrNames
   * @return {Function} hasNotSomeAttributes
   */
  hasNotSomeAttributes: require('./rules/hasNotSomeAttributes'),

  /**
   * 指定した属性のうちひとつは設定する
   * @param  {String}   orAttrs
   * @return {Function} hasSomeAttributes
   */
  hasSomeAttributes: require('./rules/hasSomeAttributes'),

  /**
   * 最初の要素である
   * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
   * @return {Function}  isFirstNode
   */
  isFirstNode: require('./rules/isFirstNode'),

  /**
   * 最後の要素である
   * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
   * @return {Function}  isLastNode
   */
  isLastNode: require('./rules/isLastNode'),

  /**
   * 次のノードは指定したタグ名の必要がある
   * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
   * 
   * TEXTを指定するとテキストノード、nullを指定すると最後の要素でもよい
   * 
   * @param  {String}   tagNames
   * @return {Function} nextNodeIs
   */
  nextNodeIs: require('./rules/nextNodeIs'),

  /**
   * 親要素にひとつしか設定してはいけない
   * @return {Function} onlyOne
   */
  onlyOne: require('./rules/onlyOne'),

  /**
   * 親は指定された要素である
   * grundをtrueに指定した場合は祖先もたどって調査します
   * @param  {String}   parents
   * @param  {Boolean}  grand
   * @return {Function} parentIs
   */
  parentIs: require('./rules/parentIs'),

  /**
   * 親は指定された要素ではない
   * grundをtrueに指定した場合は祖先をたどり調査します
   * @param  {String}   parents
   * @param  {Boolean}  grand
   * @return {Function} parentIsNot
   */
  parentIsNot: require('./rules/parentIsNot'),

  /**
   * 前のノードは指定したタグ名の必要がある
   * scriptSupportタイプ、コメントノード、ホワイトスペースは無視する
   * 
   * TEXTを指定するとテキストノード、nullを指定すると最初の要素でもよい
   * 
   * @param  {String}   tagNames 
   * @return {Function} prevNodeIs
   */
  prevNodeIs: require('./rules/prevNodeIs')

};

module.exports = rule;