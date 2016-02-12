/**
 * The Object.freeze() method freezes an object: that is, prevents new properties from being added to it;
 * prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed.
 * In essence the object is made effectively immutable. The method returns the object being frozen.
 *
 * Gotcha:
 * If the frozen object has values that are objects, they can still be modified, unless they are frozen as well.
 * The freeze is SHALLOW.
 *
 * @Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * http://adripofjavascript.com/blog/drips/immutable-objects-with-object-freeze.html
 *
 */

var obj = {
  prop: function() {},
  foo: 'bar'
};

// New properties may be added, existing properties may be changed or removed
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// Freeze
Object.freeze(obj);

// Check if frozen
console.log(Object.isFrozen(obj) === true); // True

// Now any changes will fail (throw errors in strict mode).
obj.foo = 'quux'; // silently does nothing
obj.quaxxor = 'the friendly duck'; // silently doesn't add the property



/**
 * Freeze is shallow.
 * Let's make a deepFreeze() function
 */

obj1 = {
  internal: {}
};

Object.freeze(obj1);
obj1.internal.a = 'aValue';

console.log(obj1.internal.a); // aValue

// To make the object fully immutable, freeze each object in obj1
function deepFreeze(obj) {
  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function (name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop == 'object' && prop !== null && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  // Freeze self
  return Object.freeze(obj);
}

// Test deepFreeze
var obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
console.log(obj2.internal.a); // undefined
