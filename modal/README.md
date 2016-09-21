### modal (under development)

Creates a modal dialog.

- Moves elements from original, on-page location to modal when displayed.
- Moves them back to original parent container when hidden.
- Supports permalinks with location hash/history support.

#### Sample usage

JS

```javascript
var modal = require('airkit/modal');
modal.init();
```

HTML

```html
<button data-ak-modal-id="example">Open</button>

<div data-ak-modal="example">
  <div class="example">
    Example modal content.
  </div>
</div>
```

Sass

- See [modal.sass](modal.sass) for an example Sass structure.
- Styles for in-modal content should be applied to the class of the child
  element (in the above example, you would apply styles to `.example`. Never
  style your elements using `data-ak-modal`.
