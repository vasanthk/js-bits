/**
 * Getters and Setters
 *
 * @Reference
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 */

// Getters and Setters as explicit methods

(function () {
  function wrapValue(value) {
    return {
      getValue: function () {
        return value;
      },
      setValue: function (newValue) {
        value = newValue;
      }
    };
  }

  var x = wrapValue(5);
  console.log(x.getValue()); // output 5
  x.setValue(7);
  console.log(x.getValue()); // output 7
})();

// Using getters and setters.

(function () {
  function wrapValue(_value) {
    return {
      get value() {
        return _value;
      },
      set value(newValue) {
        _value = newValue;
      }
    };
  }

  var x = wrapValue(5);
  console.log(x.value); // output 5
  x.value = 7;
  console.log(x.value); // output 7
})();