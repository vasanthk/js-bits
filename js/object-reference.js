/**
 * Tricky code with object reference
 *
 * @Reference:
 * http://ejohn.org/apps/learn/#13
 * http://ejohn.org/apps/learn/#14
 * http://stackoverflow.com/questions/22216159/an-object-null-and-behaviour-in-javascript
 */

// Program 1
(function () {
  var ninja = {
    yell: function (n) {
      return n > 0 ? ninja.yell(n - 1) + "a" : "hiy";
    }
  };
  console.log(ninja.yell(4) == "hiyaaaa");

  var samurai = {yell: ninja.yell};
  var ninja = null;

  try {
    console.log(samurai.yell(4));
  } catch (e) {
    console.log(false, "Uh, this isn't good! Where'd ninja.yell go?");
  }
  // Program 1 doesn't work because inside the ninja.yell function, you are referring to ninja again:
  // return n > 0 ? ninja.yell(n-1) + "a" : "hiy";
  // So, if later on your are assigning null to ninja, this code will throw an error because null doesn't have a property yell.
})();

// Program 2
(function () {
  var ninja = {
    yell: function yell(n) {  // We are using a named function here, instead of an anonymous fn in Program 1.
      return n > 0 ? yell(n - 1) + "a" : "hiy"; // Calling `yell` instead of `ninja.yell` as in Program 1.
    }
  };
  console.log(ninja.yell(4) == "hiyaaaa");

  var samurai = {yell: ninja.yell}; // ninja.yell already assigned before ninja={}
  var ninja = null;

  try {
    console.log(samurai.yell(4));
  } catch (e) {
    console.log(false, "Uh, this isn't good! Where'd ninja.yell go?");
  }
  // Program 2 works because, instead of referring to the object that holds the function (ninja),
  // you are giving the function a name and directly refer to that name.
})();
