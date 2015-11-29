/**
 * Currying
 * Briefly, currying is a way of constructing functions that allows partial application of a function’s arguments.
 * What this means is that you can pass all of the arguments a function is expecting and get the result,
 * or pass a subset of those arguments and get a function back that’s waiting for the rest of the arguments. It really is that simple.
 *
 * @Reference:
 * http://www.sitepoint.com/currying-in-functional-javascript/
 *
 */

// Simple Greet function -- Non Curried
var greet = function(greeting, name) {
  console.log(greeting + ', ' + name);
};
greet('Hello', 'Vasa'); // 'Hello, Vasa'

// Curried version
var greetCurried = function(greeting) {
  return function(name) {
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
