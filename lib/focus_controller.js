define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(focusController);

  /**
   * Module function
   */

  function focusController() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {
      this.focusChain = [];
      this.on('focus-release', this.handleFocusRelease);
      this.on('focus-request', this.handleFocusRequest);
    });

    this.handleFocusRequest = function (event, data) {
      // dedupe chain
      if (this.focusChain[this.focusChain.length] !== data.id) {
        this.focusChain.push(data.id);
      }
      this.trigger('focus-taken', data);
    };

    this.handleFocusRelease = function (event, data) {
      // remove last focus item from chain
      if (this.focusChain.length > 0) {
        var currentFocus = this.focusChain[this.focusChain.length -1];
        if (currentFocus !== data.id) {
          throw new Error('Focus release out of sequence');
        } else {
          this.focusChain.pop();
        }
      }
      if (this.focusChain.length > 0) {
        this.trigger('focus-taken', {
          id: this.focusChain[this.focusChain.length - 1]
        });
      }
    }
  }
});
