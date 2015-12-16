/**
 * Event bubbling and capturing
 *
 * @Reference:
 * http://javascript.info/tutorial/bubbling-and-capturing
 * http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing
 *
 */

// Stopping event bubble
element.onclick = function (event) {
  event = event || window.event; // cross-browser event
  if (event.stopPropagation) {
    // W3C standard variant
    event.stopPropagation()
  } else {
    // IE variant
    event.cancelBubble = true
  }
};

// If the element has several handlers on same event, then handlers are independent. All of them get executed..
// For example, if there are two onclick handlers on the same link, then stopping bubbling in one of them has no effect on the other one.
// Also, the browser doesn’t guarantee the order in which they trigger.

// CAPTURING
// n all browsers, except IE<9, there are two stages of event processing.
// The event first goes down - that’s called capturing, and then bubbles up.
// This behavior is standardized in W3C specification.

// All methods of event handling ignore the caputiring phase. Using addEventListener with last argument true is only the way to catch the event at capturing.

// elem.addEventListener( type, handler, phase );
// phase = true
// The handler is set on the capturing phase.
// phase = false

