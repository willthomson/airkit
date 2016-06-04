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

#### Configuration options

Example

```javascript
gcx.init('<gcx experiment id>', {
  parameterName: 'variation',
  attributeName: 'data-ak-gcx'
});
```

Option | Default | Description
------ | ------- | -----------
parameterName | variation | Key of the query parameter to use to set the active variation.
attributeName | data-ak-gcx | Attribute used to decorate variation elements.
