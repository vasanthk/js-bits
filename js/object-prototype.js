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
 * @Reference:
 * http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work/23877420
 */