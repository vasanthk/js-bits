/**
 * Object Oriented Programming in JavaScript
 *
 * Inheritance
 * Refers to an object being able to inherit methods and properties from a parent object (a Class in other OOP languages, or a Function in JavaScript)
 *
 * Polymorphism
 * Objects can share the same interface — how they are accessed and used—while their underlying implementation of the interface may differ.
 *
 * Encapsulation
 * Refers to enclosing all the functionalities of an object within that object so that the object’s internal workings (its methods and properties) are hidden from the rest of the application.
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

// Overwriting the prototype object -- Wonder if this has any bad implications?
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


// Parasitic Combination Inheritance Pattern


