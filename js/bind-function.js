/**
 * Function.prototype.bind()
 *
 * The bind function actually returns a new function, with the `this` value of the new function set to what you provide as the argument.
 *
 * Polyfill implementation below (for < IE9)
 *
 * @Reference:
 * https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
 * http://stackoverflow.com/a/10115970/1672655
 * http://ejohn.org/apps/learn/#86
 *
 * Complex Scenario with promises:
 * http://adgllorente.com/2016/03/to-bind-or-not-to-bind/
 */

// Polyfill for bind()
Function.prototype.bind = function () {
  var fn = this;
  var args = Array.prototype.slice.call(arguments);
  var context = args.shift();

  return function () {
    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
};

// What Problem Are We Actually Looking To Solve?
var myObj = {
  specialFunction: function () {
  },
  anotherSpecialFunction: function () {
  },
  getAsyncData: function (cb) {
    cb();
  },
  render: function () {
    var that = this;
    this.getAsyncData(function () {
      that.specialFunction();
      that.anotherSpecialFunction();
    });
  }
};

myObj.render();
// If we had left our function calls as this.specialFunction(), then we would have received the following error:
// Uncaught TypeError: Object [object global] has no method 'specialFunction'


// Solving it with bind()
// We need to keep the context of the myObj object referenced for when the callback function is called.
// Calling that.specialFunction() enables us to maintain that context and correctly execute our function.
// However, this could be neatened somewhat by using Function.prototype.bind().
// Let’s rewrite our example:
var myObj = {
  specialFunction: function () {
  },
  anotherSpecialFunction: function () {
  },
  getAsyncData: function (cb) {
    cb();
  },
  render: function () {
    this.getAsyncData(function () {
      this.specialFunction();
      this.anotherSpecialFunction();
    }.bind(this));
  }
};

// Note:
// One important thing to remember is that if you use bind on a prototype method, it creates an instance-level method,
// which bypasses the advantages of having methods on the prototype. It’s not wrong, just something to be aware of.

// Use Cases
//
// 1) Anywhere with callback functions - eg. Click handlers, setTimeout etc.
// With bind(), the `this` context is available when the callback fn is called later on.
var Button = function (content) {
  this.content = content;
};

Button.prototype.click = function () {
  console.log(this.content + ' clicked');
};

var myButton = new Button('OK');
myButton.click();

var looseClick = myButton.click;
looseClick(); // not bound, 'this' is not myButton - it is the global object

var boundClick = myButton.click.bind(myButton);
boundClick(); // bound, 'this' is myButton
// Which prints out:
// OK clicked
// undefined clicked
// OK clicked


// One use is to track clicks (or to perform an action after a click) that might require us to store information in an object, like so:
var logger = {
  x: 0,
  updateCount: function () {
    this.x++;
    console.log(this.x);
  }
};

document.querySelector('button').addEventListener('click', function () {
  logger.updateCount();
});

// Use Cases
//
// 2) For Partial Application
// You can also add extra parameters after the 1st parameter and bind will pass in those values to the original function
// before passing in the extra parameters you pass to the bound function:

// Example showing binding some parameters
var sum = function (a, b) {
  return a + b;
};

var add5 = sum.bind(null, 5);
console.log(add5(10));  // 15


// Comparative study of these three methods 
// bind() vs call() vs apply()

// what is bind ?
// The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
// what is call ? 
// The call() method calls a function with a given this value and arguments provided individually.
// what is apply ?
// The apply() method calls a function with a given this value and arguments provided as an array (or an array-like object).
// 
// first , We usually compare call with apply at the same time , why ?
// Syntax( call ):
// fun.call(thisArg[, arg1[, arg2[, ...]]])
// Syntax( apply ):
// fun.apply(thisArg, [argsArray])
// 
// =============
// 
// same point: this.Arg , if the method is a function in non-strict mode code, null and undefined will be replaced with the global object, and primitive values will be boxed.
// difference: other args. call use many arg for the object , apply() use an array or an array-like
// call eg:
// Area of a circle
var π = 3.14;
var s = function(r) {
  return this.π*r*r;
}

function pi() {
  this.π = Math.PI;
  return this;
}
s(1); // 3.14
s.call(pi(), 1); // 3.141592653589793…

// Sometimes we use it like this
function toArray() {
  return [].slice.call(arguments);
}
toArray(1, 2, 3);

// apply eg:
// This method is learned in lodash.
!function() {
  function apply(fun, thisArg, args) {
    var length = args.length;
    switch() {
      case 0: return fun.call(thisArg);
      case 1: return fun.call(thisArg, args[0]);
      case 2: return fun.call(thisArg, args[0], args[1]);
      case 3: return fun.call(thisArg, args[0], args[1], args[2]);
    }
    return fun.apply(thisArg, args);
  }
}()

// second, The previous use of bind is in the jquery
// $(document).bind('click', function() {
//    console.log(document.title);
// })
// 

// but this bind is Function.prototype.bind();
// Partial Functions (分离函数)
!function() {
  function list() {
    return Array.prototype.slice.call(arguments);
  }

  var list1 = list(1, 2, 3); // [1, 2, 3]

  // Create a function with a preset leading argument
  var leadingThirtysevenList = list.bind(undefined, 37);

  var list2 = leadingThirtysevenList(); // [37]
  var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
}

// @Reference
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind