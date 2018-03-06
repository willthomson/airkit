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
[data-ak-gcx=1] h1 {
  color: red;
}

// When the variation is 2, h1 is blue.
[data-ak-gcx=2] h1 {
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
