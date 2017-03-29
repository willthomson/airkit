/**
 * @fileoverview Lazy background image loader.
 */

var classes = require('../utils/classes');
var objects = require('../utils/objects');
var scrolldelegator = require('../scrolldelegator');
var ui = require('../ui');


var instances = [];


var LazyImageLoader = function(selector, attributes, loadedClassNames) {
  this.selector = selector;
  this.attributes = attributes;
  this.loadedClassNames = loadedClassNames;
};


LazyImageLoader.DefaultConfig = {
  selector: "['data-ak-lazy-src']",
  attributes: {
    src: 'data-ak-lazy-src',
    srcset: 'data-ak-lazy-srcset',
    sizes: 'data-ak-lazy-sizes'
  },
  loadedClassNames: ['ak-lazy--loaded']
};


LazyImageLoader.prototype.update = function() {
  var els = document.querySelectorAll(this.selector);
  [].forEach.call(els, function(el) {
    if (!el.hasAttribute(this.attributes.src)
        || !ui.isElementInView(el, null, true)) {
      return;
    }
    var src = this.getSrcsetValue_(el) || el.getAttribute(this.attributes.src);
    if (!src) {
      return;
    }
    var imageLoader = new Image();
    var onLoad = function() {
      if (!el.hasAttribute(this.attributes.src)) {
        return;
      }
      el.style.backgroundImage = 'url(' + src + ')';
      el.removeAttribute(this.attributes.src);
      if (this.loadedClassNames) {
        [].forEach.call(this.loadedClassNames, function(className) {
          classes.enable(el, className, true);
        });
      }
    }.bind(this);
    imageLoader.addEventListener('load', onLoad);
    imageLoader.src = src;
  }.bind(this));
};


LazyImageLoader.prototype.onScroll = function() {
  this.update();
};


/**
 * Parses srcset/sizes attribute values and returns the appropriate src for the
 * current viewport width.
 */
LazyImageLoader.prototype.getSrcsetValue_ = function(el) {
  var srcsetValue = el.getAttribute(this.attributes.srcset);
  var sizesValue = el.getAttribute(this.attributes.sizes);
  if (!srcsetValue || !sizesValue) {
    return null;
  }

  // Find the first `sizes` width that matches the media query.
  var sizes = this.parseSizes_(sizesValue);
  for (var i = 0; i < sizes.length; i++) {
    if (window.matchMedia(sizes[i].media).matches) {
      imageWidth = sizes[i].width;
      break;
    }
  }
  if (!imageWidth) {
    return null;
  }

  // Return the first `srcset` image that has a width greater than `imageWidth`.
  var srcset = this.parseSrcset_(srcsetValue);
  for (var i = 0; i < srcset.length; i++) {
    if (imageWidth <= srcset[i].width) {
      return srcset[i].src;
    }
  }
  return null;
};


/**
 * Parses a `srcset` value and returns a list of objects containing keys `src`
 * and `width`.
 * Note: This parser is not fully spec compliant. Use at your own risk.
 * Currently only supports values in format of:
 * `<src1> <width1>w, <src2> <width2>w`.
 */
LazyImageLoader.prototype.parseSrcset_ = function(srcset) {
  var results = [];
  var values = srcset.split(',');
  [].forEach.call(values, function(value) {
    var parts = value.trim().split(/\s+/);
    results.push({
      src: parts[0].trim(),
      width: parseInt(parts[1].trim().slice(0, -1))
    });
  });
  return results;
};


/**
 * Parses a `sizes` value and returns a list of objects containing keys `media`
 * and `width`.
 * Note: This parser is not fully spec compliant. Use at your own risk.
 * Currently only supports values in format of:
 * `<media1> <width1>w, <media2> <width2>w`.
 */
LazyImageLoader.prototype.parseSizes_ = function(sizes) {
  var results = [];
  var values = sizes.split(',');
  [].forEach.call(values, function(value) {
    var separator = value.lastIndexOf(' ');
    var media = value.slice(0, separator).trim();
    var width = parseInt(value.slice(separator + 1).trim().slice(0, -1));
    results.push({
      media: media,
      width: width
    })
  });
  return results;
};


var init = function(opt_config) {
  var config = objects.clone(LazyImageLoader.DefaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }
  var loader = new LazyImageLoader(
      config.selector, config.attributes, config.loadedClassNames);
  loader.onScroll();
  scrolldelegator.addDelegate(loader);
  scrolldelegator.start();
  // TODO: Remove this and build into scrolldelegator.
  document.addEventListener('DOMContentLoaded', function() {
    loader.onScroll();
  });
  instances.push(loader);
  return loader;
};


/** Updates all initialized instances. */
var update = function() {
  [].forEach.call(instances, function(instance) {
    instance.update();
  });
};


module.exports = {
  update: update,
  init: init
};
