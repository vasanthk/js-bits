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

// In JavaScript, you can use a double bitwise negation (~~n) as a replacement for Math.floor(n) (if n is a positive number) or parseInt(n, 10) (even if n is negative). n|n and n&n always yield the same results as ~~n.
var n = Math.PI;
n; // 3.141592653589793
Math.floor(n); // 3
parseInt(n, 10); // 3
~~n; // 3
n|n; // 3
n&n; // 3

// ~~n works as a replacement for parseInt() with negative numbers…
~~(-n); // -3
(-n)|(-n); // -3
(-n)&(-n); // -3
parseInt(-n, 10); // -3
// …although it doesn’t replace Math.floor() for negative numbers
Math.floor(-n); // -4

