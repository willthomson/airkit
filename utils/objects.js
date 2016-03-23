/**
 * Clones a.
 */
function clone(a) {
  var result = {};
  for (var key in a) {
    result[key] = a[key];
  }
  return result;
}


/**
 * Merges b into a in place.
 */
function merge(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
}

module.exports = {
  clone: clone,
  merge: merge
}
