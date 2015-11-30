/**
 * Bitwise operators in JavaScript
 *
 * @Reference:
 * http://michalbe.blogspot.com/2013/03/javascript-less-known-parts-bitwise.html
 * http://www.w3schools.com/jsref/jsref_operators.asp
 * http://stackoverflow.com/questions/654057/where-would-i-use-a-bitwise-operator-in-javascript
 */

// Various bitwise operators
var a = 5;
var b = 13;

// a | b - OR
// if in any of the given numbers corresponding bit is '1', then the result is '1'
console.log('or', a|b); // 13

// a & b - AND
// if in both of the given numbers corresponding bit is '1', then the result is '1'
console.log('and', a&b); // 5

// a ^ b - XOR
// if in one of the given numbers (not both) corresponding bit is '1', then the result is '1'
console.log('xor', a^b); // 8

// ~a - NOT
// inverts all the bits
console.log('not', ~a); // -6

// a >> b - RIGHT SHIFT
// shift binary representation of 'a' for 'b' bits to the right, discarding bits shifted off
console.log('rs', a>>b); // 0

// a << b - LEFT SHIFT
// shift binary representation of 'a' for 'b' bits to the right, shifting in zeros from the right
console.log('ls', a<<b); // 40960

// a >>> b - ZERO FILLED RIGHT SHIFT
// shift binary representation of 'a' for 'b' bits to the right, discarding bits shifted off,
// and shifting in zeros from the left.
console.log('zfrs', a>>>b); // 0


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

