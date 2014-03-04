'use strict';

describeMixin('lib/with_focus', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('focusRequest should trigger focus-request', function () {
  	var spy = spyOnEvent(this.$node, 'focus-request');
  	this.component.focusRequest();
  	expect(spy).toHaveBeenTriggeredOn(this.$node);
  	expect(spy.callCount).toBe(1);
  	expect(spy.mostRecentCall.data).toEqual({
  		id: this.component.identity
  	});
  });

  it('focusRelease should trigger focus-release', function () {
  	var spy = spyOnEvent(this.$node, 'focus-release');
  	this.component.focusRelease();
  	expect(spy).toHaveBeenTriggeredOn(this.$node);
  	expect(spy.callCount).toBe(1);
  	expect(spy.mostRecentCall.data).toEqual({
  		id: this.component.identity
  	});
  });

  describe('should listen for focus-taken on document and set hasFocus', function () {
  	it('to true if id matches component identity', function () {
  		$(document).trigger('focus-taken', {
  			id: this.component.identity
  		});
  		expect(this.component.hasFocus).toBe(true);
  	});
  	it('to false if id matches component identity', function () {
			$(document).trigger('focus-taken', {
  			id: 'fish'
  		});
  		expect(this.component.hasFocus).toBe(false);
  	});
  });

  it('should trigger focus-release before teardown if component has focus', function () {
  	var spy = spyOnEvent(document, 'focus-release');
  	var id = this.component.identity;
  	this.component.hasFocus = true;
  	this.component.teardown();
  	expect(spy).toHaveBeenTriggeredOn(document);
  	expect(spy.callCount).toBe(1);
  	expect(spy.mostRecentCall.data).toEqual({
  		id: id
  	});
  });

});
