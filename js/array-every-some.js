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
 * https://coderwall.com/p/_ggh2w/the-array-native-every-filter-map-some-foreach-methods
 *
 */

// some() breaks once it returns true
(function () {
  // God of cricket
  var ar = ['Lara', 'Sachin', 'De Villiers'];
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

// every() and some() in an example
(function () {
  function isBigEnough(element) {
    return element >= 10;
  }

  function isBigEnough2(element) {
    return element >= 1;
  }

  var passed = [2, 5, 8, 1, 4].some(isBigEnough);
  console.log('some: For [2, 5, 8, 1, 4] are the values larger or equal to 10 ? ' + passed);
  // some: For [2, 5, 8, 1, 4] are the values larger or equal to 10 ? false

  var passed = [12, 5, 8, 1, 4].some(isBigEnough);
  console.log('some: For [12, 5, 8, 1, 4] are the values larger or equal to 10 ? ' + passed);
  // some: For [12, 5, 8, 1, 4] are the values larger or equal to 10 ? true

  var passed = [12, 5, 8, 1, 4].every(isBigEnough);
  console.log('every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 10 ? ' + passed);
  // every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 10 ? false

  var passed = [12, 5, 8, 1, 4].every(isBigEnough2);
  console.log('every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 1 ? ' + passed);
  // every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 1 ? true

})();