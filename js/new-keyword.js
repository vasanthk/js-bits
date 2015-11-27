/**
 * Examining the 'new' keyword and what it does
 *
 * new ConstructorFunction(arg1, arg2);
 *
 * It does 4 things:
 * 1. It creates a new object. The type of this object is simply object.
 * 2. It sets this new object's internal, inaccessible, [[prototype]] property to be the constructor function's external, accessible, prototype object (every function automatically has a prototype property).
 * 3. It executes the `ConstructorFunction`, using the newly created object whenever 'this' is mentioned.
 * 4. It returns the newly created object, unless the constructor function returns a non-primitive value. In this case, that non-primitive value will be returned.
 *
 * Once this is done, if an undefined property of the new object is requested, the script will check the object's [[prototype]] object for the property instead.
 * Functions, in addition to the hidden [[prototype]] property, also have a property called prototype, and it is this that you can access, and modify, to provide inherited properties and methods for the objects you make.
 *
 * @Reference:
 * http://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript
 */

ObjMaker = function() {
  this.a = 'first';
};
// ObjMaker is just a function, there's nothing special about it that makes it a constructor.


ObjMaker.prototype.b = 'second';
// Like all functions, ObjMaker has an accessible prototype property that we can alter.
// i just added a property 'b' to it. Like all objects, ObjMaker also has an inaccessible [[prototype]] property that we can't do anything with.


obj1 = new ObjMaker();
// 3 things just happened.
// A new, empty object was created called obj1. At first obj1 was the same as {}.
// The [[prototype]] property of obj1 was then set to the current object value of the ObjMaker.prototype
// Note: If ObjMaker.prototype is later assigned a new value, obj1's [[prototype]] will not change, but you can alter the propertues of ObjMaker.prototype to add to both the prototype and [[prototype]].
// The ObjMaker function was executed, with obj1 in place of `this`. So obj1.a was set to 'first'.


obj1.a;
// returns 'first'


obj1.b;
// obj1 doesn't have a property called 'b', so JavaScript checks its [[prototype]]. Its [[prototype]] is the same as ObjMaker.prototype
// ObjMaker.prototype has a property called 'b' with value 'second'
// returns 'second'

