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
 *   Enumerable: I can access to all of them using a for..in loop. Also, enumerable property keys of an object are returned using Object.keys method.
 *   Writable: I can modify their values, I can update a property just assigning a new value to it: ob.a = 1000;
 *   Configurable: If set to false, the properties can't be removed using the delete operator. I can modify the behavior of the property, so I can make them non-enumerable, non-writable or even non-configurable if I feel like doing so.
 *
 *   Object.create() has been available in all browsers since IE9.
 *
 *   @Reference:
 *   http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 *   http://arqex.com/967/javascript-properties-enumerable-writable-configurable
 *   http://stackoverflow.com/questions/2709612/using-object-create-instead-of-new
 */

(function () {
// Object.create.
// When you first encounter this method, you might wonder why JavaScript needs another way to create objects, when it already has the object literal syntax and constructor functions?
// Where Object.create differs from those options is that lets you provide, as the first argument to the method, an object that will become the new object’s prototype.
// Remember that there is a difference between an object’s public prototype property and its internal [[Prototype]] property.
// When JavaScript is looking up properties on an object, it uses the latter, but traditionally the only standardised way to control it for a new object has been to use the pattern applied by __extends.
// You create a new function with a public prototype property, then apply the new operator on the function to create a new object.
// When the new operator is used with a function, the runtime sets the [[Prototype]] property of the new object to the object referenced by the public prototype property of the function.
// While this approach to controlling the [[Prototype]] works, it is a little opaque and wasteful, requiring the declaration of a new function simply for the purpose of controlling this internal property.
// With Object.create, the extra function is no longer required, as the [[Prototype]] can be controlled directly.
// A dead simple example would be.

  var animal = {legs: 4};
  var dog;

  dog = Object.create(animal);
  dog.legs == 4; // True
})();


(function () {
  var x = Object.create(null, {prop: {value: 3, writable: false}});
  console.log(x.prop); // output 3
  x.prop = 5;
  console.log(x.prop); // still output 3, since writable is false
})();


// Traditional constructor usage - `new` keyword.
(function () {
  var UserA = function (nameParam) {
    this.name = nameParam;
    this.studentYear = 'sophomore';
  };

  UserA.prototype.sayHello = function () {
    console.log('Hello ' + this.name);
  };

  var bob = new UserA('bob');
  bob.sayHello();
})();

// With Object.create()
// http://stackoverflow.com/a/2709811/1672655
(function () {
  var userB = {
    sayHello: function () {
      console.log('Hello ' + this.name);
    }
  };

  // Object.create() lets you initialize object properties using its second argument
  var bob = Object.create(userB, {
    'studentYear': {
      value: 'sophomore',
      enumerable: true // writable:false, configurable(deletable):false by default
    },
    'name': {
      value: 'Bob',
      enumerable: true
    }
  });
})();

/**
 * Simple Object.create() polyfill
 */
/**
 * Object.create()
 *
 * The crux of the matter with this Object.create method is that you pass into it an object that you want to inherit from,
 * and it returns a new object that inherits from the object you passed into it.
 */
Object.create = function (o) {
  //It creates a temporary constructor F()​
  function F() {
  }

  //And set the prototype of the this constructor to the parametric (passed-in) o object​
  //so that the F() constructor now inherits all the properties and methods of o​
  F.prototype = o;

  //Then it returns a new, empty object (an instance of F())​
  //Note that this instance of F inherits from the passed-in (parametric object) o object. ​
  //Or you can say it copied all of the o object's properties and methods​
  return new F();
};