/**
 * @fileoverview Calls a function whenever a scroll depth is reached.
 * Ratio-based depths (e.g. 25%, 50%, 75%) are supported.
 */

var objects = require('../utils/objects');
var scrolldelegator = require('.');


var defaultConfig = {
  visitedAttributeName: 'data-ak-depth-visited',
  querySelector: '[data-ak-depth]',
  ratios: [0.25, 0.50, 0.75, 0.95]
};


ScrollDepthCaller = function(scrollCallback, elementsCallback, config) {
  this.querySelector = config.querySelector;
  this.visitedAttributeName = config.visitedAttributeName;
  this.scrollCallback = scrollCallback;
  this.elementsCallback = elementsCallback;
  this.ratios = config.ratios;

  this.onScroll();
};


ScrollDepthCaller.prototype.onScroll = function() {
  var yPos = scrolldelegator.getScrollPosY();

  // Callback for ratios.
  if (this.scrollCallback) {
    var scrollRatio = yPos / (document.body.offsetHeight - window.innerHeight);
    for (var i = 0; i < this.ratios.length; i++) {
      if (scrollRatio > this.ratios[i]) {
        var percentage = this.ratios[i] * 100;
        this.ratios[i] = 200;  // Ensure ratio isn't encountered again.
        this.scrollCallback(percentage, yPos);
      }
    }
  }

  // Callback for tagged elements.
  if (this.elementsCallback && this.visitedAttributeName) {
    var depthEls = document.querySelectorAll(this.querySelector);
    [].forEach.call(depthEls, function(el) {
      var isReached = el.getBoundingClientRect().top <= 0;
      if (isReached && !el.hasAttribute(this.visitedAttributeName)) {
        // Ensure we only track visiting an element once per page.
        el.setAttribute(this.visitedAttributeName, '');
        this.elementsCallback(el, yPos);
      }
    }.bind(this));
  }
};


function trackScroll(cb, opt_config) {
  var config = objects.clone(defaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }

  var scrollDepthCaller = new ScrollDepthCaller(cb, null, config);
  scrolldelegator.addDelegate(scrollDepthCaller);
}


function trackElements(cb, opt_config) {
  var config = objects.clone(defaultConfig);
  if (opt_config) {
    objects.merge(config, opt_config);
  }

  var scrollDepthCaller = new ScrollDepthCaller(null, cb, config);
  scrolldelegator.addDelegate(scrollDepthCaller);
}


module.exports = {
  init: trackScroll,  // depth.init backwards compatibility.
  trackScroll: trackScroll,
  trackElements: trackElements
};
