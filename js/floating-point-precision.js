/**
 * Numeric Type in JavaScript (Floating Point)
 *
 * @TLDR: There is only one numeric type, Number - a 64-bit floating point (Same as Java's double). Has weird rounding errors.
 *
 * @Info
 * - The crux of the problem is that numbers are represented in this format as a whole number times a power of two.
 *   rational numbers (such as 0.1, which is 1/10) whose denominator is not a power of two cannot be exactly represented.
 * - 0.1 cannot be represented as accurately in base-2 as in base-10 due to the missing prime factor of 5.
 *   Just as 1/3 takes an infinite number of digits to represent in decimal, but is "0.1" in base-3,
 *   0.1 takes an infinite number of digits in base-2 where it does not in base-10.
 * - For 0.1 in the standard binary64 format, the representation can be written exactly as
 *   0.1000000000000000055511151231257827021181583404541015625 in decimal
 * - In contrast, the rational number 0.1, which is 1/10, can be written exactly as 0.1 in decimal.
 *
 * @Note:
 * - The best suggestions I've seen to handle floating points is to use properly tested libraries like sinfuljs, mathjs or BigDecimal.js for handling them.
 * - Another oft-repeated advice is to use the built-in toPrecision() and toFixed() methods on numbers.
 *   A big warning to anyone thinking of using them -- those methods return strings.
 *
 * @Reference
 * http://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
 * http://stackoverflow.com/questions/588004/is-floating-point-math-broken
 *
 */

(function() {
    console.log(0.1 + 0.2);             // prints 0.30000000000000004
    console.log((0.1 + 0.2) === 0.3);    // prints false

    // Workaround: Format your result to some fixed number of significant digits, like this:
    // (Math.floor(y/x) * x).toFixed(2) OR parseFloat(a).toFixed(2)
})();