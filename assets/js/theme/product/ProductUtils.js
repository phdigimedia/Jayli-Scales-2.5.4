import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import CartPreview from '../cart/CartPreview';
import UserDefinedContent from '../components/UserDefinedContent';
import AttributesHelper from './AttributesHelper';
import Wishlist from './Wishlist';

export default class ProductUtils {
  constructor(el, options) {
    this.$el = $(el);
    this.options = options;
    this.productId = this.$el.find('[data-product-id]').val();
    this.$form = this.$el.find('form[data-cart-item-add]');
    this.productAttributesData = window.BCData.product_attributes;

    // class to add or remove from cart-add button depending on variation availability
    this.buttonDisabledClass = 'button-disabled';

    // two alert locations based on action
    this.cartAddAlert = new Alert(this.$el.find('[data-product-cart-message]'));
    this.cartOptionAlert = new Alert(this.$el.find('[data-product-option-message]'));

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
      switchImage: (url) => console.log(`Image switch attempted for ${url}`),
    }, options.callbacks);

    this.attributesHelper = new AttributesHelper(el);
  }

  /**
   * pass in the page context and bind events
   */
  init(context) {
    this.context = context;

    const $productOptionsElement = $('[data-product-option-change]', this.$form);
    const hasOptions = $productOptionsElement.length > 0 ? true : false;
    const hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
     if (hasDefaultOptions || (_.isEmpty(this.productAttributesData) && hasOptions)) {
      const $productId = $('[name="product_id"]', this.$form).val();
      utils.api.productAttributes.optionChange($productId, this.$form.serialize(), 'product/product-single-details', (err, response) => {
        const attributesData = response.data || {};
        const attributesContent = response.content || {};
        this.attributesHelper.updateAttributes(attributesData);
      });
    } else {
      this.attributesHelper.updateAttributes(this.productAttributesData);
    }

    this._bindQuantityChange();
    this._bindProductOptionChange();
    this._bindEvents();

    this._boundCartCallback = this._bindCartAdd.bind(this);
    utils.hooks.on('cart-item-add', this._boundCartCallback);

    new UserDefinedContent(this.$el.find('.product-details-description'));

    if (this.$el.hasClass('product-single-container')) {
      this.attributesHelper.updateAttributes(window.BCData.product_attributes);
    } else {
      // otherwise emit our option change event (this happens in the quickshop)
      utils.hooks.emit('product-option-change');
    }

    new Wishlist(this.$el, this.context);
  }

  unload() {
    if (this.productOptionHandler) {
      utils.hooks.off('product-option-change', this.productOptionHandler);
    }
  }

  /**
   * Cache an object of jQuery elements for DOM updating
   * @param  jQuery $el - a wrapping element of the scoped product
   * @return {object} - buncha jQuery elements which may or may not exist on the page
   */
  _getViewModel($el) {
    return {
      $price: $('.product-details [data-product-price-wrapper="without-tax"]', $el),
      $priceWithTax: $('.product-details [data-product-price-wrapper="with-tax"]', $el),
      $saved: $('.product-details [data-product-price-saved]', $el),
      $sku: $('.product-details [data-product-sku]', $el),
      $weight: $('.product-details [data-product-weight]', $el),
      $addToCart: $('.product-details [data-button-purchase]', $el),
      stock: {
        $selector: $('[data-product-stock]', $el),
        $level: $('[data-product-stock-level]', $el),
      },
    };
  }

  /**
  * https://stackoverflow.com/questions/49672992/ajax-request-fails-when-sending-formdata-including-empty-file-input-in-safari
  * Safari browser with jquery 3.3.1 has an issue uploading empty file parameters. This function removes any empty files from the form params
  * @param formData: FormData object
  * @returns FormData object
  */
  filterEmptyFilesFromForm(formData) {
    try {
      for (const [key, val] of formData) {
        if (val instanceof File && !val.name && !val.size) {
          formData.delete(key);
        }
      }
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
    return formData;
  }

  /**
   * Bind quantity input changes.
   */
  _bindQuantityChange() {
    this.$el.on('click', '[data-product-quantity-change]', (event) => {
      this._updateQuantity(event);
    });
  }

  /**
   * Bind product events.
   */
  _bindEvents() {
    this.$el.on('click', '[data-accordion-toggle]', (event) => {
      this._toggleAccordion(event);
    });

    this.$el.on('click', '[data-product-share-toggle]', (event) => {
      this._toggleShareButtons(event);
    });
  }

  /**
   * Bind product options changes.
   */
  _bindProductOptionChange() {
    this.productOptionHandler = (event, changedOption) => {
      const $changedOption = $(changedOption);
      const $form = $changedOption.parents('form');

      if (event && $(event.target).hasClass('form-rectangle')) {
        $(event.target).parents('.form-field-control').find('.rectangle').removeClass('active');
        $(event.target).parents('.rectangle').addClass('active');
      }

      // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
      if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
        return;
      }

      utils.api.productAttributes.optionChange(this.productId, $form.serialize(), 'product/product-single-details', (err, response) => {
        this.cartAddAlert.clear();
        const productAttributesData = response.data || {};
        const productAttributesContent = response.content || {};

        this.attributesHelper.updateAttributes(productAttributesData);
        this._updateView(productAttributesData);
        this.setProductVariant();
      });
    };

    utils.hooks.on('product-option-change', this.productOptionHandler);
  }

  /**
   * Add a product to cart
   */
  _bindCartAdd(event, form) {
    event.preventDefault();

    // Do not do AJAX if browser doesn't support FormData
    if (window.FormData === undefined) { return; }

    const formData = new FormData(form);

    this.callbacks.willUpdate($(form));

    // Add item to cart
    utils.api.cart.itemAdd(this.filterEmptyFilesFromForm(formData), (err, response) => {
      let isError = false;

      if (err || response.data.error) {
        isError = true;
        response = err || response.data.error;
      } else {
        utils.api.cart.getContent({template: 'cart/cart-preview/cart-preview'}, (err, response) => {
          $('[data-cart-preview]').html(response);
          new CartPreview('[data-cart-preview]');
        });
      }

      this._updateMessage(isError, response);
      this.callbacks.didUpdate(isError, response, $(form));
    });
  }

  _updateView(data) {
    const viewModel = this._getViewModel(this.$el);

    // updating price
    if (viewModel.$price.length) {
      const priceStrings = {
        price: data.price,
        excludingTax: this.context.productExcludingTax,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$price.html(this.options.priceWithoutTaxTemplate(priceStrings));
    }

    if (viewModel.$priceWithTax.length) {
      const priceStrings = {
        price: data.price,
        includingTax: this.context.productIncludingTax,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$priceWithTax.html(this.options.priceWithTaxTemplate(priceStrings));
    }

    if (viewModel.$saved.length) {
      const priceStrings = {
        price: data.price,
        savedString: this.context.productYouSave,
      };
      viewModel.$saved.html(this.options.priceSavedTemplate(priceStrings));
    }

    // stock
    if (data.stock) {
      viewModel.stock.$selector.removeClass('product-details-hidden');
      viewModel.stock.$level.text(data.stock);
    } else {
      viewModel.stock.$selector.addClass('product-details-hidden');
      viewModel.stock.$level.text('0');
    }

    // update sku if exists
    if (viewModel.$sku.length) {
      viewModel.$sku.html(data.sku);
    }

    // update weight if exists
    if (viewModel.$weight.length && data.weight) {
      viewModel.$weight.html(data.weight.formatted);
    }

    // handle product variant image if exists
    if (data.image) {
      this.callbacks.switchImage(data.image);
    }

    this.cartOptionAlert.clear();

    // update submit button state
    if (!data.purchasable || !data.instock) {
      if ($('[data-product-quantity]').is(':visible')) {
        this.cartOptionAlert.error(data.purchasing_message);
      }
      viewModel.$addToCart
        .addClass(this.buttonDisabledClass)
        .prop('disabled', true)
        .children('[data-button-text]')
        .text(this.context.unavailable);
    } else {
      let buttonText = this.context.addToCart;
      if (viewModel.$addToCart.is('[data-button-preorder]')) {
        buttonText = this.context.preOrder;
      }
      viewModel.$addToCart
        .removeClass(this.buttonDisabledClass)
        .prop('disabled', false)
        .children('[data-button-text]')
        .text(buttonText);
    }
  }

  /**
   * Validate and update quantity input value
   */
  _updateQuantity(event) {
    const $target = $(event.currentTarget);
    const $quantity = $target.closest('[data-product-quantity]').find('[data-product-quantity-input]');
    const min = parseInt($quantity.prop('min'), 10);
    const max = parseInt($quantity.prop('max'), 10);
    let newQuantity = parseInt($quantity.val(), 10);

    this.cartAddAlert.clear();
    this.cartOptionAlert.clear();

    if ($target.is('[data-quantity-increment]') && (!max || newQuantity < max)) {
      newQuantity = newQuantity + 1;
    } else if ($target.is('[data-quantity-decrement]') && newQuantity > min) {
      newQuantity = newQuantity - 1;
    }

    $quantity.val(newQuantity);
  }

  /**
   * interpret and display cart-add response message
   */
  _updateMessage(isError, response) {
    this.cartAddAlert.clear();

    let message = '';

    if (isError) {
      message = response;
    } else {
      message = this.context.addSuccess;
      message = message
                  .replace('*product*', this.$el.find('[data-product-details]').data('product-title'))
                  .replace('*cart_link*', `<a href=${this.context.urlsCart}>${this.context.cartLink}</a>`)
                  .replace('*continue_link*', `<a href='/'>${this.context.homeLink}</a>`)
                  .replace('*checkout_link*', `<a href=${this.context.urlsCheckout}>${this.context.checkoutLink}</a>`);
    }

    this.cartAddAlert.message(message, (isError ? 'error' : 'success'));
  }

  _toggleAccordion(event) {
    const $toggle = $(event.currentTarget);
    const $container = $toggle.parents('[data-accordion-container]');
    const $icon = $toggle.find('.accordion-toggle');

    if ($container.length) {
      const $content = $container.find('[data-accordion-content]');
      $content.revealer();
      $icon.html('<svg><use xlink:href="#icon-minus"></use></svg>');

      if ($content.hasClass('visible')) {
        $icon.html('<svg><use xlink:href="#icon-plus"></use></svg>');
      }
    }
  }

  _toggleShareButtons(event) {
    event.preventDefault();
    const $target = $(event.currentTarget);
    const $shareButtons = $target.next();

    if ($shareButtons.length > 0) {
      $shareButtons.revealer();
    }
  }

  setProductVariant() {
    const unsatisfiedRequiredFields = [];
    const options = [];

    $.each($('[data-product-attribute]'), (index, value) => {
      const optionLabel = value.children[0].innerText;
      const optionTitle = optionLabel.split(':')[0].trim();
      const required = optionLabel.toLowerCase().includes('required');
      const type = value.getAttribute('data-product-attribute');

      if (
        (type === 'input-file' || type === 'input-text' || type === 'input-number')
        && value.querySelector('input').value === '' && required
      ) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'date') {
        const isSatisfied = Array.from(value.querySelectorAll('select')).every((select) => select.selectedIndex !== 0);

        if (isSatisfied) {
          const dateString = Array.from(value.querySelectorAll('select')).map((x) => x.value).join('-');
          options.push(`${optionTitle}:${dateString}`);
          return;
        }

        if (required) {
            unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-select') {
        const select = value.querySelector('select');
        const selectedIndex = select.selectedIndex;

        if (selectedIndex !== 0) {
          options.push(`${optionTitle}:${select.options[selectedIndex].innerText}`);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (
        type === 'set-rectangle'
        || type === 'set-radio'
        || type === 'swatch'
        || type === 'input-checkbox'
        || type === 'product-list'
      ) {
        const checked = value.querySelector(':checked');
        if (checked) {
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            const label = checked.labels[0].innerText;

            if (label) {
              options.push(`${optionTitle}:${label}`);
            }
          }

          if (type === 'swatch') {
            const label = checked.labels[0].children[0];

            if (label) {
              options.push(`${optionTitle}:${label.title}`);
            }
          }

          if (type === 'input-checkbox') {
            options.push(`${optionTitle}:Yes`);
          }

          return;
        }

        if (type === 'input-checkbox') {
          options.push(`${optionTitle}:No`);
        }

        if (required) {
            unsatisfiedRequiredFields.push(value);
        }
      }
    });

    let productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    const view = $('.product-details');

    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        const productName = view.find('.product-title')[0].innerText;
        const card = $(`[data-name="${productName}"]`);
        card.attr('data-product-variant', productVariant);
      }
    }
  }
}
