/**
 * Array push() and concat()
 * Performance: concat() is ~40% faster than push()
 *
 * Reference:
 * http://gunnariauvinen.com/difference-between-concat-and-push-in-javascript/
 * https://jsperf.com/array-prototype-push-apply-vs-concat/13
 *
 */

  // Array.push() modifies the original array it's pushed to
  // The return value of the push operation is the length of the returned array.
(function () {
  var testArr = [1, 2, 3];
  var res = testArr.push(4, 5, 6);

  console.log(res);  // 6
  console.log(testArr); // [1, 2, 3, 4, 5, 6]
})();


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

// Clever use of apply() to join 2 arrays
// Extending a single array with several new arrays using the push.apply method confers a huge performance advantage
// (~100x) over the simple concat call.
(function () {
  var a = [1, 2];
  var b = ['x', 'y'];

  // WE DONT WANT a.push(b) since it returns [1, 2, ['x', 'y']];
  a.push.apply(a, b);
  console.log(a); // [1, 2, 'x', 'y']
  // Alternative: a = a.concat(b);
})();