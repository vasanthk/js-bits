/**
 * Iterating through Object properties
 *
 * Use Object.keys()
 *
 * Iterating over object properties is such a common occurrence in JavaScript that there is a dedicated statement for it:
 * for…in. Yet, as is shown in Crockford’s book, for…in is a problematic construct that usually requires a hasOwnProperty
 * conditional to weed out undesired properties.
 * A better, cleaner solution is to use Object.keys to generate an array of a given object’s own enumerable properties,
 * and then iterate over that array.
 *
 * This approach also allows you to sort or otherwise modify the array of property names before iterating over it.
 * Object.keys has been available in browsers since IE9.
 *
 * @Reference
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 */


// With for..in
(function () {
  var x = {hello: 1, there: 2, world: 3};
  for (var key in x) {
    if (x.hasOwnProperty(key)) {
      console.log(key, x[key]);
    }
  }
  // Output three lines: hello 1, there 2, world 3
})();

// With Object.keys()
(function () {
  var x = {hello: 1, there: 2, world: 3};
  Object.keys(x).forEach((function (key) {
    console.log(key, x[key]);
  }));
  // Output three lines: hello 1, there 2, world 3
})();