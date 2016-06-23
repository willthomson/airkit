### breakpoint

The `breakpoint` module contains a set of SASS/SCSS mixins for handling `@media`
using descriptive names for different screen widths.

Basic usage:

```scss
@import "airkit/breakpoint/mixins";

.foo {
  color: red;
  @include ak-breakpoint-gt(large) {
    color: blue;
  }
}
```

Compiles to:

```css
.foo {
  color: red;
}
@media (min-width: 1024px) {
  .foo {
    color: blue;
  }
}
```

#### Breakpoint rules

Breakpoint-based utility classes can be created using "breakpoint rules", which
generate `--gt-<size>` CSS rules that only apply at the breakpoint widths.

For example, you might want to create breakpoint rules for showing and hiding
elements at various widths.

HTML:

```html
<div class="show hide--gt-small">
  I'm on mobile!
</div>

<div class="hide show--gt-small">
  I'm not on mobile!
</div>
```

SCSS:

```scss
.hide {
  @include ak-breakpoint-rule-gt() {
    display: none;
  }
}

.show {
  @include ak-breakpoint-rule-gt() {
    display: block;
  }
}
```

Compiles to:

```css
.hide {
  display: none;
}
@media (min-width: 480px) {
  .hide--gt-small {
    display: none;
  }
}

.show {
  display: none;
}
@media (min-width: 480px) {
  .show--gt-small {
    display: block;
  }
}
```

#### Customzing widths

Default widths are defined in the `vars.scss` files, but can be overrided by
setting the appropriate `$ak-breakpoint-<size>` variables _before_ importing the
module.

Example:

```scss
$ak-breakpoint-small: 520px;
$ak-breakpoint-medium: 600px;

@import "airkit/breakpoint/mixins";
```

#### Unit tests

```sh
sudo npm install -g mocha
mocha mixins_test.js
```
