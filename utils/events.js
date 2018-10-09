var delegateFunctionMap = new Map();
var listenerCount = new Map();

/**
 * Return the number of listeners attached to the given listener.
 * @param listener
 * @returns {*}
 */
function getListenerCount(listener) {
  if (listenerCount.has(listener)) {
    return listenerCount.get(listener);
  } else {
    return 0;
  }
}

/**
 * Increment the number of listeners attached to the given function.
 * @param listener
 */
function incrementListenerCount(listener) {
  listenerCount.set(listener, getListenerCount(listener) + 1);
}

/**
 * Decrement the number of listeners attached to the given function.
 * @param listener
 */
function decrementListenerCount(listener) {
  listenerCount.set(listener, getListenerCount(listener) - 1);
}

/**
 * Creates the delegate function that gets added during addDelegatedListener.
 * @param {Function} listener Listener function.
 * @private
 */
function getDelegateFunction_(listener) {
  if (!delegateFunctionMap.has(listener)) {
    var delegateFunction =
      function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        target = target.nodeType === 3 ? target.parentNode : target;
        do {
          listener(target, e);
          if (target.parentNode) {
            target = target.parentNode;
          }
        } while (target.parentNode);
      };
    delegateFunctionMap.set(listener, delegateFunction);
  }
  return delegateFunctionMap.get(listener);
}

/**
 * Adds an event listener to an element where the event target
 * is discovered by moving up the clicked element's descendants.
 * @param {Element} el Element to host the listener.
 * @param {string} type Listener type.
 * @param {Function} listener Listener function.
 */
function addDelegatedListener(el, type, listener) {
  incrementListenerCount(listener);
  return el.addEventListener(type, getDelegateFunction_(listener));
}

/**
 * Removes an event listener to an element where the event target
 * is discovered by moving up the clicked element's descendants.
 * @param {Element} el Element to host the listener.
 * @param {string} type Listener type.
 * @param {Function} listener Listener function.
 */
function removeDelegatedListener(el, type, listener) {
  var delegate = getDelegateFunction_(listener);
  decrementListenerCount(listener);
  if (getListenerCount(listener) <= 0) {
    delegateFunctionMap.delete(listener);
  }
  return el.removeEventListener(type, delegate);
}


module.exports = {
  addDelegatedListener: addDelegatedListener,
  removeDelegatedListener: removeDelegatedListener
};
