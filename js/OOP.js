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
 * http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
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