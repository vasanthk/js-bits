/**
 * Modules
 *
 * Why is modularity important?
 * - it encourages the development of small isolated modules with clear interfaces, as opposed to large chunks of monolithic code
 * - it helps with testability, as modules can be replaced at runtime with mocks that implement the same interface
 * - it improves code maintainability, as smaller and well isolated modules are easier to understand
 *
 * AMD vs CommonJS vs ES6 Modules
 *
 * @Reference:
 * http://stackoverflow.com/questions/21021621/difference-between-requirejs-and-commonjs
 * https://www.airpair.com/javascript/posts/the-mind-boggling-universe-of-javascript-modules
 * http://javascript.tutorialhorizon.com/2014/09/01/understanding-nodejs-module-exports-and-require/
 * http://www.2ality.com/2014/09/es6-modules-final.html
 *
 * Module Pattern:
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 */

/**
 * AMD - Asynchronous Module Definition
 *
 * Was specifically designed to suit the browser environment and are loaded asynchronously when they are needed in the application.
 * Once they are loaded they’ll be cached so they can be served directly if they’re needed again.
 * AMD modules work using native JavaScript, so they don’t require a build tool in order to work.
 * While in CommonJS you only have the option to export an object, in AMD you can export any JavaScript type.
 * This means you can for example export a constructor function or configuration array.
 * Next to loading modules, AMD is also capable to load other files on demand
 * eg. HTML templates, CSS, Text, JS and Binary files
 *
 * Since AMD modules need to be able to fetch dependencies just-in-time, they need a callback wrapper around a module
 * which produces slightly more overhead in your module definition.
 *
 * Multiple modules can be loaded in parallel.
 * Asynchronous loading is a complex subject and it can easily create race conditions if not properly designed.
 * It isn't possible to guarantee the order of execution of asynchronous modules.
 *
 * How To Use:
 * Your module will publicly expose whatever is being returned on the callback function.
 * In order to use your module, the client code needs to refer to it (per file location or alias) on its dependencies array,
 * which will map to an argument on its own callback function.
 *
 */

// foo.js
// Define a module called foo
define('foo', function () {
  return {
    method: function () {
      return 'food method result';
    }
  }
});

// bar.js
// Define a module called 'bar', which is dependent on the 'foo' module
define('bar', ['foo'], function (Foo) {
  return {
    barMethod: function () {
      return 'bar method result';
    },
    fooMethod: function () {
      return Foo.method();
    }
  };
});

// Require the bar module and use it within the require wrapper
require(['bar'], function (bar) {
  // Do something with fetched dependency
  bar.barMethod();
  bar.fooMethod();
});

/**
 * CommonJS
 *
 * CommonJS are designed from the ground up to suit the (NodeJS) server environment
 * Since CommonJS modules don’t have to fetch modules just-in-time, there is no need to put a wrapper with a callback structure around a module.
 * This makes a module look more clear and tidy. These modules are also called “naked” modules.
 *
 * CommonJS modules don’t work natively in the browser environment.
 * Instead, they rely on a build step, which evaluates the require calls, and alters the module code by parsing dependent modules.
 * CommonJS modules are always included directly and can’t be fetched just-in-time.
 *
 * It was adopted as the official module format for Node.js and NPM components.
 * This means that any module defined in CommonJS will have access to the whole NPM ecosystem.
 *
 * How To Use:
 * Your module file will publicly expose whatever is assigned to module.exports while everything else is private.
 * In order to use your module, the client code needs to use the require(dependency) function, referencing your module per file location or alias.
 *
 */

// foo.js
// Define a module called 'foo'
var foo = function () {
  return 'foo method result';
};

// expose foo to other modules
exports.method = foo;

// bar.js
// Define a module called 'bar', which is dependent on the 'foo' module.
var Foo = require('foo');
var barMethod = function () {
  return 'barMethod result';
};
var fooMethod = function () {
  return Foo.method();
};

exports.barMethod = barMethod;
exports.fooMethod = fooMethod;


// Require the bar module
var bar = require('bar');
// Do something with the fetched dependency
bar.barMethod();
bar.fooMethod();

/**
 * Hybrid
 *
 * Some AMD loaders also offer a hybrid format between AMD and CommonJS modules.
 * It scans the contents at runtime to determine what modules to preload, so even though it seems to be synchronous, it’s not.
 *
 */

define(function (require, exports, module) {
  var math = require('lib/math');
  exports.max = math.max;
  exports.add = math.add;
});


/**
 * ES6 Modules
 *
 * ES6 modules will support both synchronous and asynchronous loading within the same syntax.
 * And even better, they will work both on the browser and on the server.
 */

// EXPORTING
// exporter.js
export function someMethod() {
  // Do some stuff
}

export var another = {};

// IMPORTING
// importer.js
import { someMethod, another as newName } from './exporter';

someMethod();
// typeof newName == 'object';


// DEFAULT IMPORT AND EXPORT
// export-default.js
export default function foo() {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // -> 'foo'


// ALL SUPPORTED SYNTAX
import 'jquery';                        // import a module without any import bindings
import $ from 'jquery';                 // import the default export of a module
import { $ } from 'jquery';             // import a named export of a module
import { $ as jQuery } from 'jquery';   // import a named export to a different name

export var x = 42;                      // export a named variable
export function foo() {};               // export a named function

export default 42;                      // export the default export
export default function foo() {};       // export the default export as a function

var encrypt = {};
var decrypt = {};
export { encrypt };                     // export an existing variable
export { decrypt as dec };              // export a variable as a new name
export { encrypt as en } from 'crypto'; // export an export from another module
export * from 'crypto';                 // export all exports from another module

import * as crypto from 'crypto';    // import an entire module instance object

// Note that any valid declaration can be exported. In ES6, this includes class, const, and let.
