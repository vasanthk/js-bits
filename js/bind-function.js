/**
 * Function.prototype.bind()
 *
 * Polyfill implementation below
 *
 * @Reference:
 * https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
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
// Anywhere with callback functions - eg. Click handlers, setTimeout etc.
// With bind(), the `this` context is available when the callback fn is called later on.
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