## Airkit Grid

Airkit Grid is grid system based on flexbox. To add the grid to your project, simply import into your SASS file, e.g.:

```scss
@import 'node_modules/airkit/grid/grid';
```

### Examples

Two-column grid (equal width columns):

```html
<div class="ak-grid ak-grid--2-cols">
  <div class="ak-grid__item">1</div>
  <div class="ak-grid__item">2</div>
</div>
```

![grid-1](https://cloud.githubusercontent.com/assets/387282/14660263/bf871b98-0658-11e6-9f83-44a385257431.png)

For non-equal width columns, assume a 12-column grid:

```html
<div class="ak-grid">
  <div class="ak-grid__item ak-grid__item--3-cols">1</div> <!-- 25% width -->
  <div class="ak-grid__item ak-grid__item--9-cols">2</div> <!-- 75% width -->
</div>
```

![grid-2](https://cloud.githubusercontent.com/assets/387282/14660228/6d43c8fe-0658-11e6-85be-fa792894ef7f.png)

Grid items that extend past 12 columns will wrap below:

```html
<div class="ak-grid ak-grid--2-cols">
  <div class="ak-grid__item">1</div>
  <div class="ak-grid__item">2</div>
  <div class="ak-grid__item">3</div>
  <div class="ak-grid__item">4</div>
</div>

<!-- or: -->

<div class="ak-grid">
  <div class="ak-grid__item ak-grid__item--6-cols">1</div>
  <div class="ak-grid__item ak-grid__item--6-cols">2</div>
  <div class="ak-grid__item ak-grid__item--6-cols">3</div>
  <div class="ak-grid__item ak-grid__item--6-cols">4</div>
</div>
```

![grid-wrap](https://cloud.githubusercontent.com/assets/387282/14660455/5a81f2c0-065a-11e6-932d-8191ade888ca.png)


To reverse the rendering order of grid items, use `ak-grid--reversed`:

```html
<div class="ak-grid ak-grid--2-cols ak-grid--reversed">
  <div class="ak-grid__item">1</div>
  <div class="ak-grid__item">2</div>
</div>
```

![grid-reversed](https://cloud.githubusercontent.com/assets/387282/14660384/bbebc21c-0659-11e6-9cbf-931646792805.png)

Grid items that have unequal heights can be aligned to the middle or bottom using the `--valign-<position>` modifier on either `ak-grid` or `ak-grid__item`:

```html
<div class="ak-grid ak-grid--2-cols ak-grid--valign-middle">
  <div class="ak-grid__item">1</div>
  <div class="ak-grid__item">2</div>
</div>

<!-- or: -->

<div class="ak-grid ak-grid--2-cols">
  <div class="ak-grid__item">1</div>
  <div class="ak-grid__item ak-grid__item--valign-middle">2</div>
</div>
```

![grid-valign](https://cloud.githubusercontent.com/assets/387282/14660617/cdd5110c-065b-11e6-8a6b-faf82a88e6c0.png)
