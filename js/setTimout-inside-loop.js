/**
 * setTimout() inside a for() loop.
 *
 * @TLDR: setTimout is executed after the loop is done, if the time it take to loop is less than the timout value.
 *  Also, it accesses the looping variable value only at the time of execution after the timout.
 *
 * @Info: Use an IIFE to lock the looping varaible within for each iteration of the loop inside a closure/
 *
 * @Reference: Best explanation out there on Event loops: https://www.youtube.com/watch?v=8aGhZQkoFbQ
 *
 */

(function () {

    // setTimout() inside a loop.
    for (var i = 1; i <= 3; i++) {
        setTimeout(function () {
            console.log(index);     // prints 3 3 3
        }, 1000);
    }

    // Locking the looped values inside a IIFE (closure).
    for (var i = 1; i <= 3; i++) {
        (function (index) {
            setTimeout(function () {
                console.log(index);     // prints 1 2 3
            }, 1000);
        })(i);
    }

    // Note: When the IIFE is inside the setTimout, it prints the corrct values.
    // However, the values are printed immediately and not after the timout value.
    // Essentially rendering the setTimout useless.
    for (var i = 1; i <= 3; i++) {
        setTimeout((function (index) {
            console.log(index);     // prints 1 2 3
        })(i), 1000);
    }

})();