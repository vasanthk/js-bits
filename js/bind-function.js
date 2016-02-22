/**
 * Function.prototype.bind()
 *
 * Polyfill implementation below
 *
 * @Reference:
 * https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
 * http://stackoverflow.com/a/10115970/1672655
 * http://ejohn.org/apps/learn/#86
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