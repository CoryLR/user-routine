# SPA Check

Automated testing for single-page applications (SPAs). Small, easy to use, and zero setup. Click on things, fill in values, await for things exist, etc.

# Access

Options:

**1.** Install using `npm install --save-dev spa-check` and import:

```javascript
import { spaCheck } from 'spa-check';
// or
const { spaCheck } = require('spa-check');
```

**2.** Or copy the portable template from here: [spa-check.template.js](./spa-check.template.js)
* This works with zero setup if you copy-paste the contents into a browser console or into client-side JavaScript

# Usage

SPA Check is served as a function named `spaCheck`.

Example:

```javascript
spaCheck([
  'click button',
  'await .result Result Text'
]);
```

You can also add options:

```javascript
spaCheck(
  ['click button', 'await .result Result Text'], // Actions
  { message:'Example Test', globalDelay: 1000 }, // Options
);
```

Input parameter details:

* 1: Actions List (Array of strings or custom functions)
  * Action strings & examples:
    * `append` - `'append p Appended text'`
    * `await` - `'await .modal.success-message'`, `'await h1 With This Text'`, or `'await !h1 To disappear'`
    * `click` - `'click button.submit'` or `'click button With This Text'`
    * `exists` - `'exists .class-name'`, `'exists h1 With This Text'`, or `'exists !h1 Incorrect text'`
    * `log` - `'log Some message'`
    * `nav` - `'nav #id'` or `'nav #/some/hash/routing/path'`
    * `value` - `'value form>input.name Cory Rahman'`
    * `wait` - `'wait 3000'` (3 seconds)
    * `write` - `'write p Overwritten text'`
  * Selector: CSS selector like `button.class-name` (should not contain spaces)
  * Data: Argument for `value`, `write`, `log`, and optionally `exists` and `await`
* 2: Options (Object, optional)
  * `awaitTimeout`: (*default: 15000*) How long in milliseconds to wait for an element using the await command
  * `continueOnFailure`: (*default: false*) Continue to run actions even if one fails
  * `displayMessage`: (*default: true*) Show message at the top of the page
  * `displayProgress`: (*default: true*) Show animations of actions visually on the page using tooltips
  * `displaySpeed`: (*default: 1*) Animation speed for displayProgress tooltips (0.5 = half speed, 2 = double speed, etc)
  * `globalDelay`: (*default: 500*) Time between actions in milliseconds
  * `logCollapse`: (*default: false*) Initializes the console group collapsed
  * `logProgress`: (*default: true*) Show real-time progress in the browser console
  * `logResult`: (*default: true*) Show the final result in the browser console
  * `message`: (*default: 'SPA Check'*) Label to show in the console and in the DOM
  * `overrideCss`: (*default: ''*) Override default SPA Check CSS, target classes such as .spa-check-message, .spa-check-focus-box, or .spa-check-tooltip
  * `separator`: (*default: ' ' (space)*) Choose different text to separate the different parts of the action string. For example, with `selector` set to `'; '`, you could write an action string like `'await; .container div[name="Result Box"]; Result Text'` without worrying about spaces breaking the CSS selector. Alternatively you can use `>>` instead of spaces without customizing the separator, like `await .container>>div Result Text`.

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
  'click body>>.nested-div', // Use `>>` instead of spaces in CSS selectors
]);
```

* Note: To use spaces in CSS selectors, either replace the spaces with `>>` (like `body>>.class` instead of `body .class`) or define a custom separator using the `separator` option (like `separator: '; '`).

### Validate the DOM with `exists`:

```javascript
spaCheck([
  'exists p.some-class', // Checks for the existence of this element
  'exists p.some-class With certain text', // Also checks if it includes certain text
  'exists !p.some-class', // Ensures the element does not exist
  'exists !p.some-class With certain text', // Ensures the element does not exist with certain text
]);
```

### Deal with timing using `await` and `wait`:

```javascript
spaCheck([
  'await div.some-popup', // Awaits the existence of this element
  'await div.some-popup With certain text', // Also waits for it to include certain text
  'await !div.some-spinner', // Awaits the non-existence of this element
  'await !div.some-popup With certain text', // Also waits for it to not include certain text
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
