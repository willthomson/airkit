var scrolled = false;
var objs = [];
var defaultConfig = {
  className: 'ak-scrolltoggle',
  upClassName: 'ak-scrolltoggle--up',
  downClassName: 'ak-scrolltoggle--down',
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
  // TODO(stevenle): support config overrides per element using a data- attr.
  this.config_ = config;
  this.lastScrollPos_ = 0;
}


/**
 * Callback for scroll events.
 */
ScrollToggle.prototype.onScroll = function() {
  var scrollPos = document.body.scrollTop;
  if (Math.abs(this.lastScrollPos_ - scrollPos) < this.config_.offset) {
    return;
  }

  if (scrollPos > this.lastScrollPos_) {
    // Scrolled down.
    this.el_.classList.remove(this.config_.upClassName);
    this.el_.classList.add(this.config_.downClassName);
  } else {
    // Scrolled up.
    this.el_.classList.remove(this.config_.downClassName);
    this.el_.classList.add(this.config_.upClassName);
  }
  this.lastScrollPos_ = scrollPos;
};


/**
 * Initializes the scroll listener for all elements tagged with the
 * "ak-scrolltoggle" class (configurable using the "className" config).
 * @param {Object=} opt_config Config options.
 */
function init(opt_config) {
  var config = cloneAndMerge(defaultConfig, opt_config || {});

  var els = document.getElementsByClassName(config.className);
  for (var i = 0, el; el = els[i]; i++) {
    var obj = new ScrollToggle(el, config);
    objs.push(obj);
  }

  // Debounce the scroll event by executing the onScroll callback using a timed
  // interval.
  document.addEventListener('scroll', function(e) {
    scrolled = true;
  });
  window.setInterval(function() {
    if (scrolled) {
      for (var i = 0, obj; obj = objs[i]; i++) {
        obj.onScroll();
      }
    }
  }, 250);
}


/**
 * Creates a clone of a and merges b.
 * @param {Object} a Object.
 * @param {Object} b Object.
 */
function cloneAndMerge(a, b) {
  // Clone a version of a.
  var result = {};
  for (var key in a) {
    result[key] = a[key];
  }
  // Merge b into copy of a.
  for (var key in b) {
    result[key] = b[key];
  }
  return result;
}


module.exports = {
  init: init
};
