/**
 * bind()
 *
 * Polyfill implementation below
 *
 * @Reference:
 * http://ejohn.org/apps/learn/#86
 */

Function.prototype.bind = function() {
  var fn = this;
  var args = Array.prototype.slice.call(arguments);
  var context = args.shift();

  return function() {
    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
};