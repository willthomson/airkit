/**
 * @fileoverview Utility functions for CSS classes.
 */


/**
 * Removes a list of classes and adds new ones.
 */
function removeAdd(el, classesToRemove, classesToAdd) {
  classesToRemove.forEach(function(className) {
    el.classList.remove(className);
  });
  classesToAdd.forEach(function(className) {
    el.classList.add(className);
  });
}


/**
 * Enables a class based on a condition.
 */
function enable(el, className, enabled) {
  if (enabled) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
}


module.exports = {
  enable: enable,
  removeAdd: removeAdd
};
