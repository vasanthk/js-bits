/**
 * Styling using Vanilla JS
 *
 * @Reference:
 * http://javascript.info/tutorial/view-and-position
 * http://stackoverflow.com/a/21064102/1672655
 * https://developer.mozilla.org/en/docs/Web/API/Element/classList
 */

// className
document.body.className += ' class3';

// classList

var classList = document.body.classList,    // returns *live* DOMTokenList collection
    i;

classList.add('class1', 'class2');

if (classList.contains('class1') === true) {
    classList.remove('class1');
}

for (i = 0; i < classList.length; i++) {
    console.log(i, classList.item(i));
}

// style
document.body.style.backgroundColor = 'green';

// cssText
// style.cssText is the only way to add !important.
var div = document.body.children[0];
div.style.cssText = 'color: red !important; \
    background-color: yellow; \
    width: 100px; \
    text-align: center; \
    blabla: 5; \
  ';
// blabla is ignored
alert(div.style.cssText);

// Reading the style
// Note: The style gives access only to properties set through it, or with "style" attribute.
//  <style>
//    body { margin: 10px }
//  </style>
//  <body>
//  <script>
//    alert(document.body.style.marginTop)  // Will not return anything.
//  </script>
//  </body>

// getComputedStyle
// The syntax is: getComputedStyle(element, pseudo)
// element - The element to get a styling for
// pseudo - A pseudo-selector like ‘hover’ or null if not needed.
var computedStyle = getComputedStyle(document.body, null);
alert(computedStyle.marginTop);

// CSS Box Model

// clientWidth/Height
// Size of the client area: content area with paddings, but without scrollbars.

// scrollWidth/Height
// Content area width and height including the scrolled out part.
// scrollWidth/Height is same as clientWidth/Height, but includes full scrollable area.
element.style.height = element.scrollHeight + 'px';

// scrollTop/scrollLeft
// Size of scrolled out part: vertical and horizontal. The value is always in pixels.
// scrollLeft/scrollTop are writeable
// Unlike other properties, which are read-only, you can change scrollLeft/scrollTop, and the browser scrolls the element.
// In standards mode, the scroll of the document is in document.documentElement.
// The following code scrolls the document 10px down:
document.documentElement.scrollTop += 10;

//offsetWidth/Height
//Outer box width/height, full size with borders, but without margins.

//clientTop/Left
//The indent of client area from box outer corner. In other words, the width of top/left border in pixels.

//offsetParent, offsetLeft/Top
//Properties offsetLeft and offsetTop reflect a relative shift of an element from its offsetParent.
//The offsetParent is the parent element in the sense of layout. For example, if an element is positioned absolutely, the offsetParent is not it’s DOM parent, but a nearest positioned element (or BODY).
// We could use this to check if an elem is hidden:
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
// SUMMARY
// Link: http://javascript.info/files/tutorial/browser/dom/metricSummary.png
//
//clientWidth/clientHeight - width/height of the visible in-border area (can be called a client area. The client area includes padding and doesn’t include scrollbars.
//clientLeft/clientTop - left/top border width or, more generally, a shift of the client area from the top-left corner of the box.
//scrollWidth/scrollHeight - width/height of the scrollable in-border area. Includes padding. Doesn’t include scrollbars.
//scrollLeft/scrollTop - the width/height of the scrolled out part of the document, starting from the top-left corner.
//offsetWidth/offsetHeight - the “outer” width/height of the box as seen from outside, excluding margins.
//offsetParent - the nearest table-cell, body for static positioning or the nearest positioned element for other positioning types.
//offsetLeft/offsetTop - the position in pixels of top-left corner of the box related to it’s offsetParent.

// elem.getBoundingClientRect()
// It returns a rectangle which encloses the element. The rectangle is given as an object with properties top, left, right, bottom.
// Gotcha:
// The coordinates are given relative to `window`, not the document**. For example, if you scroll this page,
// so that the button goes to the window top, then its `top` coordinate becomes close to `0`, because it is given relative to window.
// To calculate coordinates relative to the document that, we need to take page scroll into account.
function showRect(elem) {
  var r = elem.getBoundingClientRect();
  alert("Top/Left: " + r.top + " / " + r.left);
  alert("Right/Bottom: " + r.right + " / " + r.bottom);
}

// Coordinate calculator
// The steps are:
//  1) Get the enclosing rectangle.
//  2) Calculate the page scroll. All browsers except IE<9 support `pageXOffset/pageYOffset`, and in IE when DOCTYPE is set, the scroll can be taken from documentElement(<html>), otherwise from `body` - so we take what we can.
//  3) The document (`html` or `body`) can be shifted from left-upper corner in IE. Get the shift.
//  4) Add scrolls to window-relative coordinates and subtract the shift of `html/body` to get coordinates in the whole document.
function getOffsetRect(elem) {
  // (1)
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docElem = document.documentElement;

  // (2)
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

  // (3)
  var clientTop = docElem.clientTop || body.clientTop || 0;
  var clientLeft = docElem.clientLeft || body.clientLeft || 0;

  // (4)
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {top: Math.round(top), left: Math.round(left)};
}
