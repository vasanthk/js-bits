/**
 * Event Delegation in Vanilla JS
 *
 * JSFiddle:
 * https://jsfiddle.net/vasanthkay/sokgevhr/7/
 *
 * @Reference:
 * Excellent Article:
 * http://codepen.io/32bitkid/post/understanding-delegated-javascript-events
 * https://www.ericponto.com/blog/2015/04/02/event-delegation-with-matches/
 */

//HTML CODE
//
//<ul class="toolbar">
//  <li>
//    <button class="btn"><i class="fa fa-pencil"></i> Pencil</button>
//  </li>
//  <li>
//    <button class="btn"><i class="fa fa-paint-brush"></i> Pen</button>
//  </li>
//  <li class="separator"></li>
//  <li>
//    <button class="btn"><i class="fa fa-eraser"></i> Eraser</button>
//  </li>
//</ul>


// HELPER FUNCTION
function delegate(criteria, listener) {
  return function (e) {
    var el = e.target;
    do {
      if (!criteria(el)) {
        continue;
      }
      e.delegateTarget = el;
      listener.call(this, e);
      return;
    } while ((el = el.parentNode));
  };
}

// Example of Event Delegation
// Custom filter to check for required DOM elements
var buttonsFilter = function (elem) {
  return (elem instanceof HTMLElement) && elem.matches(".btn");
  // OR
  // For < IE9
  // return elem.classList && elem.classList.contains('btn');
};

var buttonHandler = function (e) {
  var button = e.delegateTarget;
  var hasActiveClass = button.classList.contains('active');

  if (!hasActiveClass(button)) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
};

// Add the event listener
document.addEventListener("click", delegate(buttonsFilter, buttonHandler));


