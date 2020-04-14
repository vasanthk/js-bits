/**
 * Getters and Setters
 *
 * Getters and setters have been available in Chrome since day one, in Firefox since version 2,
 * version 3 of Safari, Internet Explorer 9 and up, and in all mobile browsers.
 *
 * @Reference
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 * http://javascriptplayground.com/blog/2013/12/es5-getters-setters/
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

// Using getters and setters -- Conventional way
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

// Using getters and setters -- Using Object.defineProperty
// When you define a property this way, you can do much more than just define a setter or getter. You may also pass following keys:
// configurable (false by default): if this is true, the property's configuration will be modifiable in future.
// enumerable (false by default): if true, the property will appear when looping over the object (for (var key in obj)).
(function() {
  var person = {
    firstName: 'Jimmy',
    lastName: 'Smith'
  };

  Object.defineProperty(person, 'fullName', {
    get: function() {
      return this.firstName + ' ' + this.lastName;
    },
    set: function(name) {
      var words = name.split(' ');
      this.firstName = words[0] || '';
      this.lastName = words[1] || '';
    }
  });
})();
