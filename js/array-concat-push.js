/**
 * Array push() and concat()
 *
 * Reference: http://gunnariauvinen.com/difference-between-concat-and-push-in-javascript/
 */

(function() {
  // Array.concat()
  // New array is created on concat
  // For a couple of small arrays, this is fine. But for large arrays, or repeating this process regularly a lot of times,
  // or working in memory-limited environments, it leaves a lot to be desired.
  var a = [1, 2],
      b = ["x", "y"],
      c = [true, false];

  var d = a.concat(b, c);
  console.log(d); // [1, 2, "x", "y", true, false];

})();