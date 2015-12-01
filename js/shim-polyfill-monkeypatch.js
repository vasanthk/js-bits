/**
 * Shim vs Polyfill vs Monkey Patch
 *
 * Shim:
 * In english, shim means -- A thin strip of material used to align parts, make them fit -- which is exactly what it does in code as well.
 * A shim is a piece of code that intercepts the API calls and implements a different behavior.
 * The idea here is to normalize certain APIs across different environments.
 * So, if two browsers implement the same API differently, you could intercept the API calls in one of those browsers and make its behavior align with the other browser.
 * Or, if the browser has a bug in one of its APIs, you could again intercept calls to that API, and then circumvent the bug.
 * eg. https://github.com/es-shims/es5-shim
 *
 * Polyfill:
 * A polyfill is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively. Flattening the API landscape if you will.
 * Thus, a polyfill is a shim for a browser API. You typically check if a broswer supports an API and load a polyfill if it doesn't. That allows you to use the API in either case.
 *
 * Monkey Patching:
 * A good practise is to never modify the source of a library when using it on a given web app.  Doing so makes upgrades of the library a nightmare and general maintenance impossible.
 * So what do you do while you wait for the library creators to fix their bug?  You monkey patch.
 * So what is monkey patching?  It's the process of replacing methods with updated, "fixing" methods for the original.
 *
 * @Reference:
 * https://github.com/vasanthk/simple-polyfill-array-find-es6
 * https://remysharp.com/2010/10/08/what-is-a-polyfill
 * http://addyosmani.com/blog/writing-polyfills/
 * http://www.codeproject.com/Articles/369858/Writing-polyfills-in-Javascript
 * http://blog.respoke.io/post/111278536998/javascript-shim-vs-polyfill
 * https://davidwalsh.name/monkey-patching
 */

/**
 * SHIM
 * Shim layer for requestAnimationFrame with setTimeout fallback
 *
 * @Reference:
 * http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Usage:
// Instead of setInterval(render, 16)
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
// Place the rAF *before* the render() to assure as close to 60fps with the setTimeout fallback.
