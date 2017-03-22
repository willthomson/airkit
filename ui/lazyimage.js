/**
 * @fileoverview Lazy background image loader.
 */

var classes = require('../utils/classes');
var objects = require('../utils/objects');
var scrolldelegator = require('../scrolldelegator');
var ui = require('../ui');


var instances = [];


var LazyImageLoader = function(selector, attributeName, loadedClassNames) {
  this.selector = selector;
  this.attributeName = attributeName;
  this.loadedClassNames = loadedClassNames;
};


LazyImageLoader.DefaultConfig = {
  selector: "['data-ak-lazy-src']",
  attributeName: 'data-ak-lazy-src',
  loadedClassNames: ['ak-lazy--loaded']
};


LazyImageLoader.prototype.update = function() {
  var els = document.querySelectorAll(this.selector);
  [].forEach.call(els, function(el) {
    if (!el.hasAttribute(this.attributeName)
        || !ui.isElementInView(el, null, true)) {
      return;
    }
    var src = el.getAttribute(this.attributeName);
    if (!src) {
      return;
    }
    var imageLoader = new Image();
    var onLoad = function() {
      if (!el.hasAttribute(this.attributeName)) {
        return;
      }
      el.style.backgroundImage = 'url(' + src + ')';
      el.removeAttribute(this.attributeName);
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


var init = function(opt_config) {
  var config = objects.clone(LazyImageLoader.DefaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }
  var loader = new LazyImageLoader(
      config.selector, config.attributeName, config.loadedClassNames);
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
