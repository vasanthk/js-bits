/**
 * Function.prototype.call & Function.prototype.apply
 *
 * Execute functions with a given context and arguments.
 *
 * @Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 * http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
 */

// What can we do with this function?
function logFullName(firstName, lastName) {
  console.log(firstName + lastName);
}

// Executing logFullName with apply takes the arguments as an Array
logFullName.apply(undefined, ['Jhon', 'Doe']) // Jhon Doe

// Executing logFullName with call takes individual arguments
logFullName.call(undefined, 'jhon', 'doe') // jhon doe

// The first parameter of call && apply is the context the function is going
// to be executed with
function logFullNameWithContext() {
  console.log(this.firstName, this.lastName);
}

var me = {
  firstName: 'Jhon',
  lastName: 'Doe',
  fullName: function() {
    logFullNameWithContext.call(this);
  }
};

me.fullName() // 'Jhon Doe'

// We can do crazy stuff like supporting
// both array and individual arguments in our functions
function sumAll() {
  if (!arguments.length) return;

  if (Array.isArray(arguments[0])) {
    // call sumAll with the array argument
    return sumAll.apply(this, arguments[0]);
  }

  // arguments is an array like objects, we call slice on it to get an Array
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  });
}

sumAll([1,2,3]) // 6
sumAll(1,2,3) // 6
sumAll.call(undefined, 1, 2, 3) // 6

// We can also expose functions that let the user choose the context
// of their callbacks
function requestSomething(cb, context) {
  var something = 'something!';

  // calling the function with the given context. If no context is
  // provided, context will be undefined so cb will never have access to the
  // requestSomething context
  cb.call(context, something);
}

requestSomething(function(something) {
  console.log(something);
  console.log(this);
}, { hello: 'World!'}); // this prints: something! Object


// One of most useful things we can do with apply and call is borrowing methods

Array.prototype.forEach.call('Jhon', function(char) {
  console.log(char);
}); // this prints each char individually

// Also, apply can help us with
// variadic functions (varying number of parameters)

// like finding the minimum of an array
Math.min.apply(undefined, [1,2,3,5]) // 1

// or concatenating two arrays
var a = [1,2,3,4];
a.concat.apply(a, [5,6,7,8]) // [1,2,3,4,5,6,7,8]
