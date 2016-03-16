/**
 * Event Handling in Vanilla JS
 *
 * @Reference:
 * http://gomakethings.com/ditching-jquery/#event-listeners
 * http://www.quirksmode.org/dom/events/index.html
 * http://www.jstips.co/en/DOM-event-listening-made-easy/
 */


var elem = document.querySelector('.some-class');
elem.addEventListener('click', function (e) {
  // Do stuff
}, false);  // the final param, `useCapture` indicates that the user wishes to initiate capture.

// Passing multiple variables to event handlers
var elem = document.querySelector('.some-class');
var someFunction = function (var1, var2, var3, event) {
  // do stuff
};
elem.addEventListener('click', someFunction.bind(null, var1, var2, var3), false);
elem.addEventListener('mouseover', someFunction.bind(null, var1, var2, var3), false);

// Delegate events to the document.
var eventHandler = function () {
  // Get clicked element
  var toggle = event.target;

  // If clicked element is the one you're looking for, run your methods
  if (toggle.hasAttribute('data-example') || toggle.classList.contains('sample-class')) {
    event.preventDefault(); // Prevent default click event
    someMethod();
  }
};

document.addEventListener('click', eventHandler, false);

// Better delegate function
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

// Handle click function - ES6
function handleEvent(eventName, {onElement, withCallback, useCapture = false} = {}, thisArg) {
  const element = onElement || document.documentElement;

  function handler(event) {
    if (typeof withCallback === 'function') {
      withCallback.call(thisArg, event)
    }
  }

  handler.destroy = function () {
    return element.removeEventListener(eventName, handler, useCapture)
  };

  element.addEventListener(eventName, handler, useCapture);
  return handler;
}

// Anytime you need
const handleClick = handleEvent('click', {
  onElement: element,
  withCallback: (event) => {
    console.log('Tada!')
  }
});

// And anytime you want to remove it
handleClick.destroy();