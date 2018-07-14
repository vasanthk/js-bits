/**
 * Iterating over an array with reduce()
 *
 * Iterating over arrays using forEach is a nicer, more modern, and seemingly more functional approach than an old-fashioned for loop.
 * I say “seemingly” because any operation performed inside forEach can only return results via side-effects, or by modifying the original array.
 * However, a more functional approach is to use other iteration methods available for arrays, such as map and reduce.
 * These methods don’t require side-effects, and can treat the original array as immutable.
 *
 * Both reduce and map have the same browser support as forEach.
 *
 * When you hear people talking about "Map Reduce" they are just talking about a "pattern": Mapping over a collection and then reducing it.
 *
 * @Reference:
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 * http://danmartensen.svbtle.com/javascripts-map-reduce-and-filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 * https://medium.freecodecamp.com/reduce-f47a7da511a9
 */

// Using forEach()

(function () {
  var ar = [1, 2, 3, 4, 5];
  var sum = 0;
  ar.forEach(function (v) {
    sum += v;
  });
  console.log(sum);
})();

// Using reduce()

(function () {
  var ar = [1, 2, 3, 4, 5];
  // Reduce does not have a variable sum in it's outer scope (like in forEach)
  console.log('sum:', ar.reduce(function (sum, v) {
    return sum + v;
  }, 0));
  // reduce() format: arr.reduce(callback()[, initialValue])
  // callback format: fn(previousValue, currentValue, index, array)
})();


/* Understand reduce
 *  Array.prototype.reduce(function(prev,curr,index,arr){    
 *       return result;
 *  },initprev);  
 *
 *  reduce(func,initprev), actually accept 4 params in first function: prev: previous, curr: current, index: current index, arr: original array
 *  reduce(func,initprev), initprev: set a default value as prev, if there is ot initprev, index will be started from 1, prev = arr[0] 
 *
 *
 *  Example without initprev,loop times: (arr.length -1) 
 *  [1,2,3].reduce(function(pre,curr,index,arr){
 *   console.log("pre:"+pre +"  curr:" + curr + " index:"+ index +" arr:" +arr);
 *    return curr;
 *  });
 *   output:  pre:1  curr:2 index:1 arr:1,2,3; pre:2  curr:3 index:2 arr:1,2,3;
 *
  *  Example with initprev, loop times: arr.length 
 *  [1,2,3].reduce(function(pre,curr,index,arr){
 *   console.log("pre:"+pre +"  curr:" + curr + " index:"+ index +" arr:" +arr);
 *    return curr;
 *  },4);
 *   output:  pre:4  curr:1 index:0 arr:1,2,3;  pre:1  curr:2 index:1 arr:1,2,3; pre:2  curr:3 index:2 arr:1,2,3;
 *
*/

/* use reduce to change inner array to object*/
 let arr = [
      ['a', 1],
      ['b', 2]
  ]; 
function inrArrToObj(arr){
    const result = arr.reduce(function(prev,curr){
     const obj = {
      [curr[0]]:curr[1]
     }
     prev.push(obj);
    return  prev;
  },[]);
   return result;
 }
inrArrToObj(arr);
// [{'a':1},{'b':2}]

/* use reduce to change inner array to object*/
 let arr = [
       ['a', 1],
       ['b', 2]
  ]; 
function inrArrToObj(arr){
    const result = arr.reduce(function(prev,curr){
      prev[curr[0]] = curr[1];
      return prev;
  },{});
   return result;
 };

 inrArrToObj(arr);
// output: {a:1,b:2}

