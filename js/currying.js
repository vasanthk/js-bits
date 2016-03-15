/**
 * Currying
 * Currying refers to the process of transforming a function with multiple arity (# or args a fn accepts) into the same function with less arity.
 *
 * Briefly, currying is a way of constructing functions that allows partial application of a function’s arguments.
 * What this means is that you can pass all of the arguments a function is expecting and get the result,
 * or pass a subset of those arguments and get a function back that’s waiting for the rest of the arguments. It really is that simple.
 *
 * Currying vs Partial Application
 * “Currying is the decomposition of a polyadic function into a chain of nested unary functions.
 * Thus decomposed, you can partially apply one or more arguments, although the curry operation itself does not apply any arguments to the function.”
 *
 * “Partial application is the conversion of a polyadic function into a function taking fewer arguments arguments by providing one or more arguments in advance.”
 *
 * @Reference:
 * http://www.sitepoint.com/currying-in-functional-javascript/
 * http://www.2ality.com/2011/09/currying-vs-part-eval.html
 * https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe#.nhp2e7pcm
 * https://medium.com/@kevincennis/currying-in-javascript-c66080543528#.bnk4cy1m0
 * http://raganwald.com/2013/03/07/currying-and-partial-application.html
 * http://ejohn.org/blog/partial-functions-in-javascript/
 * http://stackoverflow.com/questions/113780/javascript-curry-what-are-the-practical-applications
 * http://conceptf1.blogspot.com/2014/03/currying-in-javascript.html
 * https://www.youtube.com/watch?v=iZLP4qOwY8I
 * https://egghead.io/lessons/javascript-what-is-currying
 * https://hughfdjackson.com/javascript/why-curry-helps/
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

// Partial Application -- Few arguments passed initially + allowing more args to be passed later on.
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

// EXAMPLE
var l = 2, b = 3, h = 4;
var curriedVol = curryIt(vol);
var area = curriedVol(l)(b);
var volume = area(h);
console.log('Volume: ', volume);

function vol(l, b, h) {
  return l * b * h;
}

// My version -- It worked in the first run :)
function curryIt(fn) {
  var arity = fn.length;
  var params = [];
  return function handler() {
    var args = Array.prototype.slice.call(arguments);
    Array.prototype.push.apply(params, args); // OR params.push.apply(this, args);

    if (params.length === arity) {
      return fn.apply(this, params);
    } else {
      return handler;
    }
  }
}

// ES6 Example
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');

const f = a => b => c => a.addEventListener(b, (event) => {
  event.target.style.backgroundColor = c;
});

const oneEventColor = f(one);
const twoEventColor = f(two);

oneEventColor('mouseover')('blue');
twoEventColor('mouseout')('green');

// Currying challenge:
// https://github.com/frantic/friday/blob/master/currying.js
// http://blog.vjeux.com/2015/javascript/140byt-es-curried-add-function.html
function add() {
  var s = [].reduce.call(arguments, function (sum, curr) {
    return sum + curr;
  });
  var f = function () {
    return add.apply(0, [s].concat([].slice.call(arguments)))
  };
  f.valueOf = function () {
    return s
  };
  return f;
}