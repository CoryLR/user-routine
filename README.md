# SPA Check

Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, check if things exist, etc.

# Access

Options:

1. Install using `npm install --save-dev spa-check` and import:

```javascript
import { spaCheck } from 'spa-check';
// or
const { spaCheck } = require('spa-check');
```

2. Or copy-paste the portable template from [spa-check.template.js](./spa-check.template.js) (works if you paste into the a browser console)

# Usage

SPA Check is served as a function named `spaCheck`. Example:

```javascript
spaCheck(
  ['value .myform>input Hello', 'click button.myclass'], // Actions
  { message: 'Example: Submit form', globalDelay: 1000 } // Options
);
```

Input details:

* Parameter 1: Actions (Array of strings like `['action selector? data?']`, can also substitute a function for custom actions)
  * Action keywords:
    * `append`, e.g. `'append p  - Appended text'`
    * `await`, e.g. `'await .modal.success-message'` or `'await h1 With This Text'`
    * `click`, e.g. `'click button.submit'` or `'click button With This Text'`
    * `exists`, e.g. `'exists .class-name'` or `'exists h1 With This Text'`
    * `log`, e.g. `'log Some message'`
    * `nav`, e.g. `'nav #id'` or `'nav #/some/hash/routing/path'`
    * `value`, e.g. `'value form>input.name Cory Rahman'`
    * `wait`, e.g. `'wait 3000'` (3 seconds)
    * `write`, e.g. `'write p Overwritten text'`
  * Selector: CSS selector like `button.class-name` (should not contain spaces)
  * Data: Argument for `value`, `write`, `log`, and optionally `exists` and `await`
* Parameter 2: Options (Object, optional)
  * `awaitTimeout`: (default: 15000) How long in milliseconds to wait for an element using the await command
  * `continueOnFailure`: (default: false) Continue to run actions even if one fails
  * `globalDelay`: (default: 500) time between actions in milliseconds
  * `logCollapse`: (default: false) Initializes the console group collapsed
  * `logResult`: (default: true) Show the final result in the browser console
  * `logUpdates`: (default: true) Show real-time progress in the browser console
  * `message`: (default: '') Label to show in the console and optionally in the DOM
  * `messageShowInDOM`: (default: false) Show the message visually on the page / DOM
  * `messageStyle`: Override the default message style when showing the message in the DOM

Output details:

* The `spaCheck` function returns type `SpaCheckReturn`:
  * `export type SpaCheckReturn = { success: boolean, log: string[], message: string };`
* Updates are also logged to the browser console like so:

```
[SPA Check] Message
  * Set the value of form>input.name to 'Cory'
  * Clicked on button[type="submit"]
  * Awaiting 'div.success-message'...
  * ...Found 'div.success-message'
  * Done, success: true
  Result: { success: true, log: Array(4), message: 'Message' }
```

# Examples

## Template

See the [spa-check.template.js](./spa-check.template.js) for examples of running multiple sequential tests using async/await.

## Use-cases

### Fill inputs with `value` and interact with `click` using Selectors:

```javascript
spaCheck([
  'value input[type="text"] Hello, world!', // Fills in the input
  'value input[type="number"] 20',
  'click button.some-class', // Clicks a button with class 'some-class'
  'click div With certain text', // Clicks on the given text within a div
  'click * With certain text', // Clicks on the given text regardless of containing element
]);
```

* Note: Don't include spaces in the CSS Selectors

### Validate the DOM with `exists`:

```javascript
spaCheck([
  'exists p.some-class', // Checks for the existance of this selector
  'exists p.some-class With certain text', // Also checks if it includes certain text
]);
```

### Deal with timing using `await` and `wait`:

```javascript
spaCheck([
  'await div.some-popup', // Awaits the existance of this selector
  'await div.some-popup With certain text', // Also waits for it to include certain text
  'wait 3000', // waits 3 seconds
]);
```

* Note: The default await timeout is 15000 ms (15 seconds), overwrite using the `awaitTimeout` option.

### Navigate within a single-page application using `nav`:

```javascript
spaCheck([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

### Add notes with `append`, `log`, and `write`:

```javascript
spaCheck([
  'write h1 Testing successful!', // overwrites the h1's textContent
  'append h1  - Testing successful!', // appends to the h1's textContent
  'log The testing is complete.',
]);
```

### Pass options as a second argument:

```javascript
spaCheck([
  'value input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// ^ Options object with 1 second between actions
```

* Note: See [Usage](#Usage) for a list of options

# Development

* To run the tests, use `npm install` to and then run `npm run build` and open up the `test/test.html` file

## Maintainers

To publish:

1. Bump the version number in the [package.json](./package.json)
2. `npm i`
3. `npm run build`
4. Test one last time
5. `npm publish --access public`
