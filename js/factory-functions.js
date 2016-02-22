/**
 * Factory Functions
 *
 * @Reference:
 * https://www.youtube.com/watch?v=ImwrezYhw4w
 * http://atendesigngroup.com/blog/factory-functions-javascript
 *
 */

// ES6 classes vs Factory functions
// With classes -- Be wary
class Dog {
  constructor() {
    this.sound = 'woof';
  }

  talk() {
    console.log(this.sound);
  }
}

const sniffles = new Dog();
sniffles.talk();   // Outputs: 'woof'

// Here's the issue
$('button').click(sniffles.talk); // This will not work since - the `this` in talk() now refers to the DOM element selected by $(button) and not sniffles.

// Workaround -- explicit binding
$('button').click(sniffles.talk.bind(sniffles));

// Or in ES6 --  `this` inside an arrow function is always inherited from the enclosing scope.
$('button').click(() => sniffles.talk());



// Factory functions
const dog = () => {
  const sound = 'woof';
  return {
    talk: () => console.log(sound)  // We are not using `this` at all.
  };
};

const sniffles = dog();
sniffles.talk();  // Outputs: 'woof'

$('button').click(sniffles.talk); // Works -- Outputs: 'woof'



// Constructor functions vs Factory functions

// The basic difference is that a constructor function is used with the new keyword
// (which causes JavaScript to automatically create a new object, set `this` within the function to that object, and return the object):
var objFromConstructor = new ConstructorFunction();

// A factory function is called like a "regular" function:
var objFromFactory = factoryFunction();
// But for it to be considered a "factory" it would need to return a new instance of some object:
// you wouldn't call it a "factory" function if it just returned a boolean or something.
// This does not happen automatically like with new, but it does allow more flexibility for some cases.
// In a really simple example the functions referenced above might look something like this:

function ConstructorFunction() {
  this.someProp1 = "1";
  this.someProp2 = "2";
}
ConstructorFunction.prototype.someMethod = function() { /* whatever */ };

function factoryFunction() {
  var obj = {
    someProp1 : "1",
    someProp2 : "2",
    someMethod: function() { /* whatever */ }
    // someMethod() inside obj would lead to each object returned hold a different copy of someMethod which is something that we might not want.
    // This is where using `new` and `prototype` inside the factory function would help.
};
// other code to manipulate obj in some way here
return obj;
}


// Factory functions: Encapsulation using private properties
function Car () {
  // private variable
  var location = 'Denver';    // PRIVATE
  function year() {           // PRIVATE
    self.year = new Date().getFullYear();
  }

  var self = {
    make: 'Honda',
    model: 'Accord',
    color: '#cc0000',
    paint: function(color){
      self.color = color;
    }
  };

  if (!self.year){
    year();
  }

  return self;
}

var myCar = Car();



// Factory functions: Dynamic objects
// Since we can have public/private functions we can use if/else statements to easily manipulate our object structure.
// This gives ultimate flexibility to allow the root function ambiguity and allow parameters to determine what the object returned should be.
function Address (param) {
  var self = {};

  if (param === 'dev'){
    self = {
      state: 'Colorado',
      saveToLog: function(){
        // write info to a log file
      }
    };
  } else {
    self = {
      state: 'Colorado'
    };
  }

return self;
}

var devAddress = Address('dev');
var productionAddress = Address();