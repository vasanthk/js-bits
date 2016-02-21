/**
 * Understanding arrays - Pass by reference vs Pass by value
 *
 * @Reference:
 * http://orizens.com/wp/topics/javascript-arrays-passing-by-reference-or-by-value/
 */

// Pass by reference
// By default - Arrays are passed to a function by reference
var a = [3, 'my new post', {345}];

function renderData(a) {
  a.push(4);
}

renderData(a);
alert(a);	// will output the new a - [3, 'my new post', {345}, 4]

// Pass by value
// This can be done by using the native array method – “slice()”
// The ‘slice’ method in this case will return a shallow copy of the array.
var a = [3, 'my new post', {345}];

function renderData(a) {
  a.push(4);
}

renderData(a.slice());
alert(a);	// will output the original a - [3, 'my new post', {345}]