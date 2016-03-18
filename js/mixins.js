/**
 * JavaScript Mixins - What are they?
 *
 * In general computer science, a mixin is a class that defines a set of functions relating to a type (e.g. Person, Circle, Observer).
 * Mixins classes are usually considered abstract in that they will not themselves be instantiated
 * – instead their functions are copied (or ‘borrowed’) by concrete classes as a means of ‘inheriting’ behaviour without entering into a formal relationship with the behaviour provider.
 *
 * OK but this is JavaScript, and we have no classes (atleast until ES5).
 * This is actually a good thing because it means we can use objects (instances) instead, which offer clarity and flexibility:
 * our mixin can be a regular object, a prototype, a function – whatever, and the mixin process becomes transparent and obvious.
 *
 * @Reference:
 * https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
 * https://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/
 * http://raganwald.com/2014/04/10/mixins-forwarding-delegation.html
 * http://bob.yexley.net/dry-javascript-with-mixins/
 * https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.osy5v7ih0
 * http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript
 */

// build a mixin function to take a target that receives the mixin,
// a source that is the mixin, and a list of methods / attributes to
// copy over to the target

function mixInto(target, source, methodNames) {

  // ignore the actual args list and build from arguments so we can
  // be sure to get all of the method names
  var args = Array.prototype.slice.apply(arguments);
  target = args.shift();
  source = args.shift();
  methodNames = args;

  var method;
  var length = methodNames.length;
  for (var i = 0; i < length; i++) {
    method = methodNames[i];

    // build a function with a closure around the source
    // and forward the method call to the source, passing
    // along the method parameters and setting the context
    target[method] = function () {
      var args = Array.prototype.slice(arguments);
      source[method].apply(source, args);
    }

  }

}

// make use of the mixin function
var myApp = new Marionette.Application();
mixInto(myApp, Marionette.EventBinder, "bindTo", "unbindFrom", "unbindAll");


/**
 * Mixin Design Pattern
 *
 * Link: http://jsfiddle.net/quFa9/21/
 */

// Detailed explanation of Mixin Design Pattern in JavaScript can be found here: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript

/* Car Class */
var Car = function (settings) {
  this.model = settings.model || 'no model provided';
  this.colour = settings.colour || 'no colour provided';
};

/* Mixin Class */
var Mixin = function () { };
Mixin.prototype = {
  driveForward: function () {
    console.log('drive forward');
  },
  driveBackward: function () {
    console.log('drive backward');
  }
};

/* Augment existing class with a method from another class */
function augment(receivingClass, givingClass) {
  /* only provide certain methods */
  if (arguments[2]) {
    var i, len = arguments.length;
    for (i = 2; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  /* provide all methods */
  else {
    var methodName;
    for (methodName in givingClass.prototype) {
      /* check to make sure the receiving class doesn't have a method of the same name as the one currently being processed */
      if (!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}

/* Augment the Car class to have the methods 'driveForward' and 'driveBackward' */
augment(Car, Mixin, 'driveForward', 'driveBackward');

/* Create a new Car */
var vehicle = new Car({model: 'Ford Escort', colour: 'blue'});

/* Test to make sure we now have access to the methods */
vehicle.driveForward();
vehicle.driveBackward();