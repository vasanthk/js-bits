/**
 * Object Oriented Programming in JavaScript
 *
 * Prototype-based programming is an OOP model that doesn't use classes, but rather it first accomplishes the behavior of any class and then reuses it (equivalent to inheritance in class-based languages)
 * by decorating (or expanding upon) existing prototype objects. (Also called classless, prototype-oriented, or instance-based programming.)
 *
 * Inheritance
 * Refers to an object being able to inherit methods and properties from a parent object (a Class in other OOP languages, or a Function in JavaScript)
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


