define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withFocus;

  /**
   * Module function
   */

  function withFocus() {
    this.defaultAttrs({
      // set hasFocus to true to take focus when
      // the component is initialized
      hasFocus: false
    });

    this.after('initialize', function () {
      this.on(document, 'focus-taken', this.focusHandleTaken);
      if (this.attr.hasFocus) {
        this.requestFocus(this.identity);
      }
    });

    this.before('teardown', function () {
      if (this.hasFocus) {
        this.focusRelease();
      }
    });

    this.focusHandleTaken = function (event, data) {
      if (data.id === this.identity) {
        this.hasFocus = true;
      } else {
        this.hasFocus = false;
      }
    };

    this.focusRequest = function () {
      this.trigger('focus-request', {
        id: this.identity
      });
    };

    this.focusRelease = function () {
      this.trigger('focus-release', {
        id: this.identity
      });
    };
  }

});
