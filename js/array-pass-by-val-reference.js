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
//   explain:
!function() {

	// object
	var obj = {"abc": 456};
	var arr = [obj].slice(); // [{"abc": 456}]
	obj.abc = 4567;
	console.log(arr, obj); // [{"abc": 4567}] {"abc": 4567}

	// array
	var oldarr = [456];
	var arr = [oldarr].slice(); // [[456]]
	oldarr[0] = 4567;
	console.log(arr, oldarr); // [[4567]] [4567]

}()

// - For strings and numbers, slice copies strings and numbers into the new array.
//   Changes to the string or number in one array does not affect the other array.
//   explain:
!function() {

	// string in array
	var oldarr = ['abc'];
	var arr = oldarr.slice(); // ['abc']
	oldarr[0] = 'abcd';
	console.log(arr, oldarr); // ['abc'] ['abcd']

	// number in array
	var oldarr = [123, 456, 789];
	var arr = oldarr.slice(0, 2); // [123, 456]
	oldarr[1] = 123456789;
	console.log(arr, oldarr); // [123, 456] [123, 123456789, 789]

}()

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