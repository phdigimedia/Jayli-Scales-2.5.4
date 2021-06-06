# Bigcommerce Modal Module

## Installation

NPM:

```
npm i github:pixelunion/bc-modal
```

## Usage

```
<div id="review-modal">
	<h1>Here's my modal!</h1>
</div>
```

```
#review-modal {
	display: none;
}
```

```
import $ from 'jquery';
import Modal from 'bc-modal';

const reviewModal = new Modal({
  el: $('#review-modal')
});

$('button').on('click', (event) => {
	reviewModal.open();
});
```

## Options

#### `el`

The jQuery object of the modal markup. The modal will be filled with the _contents_ of this element, not the element itself. Required.

#### `modalId`

Id of the modal wrapper element. Defaults to `#modal`.

#### `modalClass`

Optional additional class to add to the `.modal` element.

#### `bodyOverflowClass`

The class added to the body when the modal is open. Defaults to `scroll-locked`.

#### `bodyOverflowClass`

The class added to the body when the modal is open. Defaults to `scroll-locked`.

#### `centerVertically`

Whether or not to automatically center the modal vertically, defaults to `true`.

#### `closeSelector`

A selector string for a close button within the modal.

#### `afterShow`

A popular television program produced out of Toronto that ran after MTV's _The Hills_ in the early 2000's.

#### `afterHide`

Not a television program, but a callback. Does what you think it would.

## Methods

`open()` and `close()` should get you where you need to be.

`position()` will force a recalculation of the modal position, if `centerVertically` is enabled.

## Styling

`./dist/scss/modal.scss` has enough styles for things to work by default.

#### `.modal-wrapper`

The container, shouldn't need any styling.

#### `.modal`

The constrained 'box' for the modal - apply width dimensions etc here

#### `.modal-content`

Put the meat of your modal styles here: backgrounds, borders, shadows, anything you want!!!

### Animation classes

Transitions are handled via jQuery.revealer and can therefore be overridden in your css: have a look at [the docs](https://github.com/PixelUnion/jquery.revealer) (or modal.scss) specifics.

## Further Development

For debugging or improvements you can run a standalone demo version of the modal using a very basic node server:

```
$ npm install
$ npm run serve
```

This will allow you to make changes to the JS and HTML. To re-compile the scss you'll need to run `npm run build` from a separate terminal window after each change.
