/**
 * OLOO (objects linked to other objects) pattern explored
 *
 * @Reference:
 * https://gist.github.com/getify/d0cdddfa4673657a9941
 * https://gist.github.com/getify/5572383
 * https://gist.github.com/getify/9895188
 * https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch6.md
 */

// CONSTRUCTOR SYNTAX VS OLOO
// Constructor form
function Foo() {
}
Foo.prototype.y = 11;

function Bar() {
}
// Object.create(proto[, propertiesObject]) method creates a new object with the specified prototype object and properties.
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.z = 31;

var x = new Bar();
console.log(x.y + x.z);  // 42


// OLOO form
var FooObj = {y: 11};

var BarObj = Object.create(FooObj);
BarObj.z = 31;

var x = Object.create(BarObj);
console.log(x.y + x.z);  // 42


/**
 * CLASS SYNTAX VS OLOO
 */
// ES6 Class style
class Foo {
  constructor(x, y, z) {
    // Object.assign(target, ...sources) method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
    Object.assign(this, {x, y, z});
  }

  hello() {
    console.log(this.x + this.y + this.z);
  }
}

var instances = [];
for (var i = 0; i < 500; i++) {
  instances.push(
    new Foo(i, i * 2, i * 3)
  );
}
instances[37].hello(); // 222


// OLOO Form
function Foo(x, y, z) {
  return {
    hello() {
      console.log(this.x + this.y + this.z);
    },
    x,
    y,
    z
  };
}

var instances = [];

for (var i = 0; i < 500; i++) {
  instances.push(
    Foo(i, i * 2, i * 3)
  );
}
instances[37].hello();  // 222