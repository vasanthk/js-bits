/**
 * DOM API
 *
 * The DOM represents a document as a tree. The tree is made up of parent-child relationships, a parent can have one or many children nodes.
 * The idea of DOM is that every node is an object. We can get a node and change its properties
 *
 * @Reference:
 * http://javascript.info/tutorial/dom
 * http://www.quirksmode.org/dom/
 * http://domenlightenment.com/
 */

// BASIC ELEMENT SELECTORS
document.getElementById("IDName"); // Selects the first element with the ID passed. It is invalid to use multiple IDs in HTML, however if duplicated, it selects the first one.
document.getElementsByClassName("ClassName"); // Selects the elements with the Class name passed. It returns an NodeList array.
document.getElementsByName("Name"); // Selects the elements with the Name passed, returns a NodeList array.
document.getElementsByTagName("TagName"); // Selects the elements with the passed Tag, returns a NodeList array.
document.querySelector("#IDName or .ClassName"); // Selects the first element that matched the selector value.
document.querySelectorAll("#IDName or .ClassName"); // Selects all the element that it finds with the passed name and type. It returns a NodeList array.

// ROOT ELEMENT
console.log(document.documentElement);

// In the world of DOM, an “element not found” or “no such element” is always null.
// It is impossible to reference elements that are not yet rendered at the time of script execution.
// For eg. if you access document.body in <head> -- it returns null, since the <body> is not yet loaded.

// CHILD ELEMENTS

// childNodes
// All child nodes are referenced including whitespace ones.
console.log(document.body.childNodes);

// children
// Sometimes we need to browse only element nodes, skipping text nodes. That’s what the children property is for.
// It contains all element nodes.
console.log(document.body.children);

// firstChild and lastChild - Similar to childNodes, it includes text nodes.
// For excluding text nodes, use firstElementChild and lastElementChild
console.log(document.body.firstElementChild);
console.log(document.body.lastElementChild);

// parentNode, previousSibling and nextSibling
// For excluding text nodes, use previousElementSibling and nextElementSibling
console.log(document.body.parentNode);
console.log(document.body.previousElementSibling);
console.log(document.body.nextElementSibling);

// STRUCTURE AND CONTENT PROPERTIES

// nodeType
// The most important ones are ELEMENT_NODE with number 1 and TEXT_NODE, which has number 3.
var childNodes = document.body.childNodes;
console.log(childNodes[0].nodeType != 1);

// nodeName, tagName
// Both nodeName and tagName contain the name of an element node.
// In HTML any nodeName is uppercased, no matter which case you use in the document.
// For element nodes, nodeName and tagName are the same.
// But nodeName property also exists on non-element nodes. eg. alert(document.nodeName) // #document
console.log(document.body.tagName); // BODY

// innerHTML
// It allows to access node contents in the text form. innerHTML works only for element nodes.
// Gotcha: `innerHTML` can't be appended
// Syntactically, is possible to append to innerHTML with elem.innerHTML += "New text", like below:
// But what actually is done:
// 1) Old content is wiped
// 2) The new value innerHTML is parsed and inserted.
document.body.innerHTML += "<div>Hi <img src='smile.gif'/> !</div>";
document.body.innerHTML += "How you doing?";

// nodeValue
// The innerHTML works only for element nodes. For other types of nodes, there is a nodeValue property, which keeps the content.
// eg. text nodes and comments
document.body.childNodes[i].nodeValue = 'Test';

// PROPERTIES

// DOM node is an object. So it can store custom properties and methods just like any JavaScript object.
// Custom DOM properties:
// 1) May have any value.Property names case-sensitive
// 2) Don’t affect HTML
// 3) Also, custom properties show up in for..in mixed with native properties:
document.body.sayHi = function () {
  alert(this.nodeName);
};
document.body.sayHi();  // BODY

document.body.custom = 5;
var list = [];
for (var key in document.body) {
  list.push(key);
}
alert(list.join('\n'));

// ATTRIBUTES

// DOM nodes provide access to HTML attributes using the following standard methods:
// elem.hasAttribute(name) - checks if the attribute exists
// elem.getAttribute(name) - gets an attribute value
// elem.setAttribute(name, value) - sets an attribute
// elem.removeAttribute(name) - removes an attribute
//
// In contrast with properties, attributes:
// 1) May be only strings.
// 2) Names not case-sensitive, because HTML attributes are not case-sensitive
// 3) They show up in innerHTML (unless it’s older IE)
// 4) You can list all attributes using an array-like attributes property of the element.
var div = document.body.children[0];
alert(div.getAttribute('ABOUT')); // case insensitive
div.setAttribute('Test', 123);
alert(document.body.innerHTML);

// PROPERTIES AND ATTRIBUTES SYNCHRONIZATION.

// Every type of DOM nodes has standard properties.
// Standard DOM properties are synchronized with attributes.

// id
document.body.setAttribute('id', 'la-la-la');
alert(document.body.id); // la-la-la

// href
var a = document.body.children[0];
a.href = '/';
alert('attribute:' + a.getAttribute('href')); // '/'
alert('property:' + a.href);  // IE: '/', others: full URL

