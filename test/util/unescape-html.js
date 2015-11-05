var un = require('../../lib/utils/unescapeHTML');
var eq = require('assert').equal;

eq(un(' '), ' ');
eq(un('&lt;'), '<');
eq(un('&gt;'), '>');
eq(un('&quot;'), '"');
eq(un('&apos;'), '\'');
eq(un('&amp;'), '&');
eq(un('&amp;&amp;&amp;&amp;&amp;'), '&&&&&');