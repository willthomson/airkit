/**
 * @fileoverview The scrolldelegator module delegates scroll events to
 * registered delegates, using a timed interval to debounce events.
 */

var delegates = [];
var interval = null;
var scrolled = false;


/**
 * Adds a delegate to be notified when a scroll event occurs.
 */
function addDelegate(delegate) {
  delegates.push(delegate);
}


/**
 * Returns the current vertical Y position.
 */
function getScrollPosY() {
  if (window.pageYOffset !== undefined) {
    return window.pageYOffset;
  }
  return document.documentElement.scrollTop;
}


/**
 * Returns whether the scroll listener has been started.
 */
function isStarted() {
  return interval !== null;
}


/**
 * Starts the scroll listener.
 */
function start() {
  if (isStarted()) {
    return;
  }

  // Debounce the scroll event by executing the onScroll callback using a timed
  // interval.
  window.addEventListener('scroll', onScroll_, {'passive': true});
  interval = window.setInterval(function() {
    if (scrolled) {
      for (var i = 0, delegate; delegate = delegates[i]; i++) {
        delegate.onScroll();
      }
      scrolled = false;
    }
  }, 250);
}


/**
 * Stops the scroll listener.
 */
function stop() {
  if (!isStarted()) {
    return;
  }
  window.removeEventListener('scroll', onScroll_);
  window.clearInterval(interval);
}


/** @private */
function onScroll_(e) {
  scrolled = true;
}


module.exports = {
  addDelegate: addDelegate,
  getScrollPosY: getScrollPosY,
  isStarted: isStarted,
  start: start,
  stop: stop
};