// Gotcha: There are other attributes, which are synced, but not copied. For example input.checked:
// The value of input.checked property is either true or false, but the attribute has whatever you put into it.
var input = document.body.children[0];
alert(input.checked); // true
alert(input.getAttribute('checked')); // empty string

// value
// There are also built-in properties which are synced one-way only.
// For example, the input.value is synchronized from the attribute:
var input = document.body.children[0];
input.setAttribute('value', 'new');
alert(input.value); // 'new', input.value changed

// The "value" attribute keeps the original value after the property was updated,
// for example when a visitor typed in something. The original value can be used to check if the input is changed, or to reset it.
var input = document.body.children[0];
input.value = 'new';
alert(input.getAttribute('value')); // 'markup', not changed!

// class/className
// Because "class" is a reserved word in JavaScript, the name of the corresponding property for the "class" attribute is className.
// To avoid IE quirks, just always use className property to manage classes, not the attribute.
document.body.setAttribute('class', 'big red bloom');
alert(document.body.className);  // big red bloom

// To live well with any IE, use attributes correctly.
// Or, in other words, try using properties all the time, until you really need an attribute.
//
// And the only times you really need an attribute are:
// 1) To get a custom HTML attribute, because it is not synced to DOM property.
// 2) To get an “original value” of the standard HTML attribute, like <INPUT value="...">.

// Attributes as DOM nodes
// In attributes collection, every attribute is represented by a special kind of DOM node. It has name, value and other properties.
var span = document.body.children[0];
alert(span.attributes['style'].value);  // "color:blue;"
alert(span.attributes['id'].value);  // "my"

// MODIFYING THE DOCUMENT

// Creating elements
// 1) Creates a new DOM element of type node:
var div = document.createElement('div');
// 2) Creates a new DOM element of type text:
var textElem = document.createTextNode('Robin was here');
// Cloning
// An element can also be cloned:
textElem.cloneNode(true); //Clones an element deeply, with all descendants.
textElem.cloneNode(false); //Clones an element only, with attributes, but without children.

// Adding elements
// To do something with the element, you need to call the corresponding method of its parent:
document.body.appendChild(textElem); //Appends elem to the children of parentElem.

// parentElem.insertBefore(elem, nextSibling)
// Inserts elem into the children of parentElem before the element nextSibling.
// Link: http://stackoverflow.com/a/2007473/1672655
var div = document.body.children[0];
var span = document.createElement('span');
span.innerHTML = 'A new span!';
div.insertBefore(span, div.firstChild);
// Gotcha: insertBefore with second argument null works as appendChild.
elem.insertBefore(newElem, null); // same as
elem.appendChild(newElem);

// Removing nodes
// There are two main methods for removing nodes from DOM:
// parentElem.removeChild(elem) - Remove the elem from the children of parentElem.
// parentElem.replaceChild(elem, currentElem) - Replace the child element of parentElem, referenced by currentElem with the elem.

// Note: If you want to move an element, you don’t have to remove it first.
// elem.appendChild/insertBefore remove elem from it’s previous place automatically.
// The following example moves the last child to the top of children list:
var first = document.body.children[0];
var last = document.body.children[1];
document.body.insertBefore(last, first);
// The removal occurs automatically when insertion methods are called for a node which already has a parent.

// insertAfter custom function
var elem = document.createElement('div');
elem.innerHTML = '**Child**';
function insertAfter(elem, refElem) {
  return elem.parentNode.insertBefore(elem, refElem.nextSibling);
}
insertAfter(elem, document.body.firstChild);
insertAfter(elem, document.body.lastChild);

// Gotcha
// For an arbitrary document, we do the following:
var aList1 = document.getElementsByTagName('a');
var aList2 = document.querySelectorAll('a');
document.body.appendChild(document.createElement('a'));
alert(aList1.length - aList2.length);

// What will be the output? Why?
// Solution
// The output will be 1, because getElementsByTagName is a live collection, which gets auto populated with the new a. It’s length increases by 1.
// Contrary to this, querySelector returns a static list of nodes. It references same elements no matter what we do with the document. So, it’s length remains the same.

// TABLE
//<table>
//  <tr> <td>one</td>   <td>two</td>  </tr>
//  <tr> <td>three</td> <td>four</td> </tr>
//</table>

var table = document.body.children[0];
alert(table.rows[0].cells[0].innerHTML); // "one"

// FORMS

//Select option
//<form name="my">
//  <select name="genre">
//    <option name="blues" value="blues">Soft blues</option>
//    <option name="rock" value="rock">Hard rock</option>
//  </select>
//</form>
var form = document.forms.my;
var select = form.elements.genre;
var value = select.options[select.selectedIndex].value;
alert(value); // blues

// The SELECT also provides selectedIndex property which keeps the index of the selected option. Useful if the select is not multiple.
//<form name="temp">
//  <select name="genre">
//    <option name="blues" value="blues">Soft blues</option>
//    <option name="rock" value="rock">Hard rock</option>
//  </select>
//</form>

var form = document.forms.temp;
var select = form.elements.genre;
var value = select.options[select.selectedIndex].value;
alert(value); // blues
