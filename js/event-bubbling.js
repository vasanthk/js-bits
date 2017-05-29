/**
 * Event bubbling and capturing
 *
 * @Reference:
 * http://javascript.info/tutorial/bubbling-and-capturing
 * https://www.sitepoint.com/event-bubbling-javascript/
 * http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing
 * http://javascript.info/tutorial/mouse-events
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
// In all browsers, except IE<9, there are two stages of event processing.
// The event first goes down - that’s called capturing, and then bubbles up.
// This behavior is standardized in W3C specification.

// All methods of event handling ignore the capturing phase.
// Using addEventListener with last argument true is only the way to catch the event at capturing.

// elem.addEventListener( type, handler, phase );
// phase = true
// The handler is set on the capturing phase.
// phase = false

// The default browser action

// 1) Event special method event.preventDefault() for W3C-compliant browsers and event.returnValue = false for IE<9.
// Or, in a single line:
event.preventDefault ? event.preventDefault() : (event.returnValue = false);

// 2) Return false from the handler
element.onclick = function (event) {
  return false;
};

// Note: Bubbling and default action
// Browser default action is independent from bubbling.
// Cancelling default action does not stop bubbling and vise versa.
// However, jQuery has it’s own event-handling layer. It wraps over the handler,
// and if the handler returns false, then both bubbling is stopped and the default action is prevented.

// Sample Events
document.getElementById('btn').onclick(alert('Works')); // Triggered by a mouse click: mousedown and then mouseup over an element
document.getElementById('btn').oncontextmenu(alert('Works')); // Triggered by a right-button mouse click over an element.
document.getElementById('btn').dblclick(alert('Works'));  // Triggered by two clicks within a short time over an element
