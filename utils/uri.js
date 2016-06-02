/**
 * @fileoverview Utility functions related to URIs.
 */


/**
 * Returns the value of a key in a query string, given a URI.
 */
function getParameterValue(key, opt_uri) {
  var uri = opt_uri || window.location.href;
  key = key.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
  var results = regex.exec(uri);
  return results == null ? null : results[1];
}


module.exports = {
  getParameterValue: getParameterValue
};
