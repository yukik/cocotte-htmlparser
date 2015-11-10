var eq = require('assert');
var is = require('../../lib/utils/isGlobalAttribute');

eq(is('id'));
eq(!is('colspan'));
eq(is('data-foo'));
eq(is('aria-foo'));