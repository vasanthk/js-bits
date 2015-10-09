/**
 * Array push() and concat()
 *
 * Reference: http://gunnariauvinen.com/difference-between-concat-and-push-in-javascript/
 */

(function () {
  // Array.push() modifies the original array it's pushed to
  // The return value of the push operation is the length of the returned array.
  var testArr = [1, 2, 3];
  var res = testArr.push(4, 5, 6);

  console.log(res);  // 6
  console.log(testArr); // [1, 2, 3, 4, 5, 6]

  // Array.concat() returns a new array as the result. The original array is unchanged.
  // Gotcha: In the case of objects, instead of copying objects into the new array, the references are copied instead.
  var test = [1, 2, 3]; // [1, 2, 3]
  var example = [{test: 'test value'}, 'a', 'b', 4, 5];
  var concatExample = test.concat(example); // [1, 2, 3, { test: 'test value'}, 'a', 'b', 4, 5]

  // Modifying values
  example[0].test = 'a changed value';
  console.log(concatExample[3].test); // Object { test: "a changed value"}
  example[1] = 'dog';
  console.log(concatExample[4]); // 'a'
})();