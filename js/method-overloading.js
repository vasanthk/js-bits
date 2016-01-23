/**
 * Method/Function Overloading
 * A way of mapping a single function call to multiple functions based upon the arguments they accept
 *
 * @Reference:
 * http://ejohn.org/blog/javascript-method-overloading/
 * http://ejohn.org/apps/learn/#90
 *
 * Explanation:
 * http://stackoverflow.com/a/30989908/1672655
 * http://stackoverflow.com/a/18122417/1672655
 *
 * Best practises: http://stackoverflow.com/questions/456177/function-overloading-in-javascript-best-practices
 */

function addMethod(object, name, fn) {

  var old = object[name];
  // Get the old function corresponding to this name. Will be "undefined"
  // the first time "addMethod" is called.

  object[name] = function () {
    // Now, assign object[name] to a new function.
    // The critical part of this function is that "old" is captured inside of
    // this function and will be available any time the function is called.

    if (fn.length == arguments.length) {
      // if the number of parameters belonging to the function we've added
      // matches what was passed in, call "fn"
      return fn.apply(this, arguments);
    } else if (typeof old == 'function') {
      // Otherwise if there's another function with this name
      // call it instead.
      return old.apply(this, arguments);
    }
  };
}

function Ninjas() {
  var ninjas = ["Dean Edwards", "Sam Stephenson", "Alex Russell"];
  addMethod(this, "find", function () {
    return ninjas;
  });
  addMethod(this, "find", function (name) {
    var ret = [];
    for (var i = 0; i < ninjas.length; i++)
      if (ninjas[i].indexOf(name) == 0)
        ret.push(ninjas[i]);
    return ret;
  });
  addMethod(this, "find", function (first, last) {
    var ret = [];
    for (var i = 0; i < ninjas.length; i++)
      if (ninjas[i] == (first + " " + last))
        ret.push(ninjas[i]);
    return ret;
  });
}


//  USAGE
//
//  var ninjas = new Ninjas();
//  ninjas.find().length == 3
//  ninjas.find("Sam").length == 1
//  ninjas.find("Dean", "Edwards").length == 1
//  ninjas.find("Alex", "X", "Russell") == null