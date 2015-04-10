/**
 * Conditional Function declaration
 *
 * @TLDR: Invalid in JavaScript
 *
 * @Info:
 * ECMA-262 spec: A Block is defined as one or more Statements, and a FunctionDeclaration is not a Statement.
 * Hence, function declarations inside an if/else conditional is invalid.
 *
 * @Note:
 * - Browsers deal with it in different ways. Few of them hoist the fn and few don't (thinks of it as a fn expression)
 * - In 'strict' mode this will throw an error.
 *
 * @Reference:
 * ECMA-262: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=98
 */

(function() {
    var temp = 1;

    if(temp) {
        // Function decalaration inside a conditional. Illegal in JS
        function a() {
            temp = 2;
            console.log(temp);
        }
    } else {
        function a() {
            temp = 3;
            console.log(temp);
        }
    }

    a(); // Output is printed in most browsers due to hoisting. But o/p differ between browsers.
}());