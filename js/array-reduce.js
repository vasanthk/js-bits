/**
 * Iterating over an array with reduce()
 *
 * Iterating over arrays using forEach is a nicer, more modern, and seemingly more functional approach than an old-fashioned for loop.
 * I say “seemingly” because any operation performed inside forEach can only return results via side-effects, or by modifying the original array.
 * However, a more functional approach is to use other iteration methods available for arrays, such as map and reduce.
 * These methods don’t require side-effects, and can treat the original array as immutable.
 *
 * Both reduce and map have the same browser support as forEach.
 *
 * When you hear people talking about "Map Reduce" they are just talking about a "pattern": Mapping over a collection and then reducing it.
 *
 * @Reference:
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 * http://danmartensen.svbtle.com/javascripts-map-reduce-and-filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 */

// Using forEach()

(function () {
  var ar = [1, 2, 3, 4, 5];
  var sum = 0;
  ar.forEach(function (v) {
    sum += v;
  });
  console.log(sum);
})();

// Using reduce()

(function () {
  var ar = [1, 2, 3, 4, 5];
  // Reduce does not have a variable sum in it's outer scope (like in forEach)
  console.log('sum:', ar.reduce(function (sum, v) {
    return sum + v;
  }, 0));
  // reduce() format: arr.reduce(callback()[, initialValue])
  // callback format: fn(previousValue, currentValue, index, array)
})();