var eq = require('assert').deepEqual;
var getLineColumn = require('../../lib/utils/getLineColumn');
var t;
var get;

t = 'foo';
get = getLineColumn(t);
eq(get(0), {line: 1, column: 1});
eq(get(1), {line: 1, column: 2});
eq(get(2), {line: 1, column: 3});
eq(get(3), {line: 1, column: 4});

t = '\n\n\n\n\n';
get = getLineColumn(t);
eq(get(0), {line: 1, column: 1});
eq(get(1), {line: 2, column: 1});
eq(get(2), {line: 3, column: 1});
eq(get(3), {line: 4, column: 1});

t = '';
get = getLineColumn(t);
eq(get(0), {line: 1, column: 1});
eq(get(1), {line: 1, column: 2});
eq(get(2), {line: 1, column: 3});
eq(get(3), {line: 1, column: 4});

t = '\n' +
  'foo\n' +
  '\n' +
  'bar\n' +
  '\n';
get = getLineColumn(t);
eq(get(0) , {line: 1, column: 1}); // \n
eq(get(1) , {line: 2, column: 1}); // f
eq(get(2) , {line: 2, column: 2}); // o
eq(get(3) , {line: 2, column: 3}); // o
eq(get(4) , {line: 2, column: 4}); // \n
eq(get(5) , {line: 3, column: 1}); // \n
eq(get(6) , {line: 4, column: 1}); // b
eq(get(7) , {line: 4, column: 2}); // a
eq(get(8) , {line: 4, column: 3}); // r
eq(get(9) , {line: 4, column: 4}); // \n
eq(get(10), {line: 5, column: 1}); // \n
eq(get(11), {line: 6, column: 1}); // undefined

t = '' +
  '01-4567890' + '02-4567890' + '03-4567890' + '04-4567890' + '05-4567890' +
  '06-4567890' + '07-4567890' + '08-4567890' + '09-4567890' + '10-4567890' +
  '11-4567890' + '12-4567890' + '13-4567890' + '14-4567890' + '15-4567890' +
  '16-4567890' + '17-4567890' + '18-4567890' + '19-4567890' + '20-4567890' +
  '21-4567890' + '22-4567890' + '23-4567890' + '24-4567890' + '25-4567890' +
  '26-4567890' + '27-4567890' + '28-4567890' + '29-4567890' + '30-4567890';
get = getLineColumn(t);
eq(get(0)  , {line: 1, column: 1});
eq(get(98) , {line: 1, column: 99});
eq(get(99) , {line: 1, column: 100});
eq(get(100), {line: 1, column: 101});
eq(get(101), {line: 1, column: 102});
eq(get(198), {line: 1, column: 199});
eq(get(199), {line: 1, column: 200});
eq(get(200), {line: 1, column: 201});
eq(get(201), {line: 1, column: 202});

t = '' +
  '01-456789\n' + '02-456789\n' + '03-456789\n' + '04-456789\n' + '05-456789\n' +
  '06-456789\n' + '07-456789\n' + '08-456789\n' + '09-456789\n' + '10-456789\n' +
  '11-456789\n' + '12-456789\n' + '13-456789\n' + '14-456789\n' + '15-456789\n' +
  '16-456789\n' + '17-456789\n' + '18-456789\n' + '19-456789\n' + '20-456789\n';
get = getLineColumn(t);
eq(get(0)   , {line: 1, column: 1});
eq(get(7)   , {line: 1, column: 8});
eq(get(9)   , {line: 1, column: 10});
eq(get(20)  , {line: 3, column: 1});
eq(get(95)  , {line:10, column: 6});
eq(get(99)  , {line:10, column: 10});
eq(get(100) , {line:11, column: 1});
eq(get(101) , {line:11, column: 2});
eq(get(105) , {line:11, column: 6});
eq(get(109) , {line:11, column: 10});
eq(get(199) , {line:20, column: 10});
eq(get(200) , {line:21, column: 1});
eq(get(201) , {line:21, column: 2});
eq(get(1000), {line:21, column: 801});



