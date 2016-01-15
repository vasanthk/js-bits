/**
 * Event Delegation in Vanilla JS
 *
 * JSFiddle:
 * https://jsfiddle.net/vasanthkay/sokgevhr/7/
 *
 * @Reference:
 * Excellent Article:
 * http://codepen.io/32bitkid/post/understanding-delegated-javascript-events
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
function delegate (criteria, listener) {
  return function (e) {
    var el = e.target;
    do {
      if (!criteria(el)) continue;
      e.delegateTarget = el;
      listener.apply(this, arguments);
      return;
    } while ((el = el.parentNode));
  };
}

// Example of Event Delegation
var buttonsFilter = function (elem) {
  return elem.matches('.btn');  // IE9+

  // For older browsers, we can use
  // elem.classList && elem.classList.contains('btn')
};
var buttonHandler = function (e) {
  var button = e.delegateTarget;
  var hasActiveClass = criteria.hasClass('active');

  if (!hasActiveClass(button)) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
};

// Add the event listener
document.addEventListener("click", delegate(buttonsFilter, buttonHandler));


