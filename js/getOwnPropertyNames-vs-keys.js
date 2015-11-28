/**
 * What's the difference between Object.getOwnPropertyNames and Object.keys
 *
 * There is a little difference.
 * Object.getOwnPropertyNames(a) returns all own properties of the object a.
 * Object.keys(a) returns all enumerable own properties.
 *
 * It means that if you define your object properties without making some of them enumerable: false these two methods will give you the same result.
 */

var a = {};
Object.defineProperties(a, {
  one: {enumerable: true, value: 'one'},
  two: {enumerable: false, value: 'two'}
});
Object.keys(a); // ["one"]
Object.getOwnPropertyNames(a); // ["one", "two"]

// If you define a property without providing property attributes descriptor (meaning you don't use Object.defineProperties), for example:
a.test = 21;
// then such property becomes an enumerable automatically and both methods produce the same array.