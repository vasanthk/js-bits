/**
 * Array push() and concat()
 * Performance: concat() is ~40% faster than push()
 *
 * Reference:
 * http://gunnariauvinen.com/difference-between-concat-and-push-in-javascript/
 * http://davidwalsh.name/combining-js-arrays
 *
 * Tip: push() adds elements to the end of the array. To add it to the beginning, use unshift()
 *
 * Perf comparison:
 * https://jsperf.com/array-prototype-push-apply-vs-concat/20
 */

// PUSHES ONE ARRAY INTO ANOTHER
// Array.push() modifies the original array it's pushed to
// The return value of the push operation is the length of the returned array.
(function () {
  var testArr = [1, 2, 3];
  var res = testArr.push(4, 5, 6);

  console.log(res);  // 6
  console.log(testArr); // [1, 2, 3, 4, 5, 6]
})();

// MERGES ARRAYS
// Array.concat() returns a new array as the result. The original array is unchanged.
// Gotcha: In the case of objects, instead of copying objects into the new array, the references are copied instead.
(function () {
  var test = [1, 2, 3]; // [1, 2, 3]
  var example = [{test: 'test value'}, 'a', 'b', 4, 5];
  var concatExample = test.concat(example); // [1, 2, 3, { test: 'test value'}, 'a', 'b', 4, 5]

  // Modifying values
  example[0].test = 'a changed value';
  console.log(concatExample[3].test); // Object { test: "a changed value"}
  example[1] = 'dog';
  console.log(concatExample[4]); // 'a'
})();

// MERGE ARRAY USING push()
// Clever use of apply() to join 2 arrays
(function () {
  var a = [1, 2];
  var b = ['x', 'y'];

  // WE DONT WANT a.push(b) since it returns [1, 2, ['x', 'y']];
  a.push.apply(a, b);
  console.log(a); // [1, 2, 'x', 'y']
  // Alternative: a = a.concat(b);
})();