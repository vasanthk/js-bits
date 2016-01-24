/**
 * Object Oriented Programming in JavaScript
 *
 * Prototype-based programming is an OOP model that doesn't use classes, but rather it first accomplishes the behavior of any class and then reuses it (equivalent to inheritance in class-based languages)
 * by decorating (or expanding upon) existing prototype objects. (Also called classless, prototype-oriented, or instance-based programming.)
 *
 * Inheritance
 * Inheritance is a way to create a class as a specialized version of one or more classes (JavaScript only supports single inheritance).
 * The specialized class is commonly called the child, and the other class is commonly called the parent.
 * In JavaScript you do this by assigning an instance of the parent class to the child class, and then specializing it.
 * In modern browsers you can also use Object.create to implement inheritance.
 *
 * Polymorphism
 * Polymorphism is the presentation of one interface for multiple data types.
 * For example, integers, floats, and doubles are implicitly polymorphic: regardless of their different types, they can all be added, subtracted, multiplied, and so on.
 * In the case of OOP, by making the class responsible for its code as well as its own data, polymorphism can be achieved in that each class has its own function that (once called) behaves properly for any object.
 *
 * Encapsulation
 * Encapsulation is the packing of data and functions into one component (for example, a class) and then controlling access to that component to make a "blackbox" out of the object.
 * Because of this, a user of that class only needs to know its interface (that is, the data and functions exposed outside the class), not the hidden implementation.
 * This allows us to abstract or localize specific set of functionalities on objects.
 *
 * Why Encapsulation?
 * When you simply want to create an object just to store some data, and it is the only object of its kind, you can use an object literal and create your object.
 * This is quite common and you will use this simple pattern often.
 * However, whenever you want to create objects with similar functionalities (to use the same methods and properties),
 * you encapsulate the main functionalities in a Function and you use that Function’s constructor to create the objects. This is the essence of encapsulation.
 *
 * @Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
 * http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
 * http://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor
 * http://www.toptal.com/javascript/javascript-prototypes-scopes-and-performance-what-you-need-to-know
 */

/**
 * ENCAPSULATION
 */

// Combination Constructor/Prototype Pattern
function User (theName, theEmail) {
  this.name = theName;
  this.email = theEmail;
  this.quizScores = [];
  this.currentScore = 0;
}

// Overwriting the prototype object -- Not recommended because it breaks the prototype chain
// But, let's try it out for understanding purposes.
User.prototype = {
  // The one disadvantage of overwriting the prototype is that the constructor property no longer points to the prototype,
  // so we have to set it manually. Hence this line:
  constructor: User,
  saveScore:function (theScoreToAdd)  {
    this.quizScores.push(theScoreToAdd)
  },
  showNameAndScores:function ()  {
    var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
    return this.name + " Scores: " + scores;
  },
  changeEmail:function (newEmail)  {
    this.email = newEmail;
    return "New Email Saved: " + this.email;
  }
};

// A User ​
firstUser = new User("Richard", "Richard@examnple.com");
firstUser.changeEmail("RichardB@examnple.com");
firstUser.saveScore(15);
firstUser.saveScore(10);

firstUser.showNameAndScores(); //Richard Scores: 15,10​

// Another User​
secondUser = new User("Peter", "Peter@examnple.com");
secondUser.saveScore(18);
secondUser.showNameAndScores(); //Peter Scores: 18

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

// Sample usage
// We have a simple cars object​
var cars = {
  type:"sedan",
  wheels:4
};

// We want to inherit from the cars object, so we do:​
var toyota = Object.create (cars); // now toyota inherits the properties from cars​
console.log(toyota.type); // sedan


/**
 * Object Orient programming example
 */
// Define the Person constructor
var Person = function(firstName) {
  this.firstName = firstName;
};

// Add a couple of methods to Person.prototype
Person.prototype.walk = function(){
  console.log("I am walking!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
};

// Define the Student constructor
function Student(firstName, subject) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  Person.call(this, firstName);

  // Initialize our Student-specific properties
  this.subject = subject;
}

// Create a Student.prototype object that inherits from Person.prototype.
// Note: A common error here is to use "new Person()" to create the
// Student.prototype. That's incorrect for several reasons, not least
// that we don't have anything to give Person for the "firstName"
// argument. The correct place to call Person is above, where we call
// it from Student.
Student.prototype = Object.create(Person.prototype); // See note below

// Set the "constructor" property to refer to Student
Student.prototype.constructor = Student;

// Replace the "sayHello" method
Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying "
    + this.subject + ".");
};

// Add a "sayGoodBye" method
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

// Example usage:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// Check that instanceof works correctly
console.log(student1 instanceof Person);  // true
console.log(student1 instanceof Student); // true


