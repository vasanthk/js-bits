/*
  In Javascript we have many functions to select the DOM elements that you'd like to control.
  
  Here I am going to explore the basics functions. Later, in other file, I will explain the functions to select the Nodes from the DOM.
  
  Let's go!
  
  document.getElementById("IDName") - Selects the first element with the ID passed. How ID's should be used once in a HTML, it selects the first element,
                                      if the ID is duplicated, it selects the first one.
                                      
  document.getElementsByClassName("ClassName") - Selects the elements with the Class name passed. It returns an array with the elements.
  
  document.getElementsByName("Name") - Selects the elements with the Name passed, returns an array with the elements.
  
  document.getElementsByTagName("TagName") - Selects the elements with the passed Tag, returns an array with the elements
  
  document.querySelector("#IDName or .ClassName") - Selects the first one element that it finds with the passed name and type.
  
  document.querySelectorAll("#IDName or .ClassName") - Selects all the element that it finds with the passed name and type. It returns an array

  These are the best ways to query the elements. Next, I will explain about how to find the elements by Node (this is a boring activity).

*/
