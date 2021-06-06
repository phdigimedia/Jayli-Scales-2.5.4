import utils from '@bigcommerce/stencil-utils';
import Modal from 'bc-modal';
import AttributesHelper from '../product/AttributesHelper';
import initFormSwatch from '../core/formSelectedValue';
import SelectWrapper from '../components/SelectWrapper';
import LoadingOverlay from '../components/LoadingOverlay';

export default class CartEditOptions {
  constructor(context) {
    this.context = context;
    this.el = '.cart-options-modal';
    this.$el = $('body').find(this.el);
    this.id = null;
    this.$cartContent = $('[data-cart-content]');
    this.$editOptionsLoading = this.$cartContent.find('[data-loading-overlay]');

    this.cartOptionsModal = new Modal({
      el: this.$el,
      modalClass: 'cart-options-modal',
      afterShow: ($modal) => {
        this._fetchProduct($modal, this.id);
      },
    });

    // Abstracted attributes functionality
    this.attributesHelper = new AttributesHelper('#CartEditProductFieldsForm');

    this._bindEvents();
  }

  _bindEvents() {
    $('body').on('click', '[data-item-edit]', (event) => {
      event.preventDefault();

      this.id = $(event.currentTarget).data('item-edit');

      if (!this.id) { return; }

      this.cartOptionsModal.open();
    });

    $('body').on('click', '[data-edit-options-close]', (event) => {
      this.cartOptionsModal.close();

    });
  }

  /**
   * Run ajax fetch of product and add to modal. Bind product functionality and show the modal
   * @param {jQuery} $modal - the root (appended) modal element.
   * @param {string} $itemId - product id
   */
  _fetchProduct($modal, $itemID) {
    const options = {
      template: 'cart/edit-options',
    };

    const $modalWrapper = $('.cart-options-modal').parents('.modal-wrapper');
    LoadingOverlay($modalWrapper, this.$editOptionsLoading);


    utils.api.productAttributes.configureInCart($itemID, options, (err, response) => {
      $modal
        .find('.modal-content')
        .append(response.content)
        .find('.cart-edit-options')
        .addClass('cart-edit-options-visible');

      LoadingOverlay($modalWrapper, this.$editOptionsLoading);

      initFormSwatch();

      if ($('.cart-options-modal select').length) {
        const $select = $('.cart-options-modal select');
        $select.each((i, el) => {
          new SelectWrapper(el);
        });
      }

      this.cartOptionsModal.position();
      $modal.addClass('loaded');

      $modal.find('[data-swatch-selector] input:checked').click();

      utils.hooks.on('product-option-change', (event, option) => {
        const $changedOption = $(option);
        const $form = $('#CartEditProductFieldsForm');
        const $submit = $('input[type="submit"]', $form);
        const $messageBox = $('[data-reconfigure-errors]');
        const item = $('[name="item_id"]', $form).attr('value');

        utils.api.productAttributes.optionChange(item, $form.serialize(), 'cart/edit-options', (err, result) => {
          const data = result.data || {};

          this.attributesHelper.updateAttributes(data);

          if (data.purchasing_message) {
            $($messageBox).html(data.purchasing_message);
            $submit.prop('disabled', true);
            $messageBox.show();
          } else {
            $submit.prop('disabled', false);
            $messageBox.hide();
          }

          if (!data.purchasable || !data.instock) {
            $submit.prop('disabled', true);
          } else {
            $submit.prop('disabled', false);
          }
        })
      });

      utils.hooks.emit('product-option-change');
    })
  }
}
