/**
 * Objects: In Detail
 * An object is an unordered list of primitive data types (and sometimes reference data types) that is stored as a series of name-value pairs.
 * Each item in the list is called a property (functions are called methods).
 *
 * @Reference:
 * http://javascriptissexy.com/javascript-objects-in-detail/
 * https://css-tricks.com/understanding-javascript-constructors/
 * http://stackoverflow.com/a/14172862/1672655
 */

// Object Data Properties Have Attributes
// Each data property (object property that store data) has not only the name-value pair, but also 3 attributes (the three attributes are set to true by default):
//—  Configurable: If false, any attempts to delete the property or change its attributes (Writable, Configurable, or Enumerable) will fail.
//— Enumerable: If true, the property will be iterated over when a user does for (var prop in obj){} (or similar).
//— Writable: If false, the value of the property can not be changed.


// Constructor Pattern for Creating Objects
function Fruit (theColor, theSweetness, theFruitName, theNativeToLand) {

  this.color = theColor;
  this.sweetness = theSweetness;
  this.fruitName = theFruitName;
  this.nativeToLand = theNativeToLand;

  this.showName = function () {
    console.log("This is a " + this.fruitName);
  };

  this.nativeTo = function () {
    this.nativeToLand.forEach(function (eachCountry)  {
      console.log("Grown in:" + eachCountry);
    });
  };
}


// With this pattern in place, it is very easy to create all sorts of fruits. Thus:
var mangoFruit = new Fruit ("Yellow", 8, "Mango", ["South America", "Central America", "West Africa"]);
mangoFruit.showName(); // This is a Mango.​
mangoFruit.nativeTo();
// Grown in:South America​
// Grown in:Central America​
// Grown in:West Africa​

var pineappleFruit = new Fruit ("Brown", 5, "Pineapple", ["United States"]);
pineappleFruit.showName(); // This is a Pineapple.
// If you had to change the showName function, you only had to do it in one location.
// The pattern encapsulates all the functionalities and characteristics of all the fruits in by making just the single Fruit function with inheritance.


// An inherited property is defined on the object’s prototype property. For example:
someObject.prototype.firstName = 'rich';


// An own property is defined directly on the object itself, for example:
// Let’s create an object first:
var aMango = new Fruit ();
// Now we define the mangoSpice property directly on the aMango object.
// Because we define the mangoSpice property directly on the aMango object, it is an own property of aMango, not an inherited property.
aMango.mangoSpice = 'some value';



// Prototype Pattern for Creating Objects
function Fruit () {

}

Fruit.prototype.color = "Yellow";
Fruit.prototype.sweetness = 7;
Fruit.prototype.fruitName = "Generic Fruit";
Fruit.prototype.nativeToLand = "USA";

Fruit.prototype.showName = function () {
  console.log("This is a " + this.fruitName);
};

Fruit.prototype.nativeTo = function () {
  console.log("Grown in:" + this.nativeToLand);
};

// And this is how we call the Fruit() constructor in this prototype pattern:
var mangoFruit = new Fruit ();
mangoFruit.showName(); //​
mangoFruit.nativeTo();
// This is a Generic Fruit​
// Grown in:USA



// Accessing Inherited Properties
// Properties inherited from Object.prototype are not enumerable, so the for/in loop does not show them.
// However, inherited properties that are enumerable are revealed in the for/in loop iteration.
// For example:

var school = {schoolName:"MIT", schoolAccredited: true, schoolLocation:"Massachusetts"};
//Use of the for/in loop to access the properties in the school object​
for (var eachItem in school) {
  console.log(eachItem); // Prints schoolName, schoolAccredited, schoolLocation​
}

// Create a new HigherLearning function that the school object will inherit from.​
function HigherLearning () {
  this.educationLevel = "University";
}
/* SIDE NOTE:
 The educationLevel property is not actually inherited by objects that use the HigherLearning constructor;
 Instead, the educationLevel property is created as a new property on each object that uses the HigherLearning constructor.
 The reason the property is not inherited is because we use of the "this" keyword to define the property.
 */

// Implement inheritance with the HigherLearning constructor​
var school = new HigherLearning ();
school.schoolName = "MIT";
school.schoolAccredited = true;
school.schoolLocation = "Massachusetts";


//Use of the for/in loop to access the properties in the school object​
for (var eachItem in school) {
  console.log(eachItem); // Prints educationLevel, schoolName, schoolAccredited, and schoolLocation​
}



// Deleting Properties of an Object
// To delete a property from an object, you use the delete operator.
// You cannot delete properties that were inherited, nor can you delete properties with their attributes set to configurable.
// You must delete the inherited properties on the prototype object (where the properties were defined).
// Also, you cannot delete properties of the global object, which were declared with the var keyword.
// The delete operator returns true if the delete was successful.
// And surprisingly, it also returns true if the property to delete was nonexistent or the property could not be deleted (such as non-configurable or not owned by the object).

var christmasList = {mike:"Book", jason:"sweater" };
delete christmasList.mike; // deletes the mike property​

for (var people in christmasList) {
  console.log(people);
}
// Prints only jason​
// The mike property was deleted​

delete christmasList.toString; // returns true, but toString not deleted because it is an inherited method​

// Here we call the toString method and it works just fine—wasn’t deleted ​
christmasList.toString(); //"[object Object]"​

// You can delete a property of an instance if the property is an own property of that instance.
// For example, we can delete the educationLevel property from the school's object we created above because the educationLevel property is defined on the instance:
// we used the "this" keyword to define the property when we declare the HigherLearning function.
// We did not define the educationLevel property on the HigherLearning function's prototype.​

console.log(school.hasOwnProperty("educationLevel")); // true
// educationLevel is an own property on school, so we can delete it​
delete school.educationLevel; // true

// The educationLevel property was deleted from the school instance​
console.log(school.educationLevel); // undefined

// But the educationLevel property is still on the HigherLearning function​
var newSchool = new HigherLearning ();
console.log(newSchool.educationLevel); // University​

// If we had defined a property on the HigherLearning function's prototype, such as this educationLevel2 property:​
HigherLearning.prototype.educationLevel2 = "University 2";

// Then the educationLevel2 property on the instances of HigherLearning would not be own property. ​
// The educationLevel2 property is not an own property on the school instance​
console.log(school.hasOwnProperty("educationLevel2")); // false
console.log(school.educationLevel2); // University 2​

// Let's try to delete the inherited educationLevel2 property​
delete school.educationLevel2; // true (always returns true, as noted earlier)

// The inherited educationLevel2 property was not deleted​
console.log(school.educationLevel2); // University 2​


// Object.defineProperty Function
// The Object.defineProperty() can be used inside of a constructor to help perform all necessary property setup.

function Book(name) {
  Object.defineProperty(this, 'name', {
    get: function() {
      return 'Book: ' + name;
    },
    set: function(newName) {
      name = newName;
    },
    configurable: false
  });
}

var myBook = new Book('Single Page Web Applications');
console.log(myBook.name);    // Book: Single Page Web Applications

// we cannot delete the name property because "configurable" is set to false
delete myBook.name;
console.log(myBook.name);    // Book: Single Page Web Applications

// but we can change the value of the name property
myBook.name = "Testable JavaScript";
console.log(myBook.name);    // Book: Testable JavaScript
// In this code we used accessor properties inside the Object.defineProperty().
// Accessor properties don’t include any properties or methods, but they define a getter to call when the property is read, and a setter to call when the property is written to.
// A getter is expected to return a value, while a setter receives the value being assigned to the property as an argument.
// This constructor allows us to set or change the name property of instances, but we are not allowed to delete it