### scrolltoggle

The scrolltoggle module listens for scroll events and updates elements that are tagged with the ak-scrolltoggle class with the state of the scroll, i.e. whether the user has scrolled up or down.

#### Sample usage

JS

```javascript
var scrolltoggle = require('airkit/scrolltoggle');
scrolltoggle.init();
```

HTML

```html
<div class="ak-scrolltoggle">
  Ths div turns blue when scrolling down, red when scrolling up.
</div>
```

SASS

```scss
.ak-scrolltoogle {
  background-color: white;
}
.ak-scrolltoggle--down {
  background-color: blue;
}
.ak-scrolltoggle--up {
  background-color: red;
}
```

#### Configuration options

Configuration options can be passed to the `scrolltoggle.init()` function to override default behavior.

Example

```javascript
scrolltoggle.init({
  querySelector: 'header.mobile-slider'
});
```

Option | Default | Description
------ | ------- | -----------
querySelector | ".ak-scrolltoggle" | The CSS query selector for all elements that this module will toggle on scroll.
upClassName | "ak-scrolltoggle--up" | If provided, the CSS class name to apply when the user scrolls up.
downClassName | "ak-scrolltoggle--down" | If provided, the CSS class name to apply when the user scrolls down.
topClassName | null | If provided, the CSS class name to apply when the user scrolls to the very top of the page.
offset | 5 | The offset, in px, to use before toggling the element.
