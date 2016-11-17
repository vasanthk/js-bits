/**
 * How does JavaScript .prototype work?
 *
 * Every JavaScript object has an internal property called [[Prototype]].
 * If you look up a property via obj.propName or obj['propName'] and the object does not have such a property -
 * which can be checked via obj.hasOwnProperty('propName') - the runtime looks up the property in the object referenced by [[Prototype]] instead.
 * If the prototype-object also doesn't have such a property, its prototype is checked in turn,
 * thus walking the original object's prototype-chain until a match is found or its end is reached with Object.prototype.
 *
 * Some JavaScript implementations allow direct access to the [[Prototype]] property, eg via a non-standard property named __proto__.
 * In general, it's only possible to set an object's prototype during object creation:
 * If you create a new object via new Func(), the object's [[Prototype]] property will be set to the object referenced by Func.prototype.
 * This allows to simulate classes in JavaScript, although JavaScript's inheritance system is - as we have seen - prototypical, and not class-based:
 *
 * Just think of constructor functions as classes and the properties of the prototype
 * (ie of the object referenced by the constructor function's prototype property) as shared members,
 * ie members which are the same for each instance.
 * In class-based systems, methods are implemented the same way for each instance,
 * so methods are normally added to the prototype, whereas an object's fields are instance-specific and therefore
 * added to the object itself during construction.
 *
 *  Two different things can be called "prototype":
 *    the prototype property, as in obj.prototype
 *    the prototype internal property, denoted as [[Prototype]] in ES5.
 *        - It can be retrieved via the ES5 Object.getPrototypeOf().
 *        - Firefox makes it accessible through the __proto__ property as an extension. ES6 now mentions some optional requirements for __proto__.
 *
 *        __proto__ is used for the dot . property lookup as in obj.property.
 *        .prototype is not used for lookup directly, only indirectly as it determines __proto__ at object creation with new.
 *
 *  Lookup order is:
 *      1. obj properties added with obj.p = ... or Object.defineProperty(obj, ...)
 *      2. properties of obj.__proto__
 *      3. properties of obj.__proto__.__proto__, and so on
 *      4. if some __proto__ is null, return undefined. (Note: At the topmost level Object.__proto__ is null)
 *
 *  This is the so-called prototype chain.
 *  You can avoid . lookup with obj.hasOwnProperty('key') and Object.getOwnPropertyNames(f)
 *
 *  Prototype is important in JavaScript because JavaScript does not have classical inheritance based on Classes (as most object oriented languages do),
 *  and therefore all inheritance in JavaScript is made possible through the prototype property. JavaScript has a prototype-based inheritance mechanism.
 *
 * Object.prototype Properties Inherited by all Objects
 * All objects in JavaScript inherit properties and methods from Object.prototype.
 * These inherited properties and methods are constructor, hasOwnProperty (), isPrototypeOf (), propertyIsEnumerable (), toLocaleString (), toString (), and valueOf ().
 * ECMAScript 5 also adds 4 accessor methods to Object.prototype.
 *
 * @Reference:
 * http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work/23877420
 * https://medium.com/@will_gottchalk/javascript-interview-questions-javascript-is-a-prototypal-language-what-do-i-mean-by-this-76937a9aa42a#.23dpi96xy
 * https://css-tricks.com/understanding-javascript-constructors/
 * http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/
 * http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/
 * https://davidwalsh.name/javascript-objects
 * http://stackoverflow.com/a/32740085/1672655
 * https://community.risingstack.com/javascript-prototype-chain-inheritance/
 */

// There are two main ways to set obj.__proto__:

// 1. new:
var F = function() {};
var f = new F();
// imagine:
// f.__proto__ = F.prototype;

// then new has set:
f.__proto__ === F.prototype;

//This is where .prototype gets used.



// 2. Object.create:
var g = Object.create(proto);
// imagine:
// g.__proto__ = proto

// sets:
g.__proto__ === proto;



// 1. prototype property
//
// Every JavaScript function has a prototype property (this property is empty by default),
// and you attach properties and methods on this prototype property when you want to implement inheritance.
// This prototype property is not enumerable; that is, it isn’t accessible in a for/in loop.
// The prototype property is used primarily for inheritance; you add methods and properties on a function’s prototype property
// to make those methods and properties available to instances of that function.
function PrintStuff (myDocuments) {
  this.documents = myDocuments;
}

// We add the print () method to PrintStuff prototype property so that other instances (objects) can inherit it:​
PrintStuff.prototype.print = function () {
  console.log(this.documents);
};

// Create a new object with the PrintStuff () constructor, thus allowing this new object to inherit PrintStuff's properties and methods.​
var newObj = new PrintStuff ("I am a new Object and I can print.");

// newObj inherited all the properties and methods, including the print method, from the PrintStuff function.
// Now newObj can call print directly, even though we never created a print () method on it.​
newObj.print (); //I am a new Object and I can print.



// 2. prototype attribute
//
// Think of the prototype attribute as a characteristic of the object; this characteristic tells us the object’s “parent”.
// In simple terms: An object’s prototype attribute points to the object’s “parent”—the object it inherited its properties from.
// The prototype attribute is normally referred to as the prototype object, and it is set automatically when you create a new object.
// Every object inherits properties from some other object, and it is this other object that is the object’s prototype attribute or “parent.”
// (You can think of the prototype attribute as the lineage or the parent).


// Prototype Attribute of Objects Created with new Object () or Object Literal

// The userAccount object inherits from Object and as such its prototype attribute is Object.prototype.​
var userAccount = new Object ();

// This demonstrates the use of an object literal to create the userAccount object; the userAccount object inherits from Object;
// therefore, its prototype attribute is Object.prototype just as the userAccount object does above.​
var userAccount = {name: 'Mike'};


// Prototype Attribute of Objects Created With a Constructor Function
function Account () {

}
var userAccount = new Account ();
// userAccount initialized with the Account () constructor and as such its prototype attribute (or prototype object) is Account.prototype.


// Prototype chain - Simulating multiple inheritance
// @Reference: http://markdalgleish.com/2012/10/a-touch-of-class-inheritance-in-javascript/

// Our 'actor' object has some properties...
var actor = {
  canAct: true,
  canSpeak: true
};

// 'silentActor' inherits from 'actor'
var silentActor = Object.create(actor);
silentActor.canSpeak = false;

// 'busterKeaton' inherits from 'silentActor'
var busterKeaton = Object.create(silentActor);

Object.getPrototypeOf(busterKeaton); // silentActor
Object.getPrototypeOf(silentActor); // actor
Object.getPrototypeOf(actor); // Object

// Modifying the chain

// The interesting thing is that the ‘actor’ and ‘silentActor’ objects are still live in the system and can be modified at runtime.
// So, for a contrived example, if all silent actors lost their jobs, we could do the following:
silentActor.isEmployed = false;

// So now...
busterKeaton.isEmployed; // false

// Setting up Multiple inheritance using the `new` keyword
// Set up Actor
function Actor() {}
Actor.prototype.canAct = true;

// Set up SilentActor to inherit from Actor:
function SilentActor() {}
SilentActor.prototype = Object.create(Actor.prototype);

// We can now add new properties to the SilentActor prototype:
SilentActor.prototype.canSpeak = false;

// So instances can act, but can't speak:
var charlie = new SilentActor();
charlie.canAct; // true
charlie.canSpeak; // false

