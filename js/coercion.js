/**
 * Coercion:
 * Converting a value from one type to another is often called "type casting," when done explicitly,
 * and "coercion" when done implicitly (forced by the rules of how a value is used)
 *
 * == vs ===
 * The identity (===) operator behaves identically to the equality (==) operator except no type conversion is done,
 * and the types must be the same to be considered equal.
 *
 * The == operator will compare for equality after doing any necessary type conversions.
 * The === operator will not do the conversion, so if two values are not the same type === will simply return false.
 * It's this case where === will be faster, and may return a different result than ==. In all other cases performance will be the same.
 *
 * Links:
 * http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
 * http://davidwalsh.name/fixing-coercion#isnt-coercion-already-dead
 */

// Coercion in JS
(function () {
  var x = 42;
  var y = x + "";     // implicit coercion!
  console.log(y);     // "42"

  var z = String(x);  // explicit coercion!
  console.log(z);     // "42"
})();

// Equality checks - Crazyyy Sh*t!!!
(function () {
  console.log('' == '0');           // false
  console.log(0 == '');             // true
  console.log(0 == '0');            // true

  console.log(false == 'false');    // false
  console.log(false == '0');        // true

  console.log(false == undefined);  // false
  console.log(false == null);       // false
  console.log(null == undefined);   // true

  console.log(' \t\r\n ' == 0);     // true
})();