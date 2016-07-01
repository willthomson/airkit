/**
 * @fileoverview Utility functions related to videos.
 */

var ui = require('../ui');
var useragent = require('./useragent');


var defaultConfig = {
  fallbackVideoSelector: '[data-ak-video-fallback] video',
  fallbackImageSelector: '[data-ak-video-fallback] img'
};


/** Returns whether the user agent can play video. */
function canPlayVideo() {
  var videoEl = document.createElement('video');
  return videoEl.canPlayType && !useragent.isMobile();
}


/**
 * Shows or hides video elements and their corresponding image elements
 * depending on whether the user agent can play video.
 *
 * Fallback is only implemented between video and images, not video formats.
 * You should rely on the video element's default behavior with <source> tags
 * to support fallback between video formats. As a result, you should probably
 * always include at least a mp4 video, as mp4 is the most compatible.
 *
 * This is opinionated and will not enable video for mobile devices.
 *
 * (1) Set up a DOM structure:
 *
 *   <div data-ak-video-fallback>
 *     <video>...</video>
 *     <img>
 *   </div>
 *
 * (2) Run at the top of the page (to avoid FOUC):
 *
 *   initVideoFallback();
 *
 * @param {string=} opt_videoSelector Query selector to use to find videos to hide.
 * @param {string=} opt_imageSelector Query selector to use to find images to hide.
 */
function initVideoFallback(opt_videoSelector, opt_imageSelector) {
  var videoSelector = opt_videoSelector || defaultConfig.fallbackVideoSelector;
  var imageSelector = opt_imageSelector || defaultConfig.fallbackImageSelector;
  var hidden = {'display': 'none !important'};
  var rules = {};
  if (canPlayVideo()) {
    rules[imageSelector] = hidden;
  } else {
    rules[videoSelector] = hidden;
  }
  ui.createStyle(rules);
}


module.exports = {
  canPlayVideo: canPlayVideo,
  initVideoFallback: initVideoFallback
};
