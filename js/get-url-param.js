/**
 * Get param value from the url
 *
 * window.location.search
 * Returns the query string part of the url, including the leading question mark (?). It's supported across all browsers.
 *
 * encodeURIComponent() - encodes a URI component.
 * decodeURIComponent() - decodes a URI component.
 *
 * encodeUR() - encodes the complete url.
 * decodeUR() - decodes the complete url.
 */


(function () {
  function getQueryParam(paramName) {
    // We apply substring(1) on the queryString to remove the leading question mark(?)
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === paramName) {
        return decodeURIComponent(pair[1]);
      }
    }
    // If param name is not found in the query string, return false.
    return false;
  }

  // If the url is https://www.vasanthk.com?user=vasa
  // getqueryParam(user) returns 'vasa'
})();