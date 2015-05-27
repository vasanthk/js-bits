/**
 * Object.create()
 *
 * JavaScript provides multiple methods for creating new object instances.
 * To this day, the new operator appears to remain the most popular method,
 * even though it’s arguably the most problematic and least flexible approach.
 *
 * The Object.create method provides an improved alternative to the new operator,
 * with the following benefits:
 * - You can explicitly specify, at object creation time, the object that will be the prototype of the newly created object.
 * - You can create objects that have no prototype by specifying null as the prototype.
 *   This is something that can’t otherwise be done. This can be useful when using an object as a dictionary, for example.
 * - You can easily specify the properties of the newly created object,
 *   including their descriptors: configurable, enumerable, and writable.
 *
 *   Object.create() has been available in all browsers since IE9.
 *
 *   @Reference:
 *   http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 */

(function () {
  var x = Object.create(null, {prop: {value: 3, writable: false}});
  console.log(x.prop); // output 3
  x.prop = 5;
  console.log(x.prop); // still output 3, since writable is false
})();
