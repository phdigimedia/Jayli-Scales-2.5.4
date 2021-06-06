'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _jqueryTrend = require('jquery-trend');

var _jqueryTrend2 = _interopRequireDefault(_jqueryTrend);

var _jqueryRevealer = require('jquery-revealer');

var _jqueryRevealer2 = _interopRequireDefault(_jqueryRevealer);

var _justDebounce = require('just-debounce');

var _justDebounce2 = _interopRequireDefault(_justDebounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
  function Modal(options) {
    _classCallCheck(this, Modal);

    this.$modal;
    this.$modalContent;
    this.$dialog;
    this.$body = (0, _jquery2.default)('body');
    this.$el = (0, _jquery2.default)(options.el);
    this.$backdrop = (0, _jquery2.default)('<div class="modal-overlay">');

    this.options = _jquery2.default.extend({
      modalId: 'modal',
      modalClass: '',
      bodyOverflowClass: 'scroll-locked',
      centerVertically: true,
      closeSelector: '.modal-close',
      afterShow: function afterShow() {},
      afterHide: function afterHide() {}
    }, options);

    this.wrapperHtml = '<div id="' + this.options.modalId + '" class="modal-wrapper" tabindex="-1" role="dialog"><div class="' + this.options.modalClass + ' modal" role="document"><div class="modal-content">';
  }

  /**
   * set up our fresh modal element
   */


  _createClass(Modal, [{
    key: '_init',
    value: function _init() {
      // get the contents
      this.$modalContent = this.$el.children().detach();
      // create a new wrapping element
      this.$modal = (0, _jquery2.default)(this.wrapperHtml);
      // pop our content in there
      this.$modal.find('.modal-content').append(this.$modalContent);
      // add backdrop
      this.$backdrop.appendTo(this.$body);
    }

    /**
     * Put everything back where they used to be
     */

  }, {
    key: '_reset',
    value: function _reset() {
      this.$modal.detach();
      this.$el.append(this.$modalContent);
    }

    /**
     * Show both the modal and backdrop
     */

  }, {
    key: '_open',
    value: function _open() {
      var _this = this;

      this._init();
      this._bindOverlayClick();
      this._bindCloseClick();
      this._bindCloseEsc();

      this.$body.addClass(this.options.bodyOverflowClass).append(this.$modal);

      if (this.options.centerVertically) {
        this.$dialog = this.$modal.find('.modal');
        this._bindResize();

        // position modal for the first time just after it's been unhidden
        this.$modal.one('revealer-animating', function () {
          _this._reposition();
        });
      }

      // bind callback function
      this.$modal.one('revealer-show', function (event) {
        _this.options.afterShow((0, _jquery2.default)(event.currentTarget));
      });

      // show both modal & backdrop
      this.$modal.add(this.$backdrop).revealer('show');

      // set up backdrop removal on hide
      this.$backdrop.on('revealer-hide', function () {
        _this.$backdrop.remove();
        _this.options.afterHide();
      });
    }

    /**
     * Hide  both the modal and backdrop
     */

  }, {
    key: '_close',
    value: function _close() {
      this.$modal.add(this.$backdrop).revealer('hide');

      this.$body.removeClass(this.options.bodyOverflowClass);

      this._unbindResize();
      this._reset();
    }

    /**
     * close modal if we click only on backdrop
     */

  }, {
    key: '_bindOverlayClick',
    value: function _bindOverlayClick() {
      var _this2 = this;

      this.$modal.on('click', function (event) {
        if (event.target === event.currentTarget) {
          _this2._close();
        }
      });
    }

    /**
     * close modal if we click on a close button
     */

  }, {
    key: '_bindCloseClick',
    value: function _bindCloseClick() {
      var _this3 = this;

      this.$modal.on('click', this.options.closeSelector, function (event) {
        event.preventDefault();
        _this3._close();
      });
    }

    /**
     * close modal if we press the escape button when it's visible
     */

  }, {
    key: '_bindCloseEsc',
    value: function _bindCloseEsc() {
      var _this4 = this;

      (0, _jquery2.default)(document).on('keyup', function (event) {
        if (event.keyCode === 27 && _this4.$modal.revealer('isVisible')) {
          event.preventDefault();
          _this4._close();
        }
      });
    }

    // -------------------------- Positioning -------------------------- //

    /**
     * calculate margin-top for element
     */

  }, {
    key: '_reposition',
    value: function _reposition() {
      if (!this.$dialog || !this.options.centerVertically) {
        return;
      }

      var elHeight = this.$dialog.outerHeight();
      var windowHeight = (0, _jquery2.default)(window).height();
      var diff = (windowHeight - elHeight) / 2;

      diff = diff < 0 ? 0 : diff;

      this.$dialog.css('margin-top', diff);
    }
  }, {
    key: '_bindResize',
    value: function _bindResize() {
      var _this5 = this;

      (0, _jquery2.default)(window).on('resize.modal', (0, _justDebounce2.default)(function () {
        _this5._reposition.bind(_this5);
      }, 100));
    }
  }, {
    key: '_unbindResize',
    value: function _unbindResize() {
      (0, _jquery2.default)(window).off('resize.modal');
    }

    // -------------------------- Expose Public Methods -------------------------- //

  }, {
    key: 'open',
    value: function open() {
      this._open();
    }
  }, {
    key: 'close',
    value: function close() {
      this._close();
    }
  }, {
    key: 'position',
    value: function position() {
      this._reposition();
    }
  }]);

  return Modal;
}();

exports.default = Modal;