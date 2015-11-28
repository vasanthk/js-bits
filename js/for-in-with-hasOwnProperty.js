/**
 * for... in statement
 *
 * The for...in statement iterates over the enumerable properties of an object, in arbitrary order.
 *
 * Gotcha: When used with Arrays
 * Array indexes are just enumerable properties with integer names and are otherwise identical to general Object properties.
 * There is no guarantee that for...in will return the indexes in any particular order and it will return all enumerable properties, including those with non–integer names and those that are inherited.
 * Because the order of iteration is implementation-dependent, iterating over an array may not visit elements in a consistent order.
 * Therefore it is better to use a for loop with a numeric index (or Array.prototype.forEach() or the for...of loop) when iterating over arrays where the order of access is important.
 *
 */

// The following function takes as its argument an object. It then iterates over all the object's enumerable properties and returns a string of the property names and their values.
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"



// The following function illustrates the use of hasOwnProperty(): the inherited properties are not displayed.
var triangle = {a:1, b:2, c:3};

function ColoredTriangle() {
  this.color = "red";
}

ColoredTriangle.prototype = triangle;

var obj = new ColoredTriangle();

for (var prop in obj) {
  if( obj.hasOwnProperty( prop ) ) {
    console.log("obj." + prop + " = " + obj[prop]);
  }
}

// Output:
// "obj.color = red"