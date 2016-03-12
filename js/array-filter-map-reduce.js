/**
 * Array filter(), map() and reduce()
 *
 * @Reference:
 * http://danmartensen.svbtle.com/javascripts-map-reduce-and-filter
 * http://elijahmanor.com/reducing-filter-and-map-down-to-reduce/
 * http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/
 *
 * Advanced:
 * Implementing filter, map, reduce internals in JS:
 * http://matthewodette.com/map-filter-and-fold-in-javascript/
 */

/** Normal for() loop
 *  for loops still definitely have a place when working with large arrays
 *  (e.g. over 1,000 elements) or needing to break the traversal if a condition is met.
 */
(function () {
  var array = [1, 2, 3, 4];
  var models = [];
  for (var i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) % 2 === 0) {
      models.push(array[i]);
    }
  }
})();

/** Array.map()
 *
 *  Use when:
 *  You want to translate/map all elements in an array to another set of values.
 *
 *  What it does:
 *  Traverses the array from left to right invoking a callback function on each element with parameters.
 *  For each callback the value returned becomes the element in the new array.
 *  After all the elements have been traversed the map() returns the new array with all the translated elements.
 *
 *  eg. Convert Farenheit into Celcius
 *
 *  Format:
 *  array.map(function(elem, index, array) {
 *    ...
 *  }, thisArg);
 *
 *  elem: element value
 *  index: index in each traversal, moving left to right
 *  array: original array invoking the method
 *  thisArg: (Optional) object that will be referred to as 'this' in the callback
 */

(function () {
  var farenheit = [0, 32, 45, 55, 67, 79, 94, 105];
  var celcius = farenheit.map(function (elem) {
    return Math.round((elem - 32) * 5 / 9);
  });

  console.log(celcius); // [-18, 0, 7, 13, 19, 26, 34, 41]
})();

/** Array.filter()
 *
 *  Use when:
 *  You want to remove unwanted elements based on a condition.
 *
 *  What it does:
 *  Like map() it traverses the array from left to right invoking a callback function on each element.
 *  The returned value must be a boolean identifying whether the element will be kept or discarded.
 *  After all the elements have been traversed filter() returns a new array with all elements that returned true.
 *  It has the same parameters as map().
 *
 *  eg. Remove duplicates from an array
 *
 *  Format:
 *  array.filter(function(elem, index, array) {
 *    ...
 *  }, thisArg);
 *
 *  elem: element value
 *  index: index in each traversal, moving left to right
 *  array: original array invoking the method
 *  thisArg: (optional) object that will be referred to as 'this' in the callback
 */

(function () {
  var arr = [1, 2, 3, 4, 5, 3, 7, 2];
  var uniqueArr = arr.filter(function (elem, i, arr) {
    return arr.indexOf(elem) === i;
  });

  console.log(uniqueArr);
})();

/** Array.reduce()
 *
 *  Use when:
 *  You want to find a cumulative or concatenated value based on elements across the array.
 *
 *  What it does:
 *  Like map() it traverses the array from left to right invoking a callback function on each element.
 *  The value returned is the cumulative value passed from callback to callback.
 *  After all elements have been traversed reduce() returns the cumulative value.
 *
 *  eg. Sum up countries orbital rocket launches in 2014.
 *
 *  Format:
 *  array.reduce(function(prevVal, elem, index, array) {
 *    ...
 *  }, initialValue);
 *
 *  prevVal: Cumulative value returned through each callback
 *  elem: element value
 *  index: index of traversal, moving left to right
 *  array: original array invoking the method
 *  initialValue: (Optional) object used as first argument in the first (leftmost) callback.
 *
 */
(function () {
  var rockets = [
    {country: 'Russia', launches: 32},
    {country: 'US', launches: 23},
    {country: 'China', launches: 16},
    {country: 'Europe(ESA)', launches: 7},
    {country: 'India', launches: 4},
    {country: 'Japan', launches: 3}
  ];

  var sum = rockets.reduce(function (prevVal, elem) {
    return prevVal + elem.launches;
  }, 0);

  console.log(sum);
})();
