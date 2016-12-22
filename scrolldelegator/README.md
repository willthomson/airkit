## scrolldelegator

Utility functions for scrolling.

### depth.trackScroll

Calls a function whenever a scroll depth is reached. Typical use cases involve
analytics tracking (e.g. to send analytics tracking events when users have
reached a certain scroll depth.

#### Sample usage

```javascript
var depth = require('airkit/scrolldelegator/depth');

// Generic example.
depth.trackScroll(function(percentage, yPosition) {
  console.log('Reached %: ', percentage);
  console.log('Reached Y: ', yPosition);
});

// Google Analytics Event Tracking example.
depth.trackScroll(function(percentage) {
  var label = percentage + '%';
  ga('send', 'event', ['Engagement'], ['Scroll Percentage'], [label]);
});
```

#### Configuration options

Option | Default | Description
------ | ------- | -----------
ratios | [0.25, 0.50, 0.75, 0.95] | Depth ratios to track.

### depth.trackElements

Calls a function whenever elements with attribute `data-ak-depth` are reached.
While frequently used for tracking purposes, this can also be used as a generic
callback for acting upon specific elements when they are reached.

#### Sample usage

```html
<div data-ak-depth>
  Tracks this element when scrolled into view.
</div>
```

```javascript
var depth = require('airkit/scrolldelegator/depth');

depth.trackElements(function(el, yPosition) {
  console.log('Reached element: ', el);
  console.log('Reached Y: ', yPosition);
});
```

#### Configuration options

Option | Default | Description
------ | ------- | -----------
querySelector | [data-ak-depth] | Track elements with this query selector.
visitedAttributeName | data-ak-depth-visited | Attribute name to add to visited elements.
