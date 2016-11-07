/**
 * String Methods
 *
 * @Reference:
 * http://www.w3schools.com/js/js_string_methods.asp
 * http://techiejs.com/Blog/Post/Essential-JavaScript-String-Functions
 * https://rapd.wordpress.com/2007/07/12/javascript-substr-vs-substring/
 * http://www.bennadel.com/blog/2159-using-slice-substring-and-substr-in-javascript.htm
 * Quirks Mode:http://www.quirksmode.org/js/strings.html
 *
 */

// String.prototype.charAt()
var myName = "Oleg Shalygin";
//Usage:  myName.charAt(index)
var letter = myName.charAt(6);  //h


//String.prototype.indexOf()
var fullName = "Oleg Shalygin";
//Usage:  fullName.indexOf(searchTerm, startingIndex)
var index = fullName.indexOf("Oleg"); //0
index = fullName.indexOf("Shalygin"); //5
index = fullName.indexOf("l"); //1
index = fullName.indexOf("l",4); //8
index = fullName.indexOf("Girlfriend"); //-1


// String.prototype.lastIndexOf()
var storyMode = "Once upon a time, there was a magical foobar that was controlling the universe...";
console.log(storyMode.lastIndexOf(",")); //16
console.log(storyMode.lastIndexOf(".")); //80
console.log(storyMode.lastIndexOf("!")); //-1
console.log(storyMode.lastIndexOf("foobar")); //38


// String.prototype.match()
var someString = "Hello there, my name is aararand and I am a magical foobarus creature";
var resultsArray = someString.match(/a{2}/);
//resultsArray = ["aa", index: 24, input: "Hello there, my name is aararand and I am a magical foobarus creature"]
var someOtherResultsArray = someString.match(/b{2}/);
//someOtherResultsArray = null


// String.prototype.replace()
var someString = "Hello there, my name is aararand and I am a magical foobarus creature";
var newString = someString.replace(/a{2}/, "lol");
//newString = "Hello there, my name is lolrarand and I am a magical foobarus creature"


// String.prototype.slice()
var story = "Foobarus is a magical unicorn with an ID of 21313 which flies higher than all other unicorns.  Unicorns fly?  Regardless!";
var previewStory = story.slice(0, 40); //Foobarus is a magical unicorn with an ID


// String.prototype.split()
var story = "Foobarus is a magical unicorn with an ID of 21313 which flies higher than all other unicorns.  Unicorns fly?  Regardless!";
var previewStory = story.split(".");
console.log(previewStory[0]); //Foobarus is a magical unicorn with an ID of 21313 which flies higher than all other unicorns
console.log(previewStory[1]); //Unicorns fly?  Regardless!


// String.prototype.substring()
// NOTE:
// The second argument to substring is the index to stop at (but not include),
// but the second argument to substr is the maximum length to return.
// Syntax: string.substr(start, length);
// Syntax: string.substring(start, stop);
//
// Also, the slice() and substring() methods are roughly the same:
// the only difference is that the slice() method can accept a negative index, relative to the end of the string.
var story = "Foobarus is a magical unicorn with an ID of 21313 which flies higher than all other unicorns.  Unicorns fly?  Regardless!";
var theLastFewCharacters = story.substring(story.length - 20);
console.log("..." + theLastFewCharacters); // ..ns fly?  Regardless!


// String.prototype.toLowerCase() and String.prototype.toUpperCase()
var story = "Foobarus is a magical unicorn with an ID of 21313 which flies higher than all other unicorns.  Unicorns fly?  Regardless!";
var allUpperCase = story.toUpperCase();
var allLowerCase = story.toLowerCase();
var foobarus = allUpperCase.match(/FOOBARUS/); //["FOOBARUS", index: 0, input: "FOOBARUS IS A MAGICAL UNICORN WITH AN ID OF 21313 …N ALL OTHER UNICORNS.  UNICORNS FLY?  REGARDLESS!]


// String.prototype.trim()
var fullName = "  Oleg Shalygin       ";
var trimmedFullName = fullName.trim(); //Oleg Shalygin


// String.prototype.concat()
var firstName = "Oleg";
var lastName = "Shalygin";
var ID = 12321312;
//Usage: firstName.concat(string2, string 3, string 3, ...);
var fullIdentification = firstName.concat(lastName, ":", ID);
console.log(fullIdentification); //OlegShalygin:12321312
