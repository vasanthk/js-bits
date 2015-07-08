/**
 * Convert string values 'true'/'false' to boolean true/false.
 *
 */

(function () {
  // BASIC TECHIQUE

  // This will work only if the string values are only one of the either ('true'/'false')
  // Will return misleading results if the string value is different
  var a = 'true';
  var boolVal = (a === true); // Returns true

  // TRICK
  var b = 'true';
  var boolVal = JSON.parse(b); // Returns true.. throws an error if we use any other string other than 'true' or 'false'

})();