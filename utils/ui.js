/**
 * @fileoverview Utility functions related to the UI.
 */


/**
 * Returns whether an element is visibile in the viewport.
 * @param {Element} el Element to check.
 * @param {number=} opt_offset Offset to apply when checking
 *    whether the element is in view. The value of opt_offset should
 *    be a fraction (e.g. 0.85) and the resulting offset value is
 *    determined by multiplying opt_offset with the element's height.
 * @return {boolean} Whether the element is in view.
 */
function isElementInView(el, opt_offset) { 
  var rect = el.getBoundingClientRect();
  var root = document.documentElement;
  var height = rect.bottom - rect.top;
  var offset = 0;
  if (opt_offset) {
    offset = height * opt_offset;
  }
  return (
    rect.top + offset >= 0 &&
    rect.left >= 0 &&
    rect.bottom - offset <= (window.innerHeight || root.clientHeight) &&
    rect.right <= (window.innerWidth || root.clientWidth)
  );
}


/**
 * Creates a style element and inserts it into the head of the document.
 * @param {Array.Array} A list of [<string>, <string>] elements where the first
 *     element is the selector to create and the second element is the
 *     corresponding style. Example: [['.foo', 'display: none']]
 * @return {Element} Created style element.
 */
function createStyle(selectorsAndValues) {
  var content = '';
  [].forEach.call(selectorsAndValues, function(item) {
    var selector = item[0];
    var value = item[1];
    content += ' ' + selector + ' { ' + value + ' }' + ' ';
  });
  var styleEl = document.createElement('style');
  styleEl.textContent = content;
  document.getElementsByTagName('head')[0].appendChild(styleEl);
  return styleEl;
}


module.exports = {
  createStyle: createStyle,
  isElementInView: isElementInView
};
