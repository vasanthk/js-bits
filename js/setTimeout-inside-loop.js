/**
 * setTimeout() inside a for() loop.
 *
 * @TLDR: setTimeout is executed after the loop is done, if the time it take to loop is less than the timeout value.
 *  Also, it accesses the looping variable value only at the time of execution after the timout.
 *
 * @Info: Use an IIFE to lock the looping variable within for each iteration of the loop inside a closure/
 *
 * @Reference: Best explanation out there on Event loops: https://www.youtube.com/watch?v=8aGhZQkoFbQ
 *
 */

(function () {

  // setTimeout() inside a loop.
  for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log(i);     // prints 4 4 4
    }, 1000);
  }

  // Work all fine if we use `let` keyword in ES6
  for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log(i);     // prints 1 2 3
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

  // Note: When the IIFE is inside the setTimeout, it prints the correct values.
  // However, the values are printed immediately and not after the timout value.
  // Essentially rendering the setTimeout useless.
  // setTimeout() needs a fn as it's 1st parameter.
  for (var i = 1; i <= 3; i++) {
    setTimeout((function (index) {
      console.log(index);         // prints 1 2 3
    })(i), 1000);
  }

  // You can still use and IIFE inside setTimeout(), but you need to return a function as it's first parameter.
  for (var i = 1; i <= 3; i++) {
    setTimeout((function (index) {
      return function () {
        console.log(index);     // prints 1 2 3
      };  // IIFE needs to return a function that setTimeout can schedule.
    })(i), 1000);
  }

  // Note: Both setTimeout and setInterval accept and additional params that can be passed to the callback fn.
  // Thanks: https://twitter.com/WebReflection/status/701091345679708161
  for (var i = 0; i < 10; i++) {
    setTimeout(function (i) {
      console.log(i);
      // This will print 0 1 2 3 4 5 6 7 8 9
    }, 1000, i)
  }

  // Another way is to just create a separate function.
  for (var i = 0; i < 10; i++) {
    registerTimeout(i);
  }
  function registerTimeout (i) {
    setTimeout(function () {
      console.log(i);
      // This will print 0 1 2 3 4 5 6 7 8 9
    }, 1000);
  }
})();

//use call/bind method(1)
for(var i=0;i<5;i++){
    setTimeout(console.log.bind(null,i),1000);
}
//use call/bind method(2)
for(var i=0;i<5;i++){
//use bind/call to achieve this function, method(1)
for(var i=0;i<10;i++){
    setTimeout(console.log.bind(null,i),1000);
}
//use bind/call to achieve this function, method(2)
for(var i=0;i<10;i++){
    setTimeout(function(index){
      console.log(index);
    }.bind(null,i),1000);
}
//use call/bind method(3)
//use bind/call to achieve this function, method(3)
for(var i=0;i<10;i++){
    setTimeout(function(index){
      return function(){ 
        console.log(index); 
      }
    }.call(null,i),1000);
}
