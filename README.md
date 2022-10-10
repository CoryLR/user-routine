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

You can either download this Repo and import the Class:

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
    * Actions: `click`, `exists`, `includes`, `log`, `nav`, `value`, `write`
    * Selector: CSS selector like `button.class-name`
    * Data: Argument for `value`, `write`, `includes`, and `log`
* 2: Options (optional): Object
  * `continueOnFailure`: (default: false) Continue to run actions even if one fails
  * `done`: Callback function to run once complete
  * `globalDelay`: (default: 500) time between actions in milliseconds
  * `logUpdates`: (default: true) Show progress in the browser console
  * `message`: (default: '') Text to show while the text runs
  * `messageShowInDOM`: (default: false) Show the message visually on the page
  * `messageStyle`: Override the default message style

# Multiple sequential tests

You can also run multiple `spaCheck`s sequentially using async/await, see the [spa-check.template.js](./spa-check.template.js) for an example.

## Examples

Fill inputs with `value` and interact with `click` using Selectors:

```javascript
spaCheck([
  'value input[type="text"] Hello, world!',
  'value input[type="number"] 20',
  'click button.some-class',
]);
```

Navigate within a page using `nav` followed by an ID or hash routing path, if applicable:

```javascript
spaCheck([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

Validate the DOM with `exists` and `includes`:

```javascript
spaCheck([
  'exists div.some-class',
  '', // Leave some extra time
  'includes p.output some text we want to make sure exists',
]);
```

Add notes with `write` and `log`:

```javascript
spaCheck([
  'write h1  - Testing successful!', // adds to the end
  'log The testing is complete.',
]);
```

You can also pass options as a second argument:

```javascript
spaCheck([
  'value input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// Options object with 1 second between actions
```

# Development

* To run the tests, use `npm install` to and then run `npm run testsBuild`
