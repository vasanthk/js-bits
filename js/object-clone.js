/**
 * Object copy by value (Clone)
 *
 * @Reference:
 * http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/
 * http://stackoverflow.com/a/728694/1672655
 */

(function () {
  var obj = {
    name: 'vasa',
    role: 'Ninja'
  };

  // A trick to clone an object (or copy by value)
  var clonedObj = JSON.parse(JSON.stringify(obj));

  // In ES6
  var clone = Object.assign({}, obj);

  // With jQuery
  // Shallow copy
  var copiedObjShallow = jQuery.extend({}, obj);
  // Deep copy
  var copiedObjDeep = jQuery.extend(true, {}, obj);

  // Object.assign() polyfill
  // http://stackoverflow.com/a/34283281/1672655

  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function (target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }
          nextSource = Object(nextSource);

          var keysArray = Object.keys(nextSource);
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      }
    });
  }
})();