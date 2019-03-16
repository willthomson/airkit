### googlecontentexperiments

Utility functions for working with Google Analytics Content Experiments. Loads
the GACX library, provides a way to test variations by URL parameter, and
automatically hides and shows elements tagged with a data attribute.

#### Sample usage

Because this utility adds a CSS style to the page, `gcx.init` should be called
inside the `<head>` of the page to avoid a flash of content.

You may preview variations using `?variation=<variation id>` in the query
string. This will override the value returned by GCX's `cxApi.chooseVariation`.

JS

```javascript
<head>
  <script src="//www.google-analytics.com/cx/api.js?experiment=EXPERIMENT_ID"></script>
  <script>
    var gcx = require('airkit/analytics/googlecontentexperiments');
    gcx.init();
  </script>
</head>
```

HTML

```html
<div data-ak-gcx="0">
  Control variation (0).
</div>
<div data-ak-gcx="1">
  Variation 1.
</div>
```

#### Alternate approach

When `setVariationShown` is `false`, you can use the utility to set a data
attribute on an element (such as the `Document` element), and then use CSS in
your own styles to adjust behavior other than showing/hiding elements.

HTML

```html
<html data-ak-gcx>
  <script src="//www.google-analytics.com/cx/api.js?experiment=EXPERIMENT_ID"></script>
  <body>
    <h1>Title</h1>
```

JS

```javascript
var gcx = require('airkit/analytics/googlecontentexperiments');
gcx.init({
  setVariationShown: false
});
```

CSS

```css
// When the variation is 1, h1 is red.
[data-ak-gcx="1"] h1 {
  color: red;
}

// When the variation is 2, h1 is blue.
[data-ak-gcx="2"] h1 {
  color: blue;
}
```

#### Configuration options

Example

```javascript
gcx.init({
  parameterName: 'variation',
  attributeName: 'data-ak-gcx'
});
```

Option | Default | Description
------ | ------- | -----------
parameterName | variation | Key of the query parameter to use to set the active variation.
attributeName | data-ak-gcx | Attribute used to decorate variation elements.
setVariationShown | true | Whether to automatically hide or show elements with an attribute matching `attributeName`. If `false`, then elements with the attribute `attributeName` will have their attribute set to the numerical ID of the active variation.

### tracking

Utility for automatically tracking interactions with elements based on various
criteria.

The tracking snippets use the following conventions:

- **Category**: The type of link (i.e. internal, outbound, generic; where "generic" is not a link and just a click on an element).
- **Action**: The `href` value of the target element.
- **Label**: The `textContent` (visible text) of the target element.

#### Sample usage

JS

```javascript
var tracking = require('airkit/analytics/tracking');
tracking.init(function(el, obj) {
  var data = {
    eventCategory: obj.attrs.category || obj.linkCategoryName,
    eventAction: obj.attrs.action || obj.getAttribute('href'),
    eventLabel: obj.attrs.label || obj.label,
  };
  window.dataLayer.push(data);
}, {
  overlayEnabled: window.location.hostname != 'prod.com',
});
```

HTML

```html
<!-- Tracked due to default <a> tag. -->
<a href="#">Click here</a>

<!-- Tracked due to default <button> tag. -->
<button>Submit</button>

<!-- Tracked due to data attributes. -->
<div
    data-ak-tracking-category="Custom category"
    data-ak-tracking-action="Custom action"
    data-ak-tracking-label="Custom label">
  Click here
</div>
```

#### Backwards compatibility with autotrack.js

The following snippet provides backwards compatibility with `autotrack.js` with
a few minor caveats.

- **Event Category**: No changes.
- **Event Action**: No changes (defaults to `href` attribute).
- **Event Label**: No longer the pathname of the current page (this information was useless, and could be gleaned elsewhere in analytics. Now defaults to the `textContent` of the element.

```javascript
var tracking = require('airkit/analytics/tracking');
tracking.init(function(el, obj) {
  // Category.
  var category = el.getAttribute('data-g-event');
  if (!category) {
    swtich (obj.linkCategory) {
      case 'internal':
        category = 'AutoTrack: Link Click';
        break;
      case 'outbound':
        category = 'AutoTrack: Outbound Click';
        break;
      default:
        category = 'AutoTrack: Element Click'
    }
  }
  var action = el.getAttribute('data-g-action') || obj.getAttribute('href');
  var label = el.getAttribute('data-g-label') || obj.label;
  let data = {
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
  };
  if (window._gaq) {
    window._gaq.push([
      '_trackEvent',
      data.eventCategory,
      data.eventAction,
      data.eventLabel
    ]);
  } else {
    window.dataLayer.push(data);
  }
}, {
  attributes: ['data-g-event', 'data-g-action', 'data-g-category']
});
```
