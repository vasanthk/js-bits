/**
 * A way of mapping a single function call to multiple functions based upon the arguments they accept
 *
 * @Reference:
 * http://ejohn.org/blog/javascript-method-overloading/
 *
 * Best practises: http://stackoverflow.com/questions/456177/function-overloading-in-javascript-best-practices
 */

function addMethod(object, name, fn){
  // Save a reference to the old method
  var old = object[ name ];

  // Overwrite the method with our new one
  object[ name ] = function(){
    // Check the number of incoming arguments,
    // compared to our overloaded function
    if ( fn.length == arguments.length )
    // If there was a match, run the function
      return fn.apply( this, arguments );

    // Otherwise, fallback to the old method
    else if ( typeof old === "function" )
      return old.apply( this, arguments );
  };
}

function Ninjas(){
  var ninjas = [ "Dean Edwards", "Sam Stephenson", "Alex Russell" ];
  addMethod(this, "find", function(){
    return ninjas;
  });
  addMethod(this, "find", function(name){
    var ret = [];
    for ( var i = 0; i < ninjas.length; i++ )
      if ( ninjas[i].indexOf(name) == 0 )
        ret.push( ninjas[i] );
    return ret;
  });
  addMethod(this, "find", function(first, last){
    var ret = [];
    for ( var i = 0; i < ninjas.length; i++ )
      if ( ninjas[i] == (first + " " + last) )
        ret.push( ninjas[i] );
    return ret;
  });
}


//  USAGE
//
//  var users = new Users();
//  users.find(); // Finds all
//  users.find("John"); // Finds users by name
//  users.find("John", "Resig"); // Finds users by first and last name
//  users.find("John", "E", "Resig"); // Finds all