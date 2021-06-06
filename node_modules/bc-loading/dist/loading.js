'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _jqueryTrend = require('jquery-trend');

var _jqueryTrend2 = _interopRequireDefault(_jqueryTrend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadingUtils = function () {
  function LoadingUtils(options, scrollLock, el) {
    _classCallCheck(this, LoadingUtils);

    this.scrollLock = scrollLock;
    this.$body = (0, _jquery2.default)(document.body);
    this.$el = el ? (0, _jquery2.default)(el) : this.$body;

    this.options = _jquery2.default.extend({
      loadingMarkup: '<div class="loading"><span class="loading-spinner"></span></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked'
    }, options);

    this.$loading = (0, _jquery2.default)(this.options.loadingMarkup);
  }

  _createClass(LoadingUtils, [{
    key: 'show',
    value: function show() {
      var _this = this;

      if (this.scrollLock) {
        this.$body.addClass(this.options.scrollLockClass);
      }

      var elementPositioning = this.$el.css('position');

      if (elementPositioning === 'static') {
        this.$el.css('position', 'relative');
      }

      this.$el.prepend(this.$loading);

      setTimeout(function () {
        _this.$loading.addClass(_this.options.visibleClass);
      }, 10);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      if (this.scrollLock) {
        this.$body.removeClass(this.options.scrollLockClass);
      }

      this.$loading.removeClass(this.options.visibleClass).one('trend', function () {
        _this2.$loading.remove();
      });
    }
  }]);

  return LoadingUtils;
}();

exports.default = LoadingUtils;