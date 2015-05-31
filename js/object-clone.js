/**
 * Object copy by value (Clone)
 *
 * @Reference: http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/
 */

(function () {
  var obj = {
    name: 'vasa',
    role: 'Ninja'
  }

  // Nofty trick to clone an objec (or copy by value)
  var clonedObj = JSON.parse(JSON.stringify(obj));
})();