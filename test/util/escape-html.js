var es = require('../../lib/utils/escapeHTML');
var eq = require('assert').equal;

eq(es(' '), ' ');
eq(es('<'), '&lt;');
eq(es('>'), '&gt;');
eq(es('"'), '&quot;');
eq(es('\''), '&apos;');
eq(es('&'), '&amp;');
eq(es('&&&&&'), '&amp;&amp;&amp;&amp;&amp;');