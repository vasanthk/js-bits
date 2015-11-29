/**
 * Currying
 * Currying refers to the process of transforming a function with multiple arity (# or args a fn accepts) into the same function with less arity.
 *
 * Briefly, currying is a way of constructing functions that allows partial application of a function’s arguments.
 * What this means is that you can pass all of the arguments a function is expecting and get the result,
 * or pass a subset of those arguments and get a function back that’s waiting for the rest of the arguments. It really is that simple.
 *
 * @Reference:
 * http://www.sitepoint.com/currying-in-functional-javascript/
 * https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe#.nhp2e7pcm
 * https://medium.com/@kevincennis/currying-in-javascript-c66080543528#.bnk4cy1m0
 *
 */

// Simple Greet function -- Non Curried
var greet = function (greeting, name) {
  console.log(greeting + ', ' + name);
};
greet('Hello', 'Vasa'); // 'Hello, Vasa'

// Curried version
var greetCurried = function (greeting) {
  return function (name) {
    console.log(greeting + ', ' + name);
  }
};

// This tiny adjustment to the way we wrote the function lets us create a new function for any type of greeting,
// and pass that new function the name of the person that we want to greet
var greetHello = greetCurried("Hello");
greetHello("Vasa"); //"Hello, Vasa"
greetHello("Vignesh"); //"Hello, Vignesh"

// We can also call the original curried function directly, just by passing each of the parameters
// in a separate set of parentheses, one right after the other:
greetCurried("Hi there")("Vasa"); //"Hi there, Vasa"


// Currying traditional functions -- SIMPLE VERSION
//
// The only problem with the currying approach is the syntax. As you build these curried functions up, you need to keep nesting returned functions,
// and call them with new functions that require multiple sets of parentheses, each containing its own isolated argument. It can get messy.
// To address that problem, one approach is to create a quick and dirty currying function that will take the name of an existing function that was written without all the nested returns.
// A currying function would need to pull out the list of arguments for that function, and use those to return a curried version of the original function:

function curryIt(uncurriedFn) {
  var parameters = Array.prototype.slice.call(arguments, 1);  // Omit 0th argument (which is the uncurriedFn and start from index 1)
  return function () {
    return uncurriedFn.apply(this, parameters.concat(
      Array.prototype.slice.call(arguments, 0)
    ));
  };
}

// Usage
var greeter = function (greeting, separator, emphasis, name) {
  console.log(greeting + separator + name + emphasis);
};
var greetHello = curryIt(greeter, "Hello", ", ", ".");
greetHello("Heidi"); //"Hello, Heidi."
greetHello("Eddie"); //"Hello, Eddie."


// curryIt --- BETTER VERSION
// Reference: https://medium.com/@kevincennis/currying-in-javascript-c66080543528#.bnk4cy1m0
function curryIt(fn) {
  var arity = fn.length;
  return (function resolver() {
    var memory = Array.prototype.slice.call(arguments);
    return function () {
      var local = memory.slice(), next;
      Array.prototype.push.apply(local, arguments);
      next = local.length >= arity ? fn : resolver;
      return next.apply(null, local);
    };
  }());
}