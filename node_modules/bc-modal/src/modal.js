import $ from 'jquery';
import trend from 'jquery-trend';
import revealer from 'jquery-revealer';
import debounce from 'just-debounce';

export default class Modal {
  constructor(options) {
    this.$modal;
    this.$modalContent;
    this.$dialog;
    this.$body = $('body');
    this.$el = $(options.el);
    this.$backdrop = $('<div class="modal-overlay">');

    this.options = $.extend(
      {
        modalId: 'modal',
        modalClass: '',
        bodyOverflowClass: 'scroll-locked',
        centerVertically: true,
        closeSelector: '.modal-close',
        afterShow: () => {},
        afterHide: () => {},
      },
      options
    );

    this.wrapperHtml = `<div id="${this.options.modalId}" class="modal-wrapper" tabindex="-1" role="dialog"><div class="${this.options.modalClass} modal" role="document"><div class="modal-content">`;
  }

  /**
   * set up our fresh modal element
   */
  _init() {
    // get the contents
    this.$modalContent = this.$el.children().detach();
    // create a new wrapping element
    this.$modal = $(this.wrapperHtml);
    // pop our content in there
    this.$modal.find('.modal-content').append(this.$modalContent);
    // add backdrop
    this.$backdrop.appendTo(this.$body);
  }

  /**
   * Put everything back where they used to be
   */
  _reset() {
    this.$modal.detach();
    this.$el.append(this.$modalContent);
  }

  /**
   * Show both the modal and backdrop
   */
  _open() {
    this._init();
    this._bindOverlayClick();
    this._bindCloseClick();
    this._bindCloseEsc();

    this.$body.addClass(this.options.bodyOverflowClass).append(this.$modal);

    if (this.options.centerVertically) {
      this.$dialog = this.$modal.find('.modal');
      this._bindResize();

      // position modal for the first time just after it's been unhidden
      this.$modal.one('revealer-animating', () => {
        this._reposition();
      });
    }

    // bind callback function
    this.$modal.one('revealer-show', (event) => {
      this.options.afterShow($(event.currentTarget));
    });

    // show both modal & backdrop
    this.$modal.add(this.$backdrop).revealer('show');

    // set up backdrop removal on hide
    this.$backdrop.on('revealer-hide', () => {
      this.$backdrop.remove();
      this.options.afterHide();
    });
  }

  /**
   * Hide  both the modal and backdrop
   */
  _close() {
    this.$modal.add(this.$backdrop).revealer('hide');

    this.$body.removeClass(this.options.bodyOverflowClass);

    this._unbindResize();
    this._reset();
  }

  /**
   * close modal if we click only on backdrop
   */
  _bindOverlayClick() {
    this.$modal.on('click', (event) => {
      if (event.target === event.currentTarget) {
        this._close();
      }
    });
  }

  /**
   * close modal if we click on a close button
   */
  _bindCloseClick() {
    this.$modal.on('click', this.options.closeSelector, (event) => {
      event.preventDefault();
      this._close();
    });
  }

  /**
   * close modal if we press the escape button when it's visible
   */
  _bindCloseEsc() {
    $(document).on('keyup', (event) => {
      if (event.keyCode === 27 && this.$modal.revealer('isVisible')) {
        event.preventDefault();
        this._close();
      }
    });
  }

  // -------------------------- Positioning -------------------------- //

  /**
   * calculate margin-top for element
   */
  _reposition() {
    if (!this.$dialog || !this.options.centerVertically) {
      return;
    }

    const elHeight = this.$dialog.outerHeight();
    const windowHeight = $(window).height();
    let diff = (windowHeight - elHeight) / 2;

    diff = diff < 0 ? 0 : diff;

    this.$dialog.css('margin-top', diff);
  }

  _bindResize() {
    $(window).on(
      'resize.modal',
      debounce(() => {
        this._reposition.bind(this);
      }, 100)
    );
  }

  _unbindResize() {
    $(window).off('resize.modal');
  }

  // -------------------------- Expose Public Methods -------------------------- //

  open() {
    this._open();
  }

  close() {
    this._close();
  }

  position() {
    this._reposition();
  }
}
