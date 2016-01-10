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
})();


// Program 2
(function () {
  var ninja = {
    yell: function yell(n) {
      return n > 0 ? yell(n - 1) + "a" : "hiy";
    }
  };
  console.log(ninja.yell(4) == "hiyaaaa");

  var samurai = {yell: ninja.yell}; ////ninja.yell already assigned before ninja={}
  var ninja = {}; //
  console.log(samurai.yell(4) == "hiyaaaa");
})();