/**
 * Object.defineProperty()
 *
 * Enumerable:
 * I can access to all of them using a for..in loop. Also, enumerable property keys of an object are returned using Object.keys method.
 *
 * Writable:
 * I can modify their values, I can update a property just assigning a new value to it: ob.a = 1000;
 *
 * Configurable:
 * I can modify the behavior of the property, so I can make them non-enumerable, non-writable or even non-configurable
 * if I feel like doing so. Configurable properties are the only ones that can be removed using the delete operator.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * http://x-team.com/2015/02/es5-object-defineproperty-method/
 * http://arqex.com/967/javascript-properties-enumerable-writable-configurable
 */

var ob = {};
// Adding a property to ob using Object.defineProperty
Object.defineProperty(ob, 'c', {
  value: 3,
  enumerable: false,
  writable: false,
  configurable: false
});

console.log(ob.c); // => 3

Object.getOwnPropertyDescriptor(ob, 'c');
// => {value: 3, enumerable: false, writable: false, configurable: false}

// It is also possible to define the properties on object creation if you instantiate it using the method Object.create( prototype,
// properties ). It accepts an object with property descriptors as the second parameter, and it can be used as follows

var ob = Object.create(Object.prototype, {
  a: {writable: true, enumerable: true, value: 1},
  b: {enumerable: true, value: 2}
});
console.log(ob); // => {a:1, b:2}

var ob = Object.create(Object.prototype, {
  a: {writable: true, enumerable: true, value: 1},
  b: {enumerable: true, value: 2}
});
console.log(ob); // => {a:1, b:2}

// Our task is to create a Person constructor which takes two parameters: firstName and lastName.
// Our object will expose four attributes: firstName, lastName, fullName and species.
// The first three will react to changes, and the last one species will have a constant value of 'human'

// Object.defineProperty (> IE8)
var Person = function (first, last) {
  this.firstName = first;
  this.lastName = last;
};

Object.defineProperty(Person, 'species', {
  writable: false,
  value: 'human'
});

Object.defineProperty(Person, 'fullName', {
  get: function () {
    return this.firstName + ' ' + this.lastName;
  },
  set: function (value) {
    var splitString = value.trim().split(' ');

    if (splitString.length === 2) {
      this.firstName = splitString[0];
      this.lastName = splitString[1];
    }
  }
});

var woman = new Person('Kate', 'Khowalski');

console.log(woman.firstName); // 'Kate'
console.log(woman.lastName); // 'Khowalski'
console.log(woman.fullName); //'Kate Khowalski
console.log(woman.species); // human

/*
 * Change name
 */

woman.firstName = 'Yulia';
console.log(woman.firstName); // 'Yulia'
console.log(woman.lastName); // 'Khowalski'
console.log(woman.fullName); // 'Yulia Khowalski'
woman.species = 'fish';
console.log(woman.species); // human - No, you can't change this properity.

/*
 * Change fullName
 */

woman.fullName = 'Joana Stevens';
console.log(woman.firstName); //Joana
console.log(woman.lastName); //Stevens