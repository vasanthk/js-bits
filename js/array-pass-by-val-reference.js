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
//
// Basically, the slice() operation clones the array and returns the reference to the new array. Also note that:
// - For object references (and not the actual object), slice copies object references into the new array.
//   Both the original and new array refer to the same object. If a referenced object changes, the changes are visible to both the new and original arrays.
// - For strings and numbers, slice copies strings and numbers into the new array.
//   Changes to the string or number in one array does not affect the other array.
//
var a = [3, 'my new post', {345}];

function renderData(a) {
  a.push(4);
}

renderData(a.slice());
alert(a);	// will output the original a - [3, 'my new post', {345}]

// If you did want to copy array's object references by value -- Use JSON.parse(JSON.stringify(array))
// Note: It does have a few caveats with copying functions/dates as values.
// For more info check: https://github.com/vasanthk/js-bits/blob/master/js/object-clone.js
var tempArray = JSON.parse(JSON.stringify(mainArray));