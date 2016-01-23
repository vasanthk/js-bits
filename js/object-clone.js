/**
 * Object copy by value (Clone)
 *
 * @Reference: http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/
 */

(function () {
  var obj = {
    name: 'vasa',
    role: 'Ninja'
  };

  // A trick to clone an object (or copy by value)
  var clonedObj = JSON.parse(JSON.stringify(obj));

  // In ES6
  var clone = Object.assign({}, obj);

  // With jQuery
  // Shallow copy
  var copiedObjShallow = jQuery.extend({}, obj);
  // Deep copy
  var copiedObjDeep = jQuery.extend(true, {}, obj)
})();