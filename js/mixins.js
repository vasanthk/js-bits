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
 * https://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/
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

