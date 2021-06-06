import utils from '@bigcommerce/stencil-utils';
import refreshContent from './refreshContent';
import Alert from '../components/Alert';
import { debounce } from 'lodash';

export default class CartUtils {
  constructor(options) {
    this.$cartContent = $('[data-cart-content]');
    this.$cartTotals = $('[data-cart-totals]');

    this.CartAlerts = new Alert($('[data-cart-messages]'));
    this.productData = {};

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this._bindEvents();
  }

  _bindEvents() {
    this.$cartContent.on('click', '[data-cart-item-quantity-change]', (event) => {
      event.preventDefault();
      this._updateQuantity(event);
    });

    this.$cartContent.on('keyup', '[data-cart-item-quantity-input]', debounce((event) => {
      event.preventDefault();
      this._updateQuantity(event);
    }, 750));

    this.$cartContent.on('click', '[data-cart-item-remove]', (event) => {
      event.preventDefault();
      this._removeCartItem(event);
    });
  }

  _updateQuantity(event) {
    const $target = $(event.currentTarget);
    const $cartItem = $target.closest('[data-cart-item]');
    const itemId = $cartItem.data('item-id');
    const $quantityInput = $cartItem.find('[data-cart-item-quantity-input]');
    const min = parseInt($quantityInput.prop('min'), 10);
    const max = parseInt($quantityInput.prop('max'), 10);
    let newQuantity = parseInt($quantityInput.val(), 10);

    if ($target.is('[data-cart-item-quantity-increment]') && (!max || newQuantity < max)) {
      newQuantity = newQuantity + 1;
    } else if ($target.is('[data-cart-item-quantity-decrement]') && newQuantity > min) {
      newQuantity = newQuantity - 1;
    }

    utils.api.cart.itemUpdate(itemId, newQuantity, (err, response) => {
      this.callbacks.willUpdate();

      if (response.data.status === 'succeed') {
        const remove = (newQuantity === 0);
        $quantityInput.val(newQuantity);
        refreshContent(this.callbacks.didUpdate, remove);
      } else {
        this.CartAlerts.error(response.data.errors.join('\n'), true);
        this.callbacks.didUpdate();
      }
    });
  }

  _removeCartItem(event) {
    const itemId = $(event.currentTarget).closest('[data-cart-item]').data('item-id');

    this.callbacks.willUpdate();

    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response.data.status === 'succeed') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        this.CartAlerts.error(response.data.errors.join('\n'), true);
        this.callbacks.didUpdate();
      }
    });
  }
}
