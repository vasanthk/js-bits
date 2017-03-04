/**
 * The elusive `this` keyword in JS
 *
 * @Reference:
 * http://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work
 * http://stackoverflow.com/a/33979892/1672655
 * http://stackoverflow.com/a/17514482/1672655
 * https://dev.to/rachelralston/the-this-keyword-in-javascript
 * http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/
 * http://www.sitepoint.com/mastering-javascripts-this-keyword/
 * http://www.quirksmode.org/js/this.html
 * https://javascriptweblog.wordpress.com/2010/08/30/understanding-javascripts-this/
 * https://www.codementor.io/javascript/tutorial/understanding--this--in-javascript
 *
 * Avoiding `this` keyword
 * https://luizfar.wordpress.com/2012/04/28/dont-use-this-in-javascript/
 * http://stackoverflow.com/questions/31891931/why-does-jslint-forbid-the-this-keyword
 * http://stackoverflow.com/questions/28525393/how-can-i-get-rid-of-the-this-keyword-in-local-functions
 * http://stackoverflow.com/questions/30125464/how-to-avoid-the-this-and-new-keywords-in-javascript
 * 
 */

// 1. Global this
console.log(this === window); // true
var foo = "bar";
console.log(this.foo); // "bar"
console.log(window.foo); // "bar"

// 2. Function this
foo = "bar";
function testThis() {
  this.foo = "foo";
}
console.log(this.foo); //logs "bar"
testThis();
console.log(this.foo); //logs "foo"

// 3. Prototype this
function Thing() {
  console.log(this.foo);
}
Thing.prototype.foo = "bar";
var thing = new Thing(); //logs "bar"
console.log(thing.foo);  //logs "bar"

// 4. Object this
var obj = {
  foo: "bar",
  logFoo: function () {
    console.log(this.foo);
  }
};
obj.logFoo(); //logs "bar"

// 5. DOM Event this
function Listener() {
  document.getElementById("foo").addEventListener("click",
    this.handleClick);
}
Listener.prototype.handleClick = function (event) {
  console.log(this); //logs "<div id="foo"></div>"
};
var listener = new Listener();
document.getElementById("foo").click(); //logs "<div id="foo"></div>"

// 6. HTML this

//<div id="foo" onclick="console.log(this);"></div>
//<script type="text/javascript">
document.getElementById("foo").click(); //logs <div id="foo"...
//</script>

// 7. jQuery this
//<div class="foo bar1"></div>
//<div class="foo bar2"></div>
//  <script type="text/javascript">
$(".foo").each(function () {
  console.log(this); //logs <div class="foo...
});
$(".foo").on("click", function () {
  console.log(this); //logs <div class="foo...
});
$(".foo").each(function () {
  this.click();
});
//</script>

// 8. Inside call(), apply() and bind() functions

function add(inc1, inc2) {
  return this.a + inc1 + inc2;
}

var o = {a: 4};
document.write(add.call(o, 5, 6) + "<br />"); //15
//above add.call(o,5,6) sets `this` inside
//add() to `o` and calls add() resulting:
// this.a + inc1 + inc2 =
// `o.a` i.e. 4 + 5 + 6 = 15
document.write(add.apply(o, [5, 6]) + "<br />"); //15
// `o.a` i.e. 4 + 5 + 6 = 15

var g = add.bind(o, 5, 6);       //g: `o.a` i.e. 4 + 5 + 6
document.write(g() + "<br />");  //15

var h = add.bind(o, 5);          //h: `o.a` i.e. 4 + 5 + ?
document.write(h(6) + "<br />"); //15
// 4 + 5 + 6 = 15
document.write(h() + "<br />");  //NaN
//no parameter is passed to h()
//thus inc2 inside add() is `undefined`
//4 + 5 + undefined = NaN</code>
