/**
 * @fileoverview The scrolltoggle module updates classes on elements based on
 * scroll direction and position.
 */

var classes = require('../utils/classes');
var objects = require('../utils/objects');
var scrolldelegator = require('../scrolldelegator');


var scrolled = false;
var objs = [];
var defaultConfig = {
  querySelector: '.ak-scrolltoggle',
  upClassName: 'ak-scrolltoggle--up',
  downClassName: 'ak-scrolltoggle--down',
  topClassName: null,
  offset: 5
};



/**
 * Toggles a class on an element when a scroll direction has been detected.
 * @param {Element} el The element.
 * @param {Object} config Config options.
 * @constructor
 */
function ScrollToggle(el, config) {
  this.el_ = el;

  this.config_ = objects.clone(config);
  if (this.el_.hasAttribute('data-ak-scrolltoggle')) {
    var elConfig = JSON.parse(this.el_.getAttribute('data-ak-scrolltoggle'));
    if (elConfig && typeof elConfig === 'object') {
      objects.merge(this.config_, elConfig);
    }
  }

  // Initialize the current scroll position.
  this.lastScrollPos_ = 0;
  this.onScroll();
}


/**
 * Callback for scroll events.
 */
ScrollToggle.prototype.onScroll = function() {
  var scrollPos = scrolldelegator.getScrollPosY();
  if (Math.abs(this.lastScrollPos_ - scrollPos) < this.config_.offset) {
    return;
  }

  if (this.config_.topClassName && scrollPos <= this.config_.offset) {
    // Top of page.
    classes.removeAdd(this.el_,
        [this.config_.upClassName, this.config_.downClassName],
        [this.config_.topClassName]);
  } else if (scrollPos > this.lastScrollPos_) {
    // Scrolled down.
    classes.removeAdd(this.el_,
        [this.config_.topClassName, this.config_.upClassName],
        [this.config_.downClassName]);
  } else {
    // Scrolled up.
    classes.removeAdd(this.el_,
        [this.config_.topClassName, this.config_.downClassName],
        [this.config_.upClassName]);
  }

  this.lastScrollPos_ = scrollPos;
};


/**
 * Initializes the scroll listener for all elements tagged with the
 * "ak-scrolltoggle" class (configurable using the "className" config).
 * @param {Object=} opt_config Config options.
 */
function init(opt_config) {
  var config = objects.clone(defaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }

  var els = document.querySelectorAll(config.querySelector);
  for (var i = 0, el; el = els[i]; i++) {
    var obj = new ScrollToggle(el, config);
    scrolldelegator.addDelegate(obj);
  }

  scrolldelegator.start();
}

module.exports = {
  init: init
};
