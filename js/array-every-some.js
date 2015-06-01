/**
 * Array every() and some() (instead of forEach)
 *
 * Another limitation with forEach is that you can’t break out of the loop (and no, using exceptions doesn’t count).
 * As a result, I’ve seen developers either revert back to for loops when needing to be able to break out,
 * or needlessly iterate over extraneous array elements.
 *
 * A better solution exists in the form of the lesser known every() and some() array iteration methods.
 * every iterates until the provided callback returns false, and some iterates until the provided callback returns true.
 *
 * Both every and some have the same browser support as forEach.
 *
 * @Reference:
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 *
 */

// some() breaks once it returns true
(function () {
  // God of cricket
  var ar = ['Sachin', 'Lara', 'De Villiers'];
  ar.some(function (v) {
    if (v === 'Sachin') {
      return true;
    }
    console.log('Great cricketers: ' + v);
  });
})();

// every() breaks once it returns false
(function () {
  // Music Composers
  var ar = ['Hans Zimmer', 'Bill Clinton', 'Clint Mansell'];
  ar.every(function (v) {
    if (v === 'Bill Clinton') {
      return false;
    }
    console.log('Great Composers: ' + v);
  });
})();