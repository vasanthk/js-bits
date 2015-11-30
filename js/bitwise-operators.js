/**
 * Bitwise operators in JavaScript
 *
 * @Reference:
 * http://www.w3schools.com/jsref/jsref_operators.asp
 * http://stackoverflow.com/questions/654057/where-would-i-use-a-bitwise-operator-in-javascript
 */

// Practical Use case of Bitwise operators in JavaScript
var hex = 'ffaadd';
var rgb = parseInt(hex, 16);    // value is 1675421

var red   = (rgb >> 16) & 0xFF; // returns 255
var green = (rgb >> 8) & 0xFF;  // 170
var blue  = rgb & 0xFF;         // 221



