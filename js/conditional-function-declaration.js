/**
 * Conditional Function declaration
 *
 * @TLDR: Invalid in JavaScript. So, avoid it!
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

// Case 1
(function() {
    if (false) {
        function test () {
            alert("Works");
        }
    }
    test(); // alerts "Works"... ohh boy!
    // Output is printed in most browsers due to hoisting of functions, although it is invalid in JavaScript
}());


// Case 2
(function() {
    if (false) {
        var test = function () {
            alert("Works");
        }
    }
    test(); // Error: 'undefined' is not a function
    // Error is thrown, because the variable is hoisted, but not the function assigned to it.
    // Warning - Named function expressions are still hoisted in < IE9 (IE bug/inconsistency).
}());