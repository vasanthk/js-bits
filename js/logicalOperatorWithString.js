/**
 * Logical Operator with string, when true returns the string.
 */

(function () {
  var a = true;
  var b = 'Yes';
  var c = 'It\'s me';

  console.log(a && b);  // Prints 'Yes'
  console.log(a && b && c); // Prints 'It's me'
  console.log(a && b || c); // Prints 'Yes'
})();