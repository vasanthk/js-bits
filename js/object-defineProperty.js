/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * http://x-team.com/2015/02/es5-object-defineproperty-method/
 */

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