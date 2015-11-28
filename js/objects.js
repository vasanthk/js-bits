/**
 * Objects: In Detail
 * An object is an unordered list of primitive data types (and sometimes reference data types) that is stored as a series of name-value pairs.
 * Each item in the list is called a property (functions are called methods).
 *
 * @Referenc:
 * http://javascriptissexy.com/javascript-objects-in-detail/
 */

//Object Data Properties Have Attributes
//Each data property (object property that store data) has not only the name-value pair, but also 3 attributes (the three attributes are set to true by default):
//—  Configurable Attribute: Specifies whether the property can be deleted or changed.
//— Enumerable: Specifies whether the property can be returned in a for/in loop.
//— Writable: Specifies whether the property can be changed.


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