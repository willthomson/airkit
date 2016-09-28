/**
 * @fileoverview Utility functions related to videos.
 */

var ui = require('../ui');
var useragent = require('./useragent');


var defaultConfig = {
  breakpoint: null,
  fallbackVideoSelector: '.ak-video-fallback video',
  fallbackImageSelector: '.ak-video-fallback img'
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
 *   <div class="ak-video-fallback">
 *     <video>...</video>
 *     <img>
 *   </div>
 *
 * (2) Run at the top of the page (to avoid FOUC):
 *
 *   initVideoFallback();
 *
 * @param {Object=} opt_config Configuration. The configuration contains two
 *        options: videoSelector and imageSelector, selectors used to query
 *        videos and images to hide.
 */
function initVideoFallback(opt_config) {
  var videoSelector = (opt_config && opt_config.videoSelector)
      || defaultConfig.fallbackVideoSelector;
  var imageSelector = (opt_config && opt_config.imageSelector)
      || defaultConfig.fallbackImageSelector;
  var breakpoint = (opt_config && opt_config.breakpoint)
      || defaultConfig.breakpoint;

  var hidden = {'display': 'none !important'};
  var rules = {};
  if (canPlayVideo()) {
    rules[imageSelector] = hidden;
  } else {
    rules[videoSelector] = hidden;
  }

  if (!breakpoint) {
    ui.createStyle(rules);
  } else {
    var minScreenQuery = '(min-width: ' + breakpoint + 'px)';
    ui.createStyle(rules, minScreenQuery);
    var smallerBreakpoint = breakpoint - 1;
    var maxScreenQuery = '(max-width: ' + smallerBreakpoint + 'px)';
    rules = {};
    rules[videoSelector] = hidden;
    ui.createStyle(rules, maxScreenQuery);
  }
}


module.exports = {
  canPlayVideo: canPlayVideo,
  initVideoFallback: initVideoFallback
};
