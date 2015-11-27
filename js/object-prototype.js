/**
 * How does JavaScript .prototype work?
 *
 * Every JavaScript object has an internal property called [[Prototype]].
 * If you look up a property via obj.propName or obj['propName'] and the object does not have such a property - which can be checked via obj.hasOwnProperty('propName') - the runtime looks up the property in the object referenced by [[Prototype]] instead.
 * If the prototype-object also doesn't have such a property, its prototype is checked in turn, thus walking the original object's prototype-chain until a match is found or its end is reached with Object.prototype.
 *
 * Some JavaScript implementations allow direct access to the [[Prototype]] property, eg via a non-standard property named __proto__.
 * In general, it's only possible to set an object's prototype during object creation: If you create a new object via new Func(), the object's [[Prototype]] property will be set to the object referenced by Func.prototype.
 * This allows to simulate classes in JavaScript, although JavaScript's inheritance system is - as we have seen - prototypical, and not class-based:
 *
 * Just think of constructor functions as classes and the properties of the prototype (ie of the object referenced by the constructor function's prototype property) as shared members, ie members which are the same for each instance.
 * In class-based systems, methods are implemented the same way for each instance, so methods are normally added to the prototype, whereas an object's fields are instance-specific and therefore added to the object itself during construction.
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
 * @Reference:
 * http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work/23877420
 */

// There are two main ways to set obj.__proto__:

// 1. new:
var F = function() {};
var f = new F();

// then new has set:
f.__proto__ === F.prototype;

//This is where .prototype gets used.



// 2. Object.create:
var g = Object.create(proto);

// sets:
g.__proto__ === proto;