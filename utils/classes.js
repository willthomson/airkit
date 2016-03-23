/**
 * @fileoverview Utility functions for CSS classes.
 */


/**
 * Removes a list of classes and adds new ones.
 */
function removeAdd(el, classesToRemove, classesToAdd) {
  el.classList.remove.apply(el.classList, classesToRemove);
  el.classList.add.apply(el.classList, classesToAdd);
}


module.exports = {
  removeAdd: removeAdd
};
