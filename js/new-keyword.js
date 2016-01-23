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
 * The most difficult part about this is point number 2. Every object (including functions) has this internal property called [[prototype]].
 * It can only be set at object creation time, either with new, with Object.create, or based on the literal (functions default to Function.prototype, numbers to Number.prototype, etc.).
 * It can be read with Object.getPrototypeOf(someObject) or via __proto__ or this.constructor.prototype.
 *
 * @Reference:
 * http://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript
 * http://zeekat.nl/articles/constructors-considered-mildly-confusing.html
 * https://css-tricks.com/understanding-javascript-constructors/
 * https://john-dugan.com/object-oriented-javascript-pattern-comparison/
 */

// When we do this:
function Foo() {
  this.kind = 'foo';
}

var foo = new Foo();
foo.kind; //=> ‘foo’


// Behind the scenes it is like doing something like this:
function Foo() {
  // this is not valid, just for illustration
  var this = {};                  // Step 1
  this.__proto__ = Foo.prototype; // Step 2
  this.kind = 'foo';              // Step 3
  return this;                    // Step 4
}


// Example
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
// Note: If ObjMaker.prototype is later assigned a new value, obj1's [[prototype]] will not change,
// but you can alter the properties of ObjMaker.prototype to add to both the prototype and [[prototype]].
// The ObjMaker function was executed, with obj1 in place of `this`. So obj1.a was set to 'first'.


obj1.a;
// returns 'first'


obj1.b;
// obj1 doesn't have a property called 'b', so JavaScript checks its [[prototype]]. Its [[prototype]] is the same as ObjMaker.prototype
// ObjMaker.prototype has a property called 'b' with value 'second'
// returns 'second'



// It's like class inheritance because now, any objects you make using new ObjMaker() will also appear to have inherited the 'b' property.
// If you want something like a subclass, then you do this:
SubObjMaker = function () {};
SubObjMaker.prototype = new ObjMaker(); // note: this pattern is deprecated!
// Because we used 'new', the [[prototype]] property of SubObjMaker.prototype
// is now set to the object value of ObjMaker.prototype.
// The modern way to do this is with Object.create(), which was added in ECMAScript 5:
// SubObjMaker.prototype = Object.create(ObjMaker.prototype);

SubObjMaker.prototype.c = 'third';
obj2 = new SubObjMaker();
// [[prototype]] property of obj2 is now set to SubObjMaker.prototype
// Remember that the [[prototype]] property of SubObjMaker.prototype
// is ObjMaker.prototype. So now obj2 has a prototype chain!
// obj2 ---> SubObjMaker.prototype ---> ObjMaker.prototype

obj2.c;
// returns 'third', from SubObjMaker.prototype

obj2.b;
// returns 'second', from ObjMaker.prototype

obj2.a;
// returns 'first', from SubObjMaker.prototype, because SubObjMaker.prototype
// was created with the ObjMaker function, which assigned a for us


