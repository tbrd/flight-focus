'use strict';

describeComponent('lib/focus_controller', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

	it('should listen for focus-request and trigger focus-taken', function () {
		var spy = spyOnEvent(this.$node, 'focus-taken');
		this.$node.trigger('focus-request', {
			id: 1
		});
		expect(spy).toHaveBeenTriggeredOn(this.$node);
		expect(spy.callCount).toBe(1);
		expect(spy.mostRecentCall.data).toEqual({
			id: 1
		});
	});
  
  describe('should listen for focus-release', function () {
  	it('and throw error if not in focus chain', function () {
  		function focusRelease() {
  			this.$node.trigger('focus-release', {
  				id: 1
  			});
  		}
  		expect(focusRelease).toThrow();
  	});
  	it('and not throw if last item in focus chain', function () {
  		this.$node.trigger('focus-request', {
  			id: 1
  		});
  		this.$node.trigger('focus-request', {
  			id: 2
  		});
  		function focusRelease() {
  			this.$node.trigger('focus-release', {
  				id: 1
  			});
  		}
  		expect(focusRelease).toThrow();
  	});
  	it('and trigger focus-taken if more than one item in chain', function () {
			this.$node.trigger('focus-request', {
  			id: 1
  		});
  		this.$node.trigger('focus-request', {
  			id: 2
  		});
  		var spy = spyOnEvent(this.$node, 'focus-taken');
			this.$node.trigger('focus-release', {
				id: 2
			});
  		expect(spy).toHaveBeenTriggeredOn(this.$node);
  		expect(spy.callCount).toBe(1);
  		expect(spy.mostRecentCall.data).toEqual({
  			id: 1
  		});
  	});

  });

});
