import $ from 'jquery';
import trend from 'jquery-trend';

export default class LoadingUtils {
  constructor(options, scrollLock, el) {
    this.scrollLock = scrollLock;
    this.$body = $(document.body);
    this.$el = el ? $(el) : this.$body;

    this.options = $.extend({
      loadingMarkup: '<div class="loading"><span class="loading-spinner"></span></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    }, options);

    this.$loading = $(this.options.loadingMarkup);
  }

  show() {
    if (this.scrollLock) {
      this.$body.addClass(this.options.scrollLockClass);
    }

    const elementPositioning = this.$el.css('position');

    if (elementPositioning === 'static') {
      this.$el.css('position', 'relative')
    }

    this.$el.prepend(this.$loading);

    setTimeout(() => {
      this.$loading.addClass(this.options.visibleClass);
    }, 10);
  }

  hide() {
    if (this.scrollLock) {
      this.$body.removeClass(this.options.scrollLockClass);
    }

    this.$loading.removeClass(this.options.visibleClass).one('trend', () => {
      this.$loading.remove();
    });
  }
}
