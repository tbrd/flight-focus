# flight-focus

A [Flight](https://github.com/flightjs/flight) utility to manage component focus. Useful when determining which component should responsd to browser events such as keypress, gestures, etc.

## Installation

```bash
bower install --save flight-focus
```

## Example

You need to use both the controller and the mixin. It is not possible to have more than one focus controller per page.

```javascript
var focusController = require('focus-controller/lib/focus_controller');
focusController.attachTo(document);

var aComponentWithFocus = defineComponent(aComponent, withFocus);

function aComponent() {
  this.after('initialize', function () {
    // init key event
    this.on('keydown', this.handleKeydown);
    // request focus
    this.focusRequest();
  });

  this.handleKeydown = function (event) {
    if (this.hasFocus) {
      // do something
    }
  };
}
```
## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
