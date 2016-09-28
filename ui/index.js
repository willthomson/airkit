/**
 * @fileoverview Utility functions related to the UI.
 */


/**
 * Creates a style element and inserts it into the head of the document.
 * @param {Object} rules An object containing CSS rules. Example:
 *
 *    {
 *        'body': {
 *            'font-weight': 'bold',
 *            'color': 'red'
 *        },
 *        'div.hero': {
 *            'font-size': '20px'
 *        }
 *    }
 *
 * @param {=string} opt_mediaQuery Media query value to contain created rules.
 *    Example: "(min-width: 800px)".
 * @return {Element} Created style element.
 */
function createStyle(rules, opt_mediaQuery) {
  var content = [];
  for (var selector in rules) {
    if (!rules.hasOwnProperty(selector)) {
      continue;
    }
    var declarations = rules[selector];
    var declarationsToAdd = [];
    for (var key in declarations) {
      if (!declarations.hasOwnProperty(key)) {
        continue;
      }
      var value = declarations[key];
      declarationsToAdd.push(key + ':' + value);
    }
    content.push(selector + '{' + declarationsToAdd.join(';') + '}');
  }
  content = content.join('');
  var styleEl = document.createElement('style');
  if (opt_mediaQuery) {
    content = '@media ' + opt_mediaQuery + ' {' + content + '}';
  }
  styleEl.textContent = content;
  document.head.appendChild(styleEl);
  return styleEl;
}


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


module.exports = {
  createStyle: createStyle,
  isElementInView: isElementInView
};
