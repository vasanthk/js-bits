/**
 * Array foreach()
 *
 * @Reference:
 * http://stackoverflow.com/questions/23614054/javascript-nuances-of-myarray-foreach-vs-for-loop
 * http://javascriptplayground.com/blog/2012/06/writing-javascript-polyfill/
 *
 */

// Polyfill for forEach()
Array.prototype.forEach = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function.');
  }
  var len = this.length;  // Array length
  for (var i = 0; i < len; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};