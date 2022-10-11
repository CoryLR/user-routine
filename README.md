# SPA Check

Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, check if things exist, etc.

# Access

Options:

1) Install using `npm install --save-dev spa-check`

```javascript
import { spaCheck } from 'spa-check';
// or
const { spaCheck } = require('spa-check');
```

2) Or copy-paste the portable template from [spa-check.template.js](./spa-check.template.js) (works if you paste into the a browser console)

# Usage

SPA Check is served as a function named `spaCheck`. Example:

```javascript
spaCheck(
  ['value .myform>input Hello', 'click button.myclass'], // Actions
  { message: 'Example: Submit form', globalDelay: 1000 } // Options
);
```

Parameter details:

* 1: Action List: Array of strings or functions
  * If using string, separate parts by spaces like so: `['action selector data']`
    * Action strings:
      * `await`, e.g. `'await .modal.success-message'` or `'await h1 With This Text'`
      * `click`, e.g. `'click button.submit'`
      * `exists`, e.g. `'exists .class-name'` or `'exists h1 With This Text'`
      * `log`, e.g. `'log Some message'`
      * `nav`, e.g. `'nav #id'` or `'nav #/some/hash/routing/path'`
      * `value`, e.g. `'value form>input.name Cory Rahman'`
      * `wait`, e.g. `'wait 3000'` (3 seconds)
      * `write`, e.g. `'write p  - Adding some text'`
    * Selector: CSS selector like `button.class-name`, should not contain spaces
    * Data: Argument for `value`, `write`, `log`, and optionally `exists`
* 2: Options (optional): Object
  * `awaitTimeout`: (default: 15000) How long in milliseconds to wait for an element using the await command
  * `continueOnFailure`: (default: false) Continue to run actions even if one fails
  * `globalDelay`: (default: 500) time between actions in milliseconds
  * `logUpdates`: (default: true) Show progress in the browser console
  * `message`: (default: '') Text to show while the text runs
  * `messageShowInDOM`: (default: false) Show the message visually on the page
  * `messageStyle`: Override the default message style

# Multiple sequential tests

You can also run multiple `spaCheck`s sequentially using async/await, see the [spa-check.template.js](./spa-check.template.js) for an example.

## Examples

### Fill inputs with `value` and interact with `click` using Selectors:

```javascript
spaCheck([
  'value input[type="text"] Hello, world!', // Fills in the input
  'value input[type="number"] 20',
  'click button.some-class', // Clicks a button
]);
```

* Note: Don't include spaces in the CSS Selectors

### Validate the DOM with `exists`:

```javascript
spaCheck([
  'exists p.some-class', // Checks for the existance of this selector
  'exists p.some-class With this text', // Also checks if it includes some text
]);
```

### Deal with timing using `await` and `wait`:

```javascript
spaCheck([
  'exists div.some-popup', // Awaits the existance of this selector
  'exists div.some-popup With this text', // Also waits for it to include some text
  'wait 3000', // waits 3 seconds
]);
```

* Note: The default await timeout is 15000 ms (15 seconds), overwrite using the `awaitTimeout` option.

### Navigate within a page using `nav`:

```javascript
spaCheck([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

### Add notes with `write` and `log`:

```javascript
spaCheck([
  'write h1  - Testing successful!', // adds to the end
  'log The testing is complete.',
]);
```

### Pass options as a second argument:

```javascript
spaCheck([
  'value input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// Options object with 1 second between actions
```

# Development

* To run the tests, use `npm install` to and then run `npm run build` and open up the `test/test.html` file

## Maintainers

To publish:

1. Bump the version number in the [package.json](./package.json)
2. `npm i`
3. `npm run build`
4. `npm publish --access public`
