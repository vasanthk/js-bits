/**
 * Modules
 *
 * AMD vs CommonJS vs ES6 Modules
 *
 * @Reference:
 * http://www.dynamicjavascript.com/amd-and-commonjs-modules-comparison/
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
 * eg. HTML tenmplates, CSS, Text, JS and Binary files
 *
 * Since AMD modules need to be able to fetch dependencies just-in-time, they need a callback wrapper around a module which produces slightly more overhead in your module definition.
 */

