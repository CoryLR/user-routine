
# Dry-Run

Automated testing for single-page applications (SPAs). Small, easy to use, and zero setup. Click on things, fill in values, await for things exist, etc.

# Access

Options:

**1.** Install using `npm install --save-dev dry-run` and import:

```javascript
import { dryRun } from 'dry-run';
// or
const { dryRun } = require('dry-run');
```

**2.** Or copy the portable template from here: [dry-run.template.js](./dist/dry-run.template.js)
* This works with zero setup if you copy-paste the contents into a browser console or into client-side JavaScript

# Usage

Dry-Run is served as a function named `dryRun`.

## Simple examples:

Run a test:

```javascript
dryRun([
  'click button.btn', // Target using CSS selectors
  'await .result Result Text', // Await some result
]);
```

Display a tutorial:

```javascript
dryRun([
  'comment .some-form First, fill this out',
  'comment .submit-button Then, hit Submit!',
], { message:'Tutorial', tutorialMode: true });
```

Customize some options:

```javascript
dryRun(
  ['click button', 'await .result Result Text'], // Actions
  { message:'Example Test', globalDelay: 1000 }, // Options
);
```

Input parameter details:

* 1: Actions List (*String* (separate actions by new lines) or *Array of strings/functions*, required)
  * Action strings & examples:
    * `append` - `'append section>p Appended text'`
    * `await` & `!await` - `'await .modal.success-message'`, `'await h1 With This Text'`, or `'!await h1 To disappear'`
    * `click` - `'click button.submit'` or `'click button With This Text'`
    * `comment` - `'comment input.name Type your name here'`
    * `exists` & `!exists` - `'exists .class-name'`, `'exists h1 With This Text'`, or `'!exists h1 Incorrect text'`
    * `fill` - `'fill form>input.name Cory Rahman'`
    * `log` - `'log Some message'`
    * `nav` - `'nav #id'` or `'nav #/some/hash/routing/path'`
    * `wait` - `'wait 3000'` (3 seconds)
    * `write` - `'write p Overwritten text'`
  * Selector: CSS selector like `button.class-name` (should not contain spaces)
  * Data: Argument for `fill`, `write`, `log`, and optionally `exists` and `await`
* 2: Options (*Object*, optional)
  * `awaitTimeout`: (*default: 15000*) How long in milliseconds to wait for an element using the await command
  * `continueOnFailure`: (*default: false*) Continue to run actions even if one fails
  * `displayMessage`: (*default: true*) Show message at the top of the page
  * `displayProgress`: (*default: true*) Show animations of actions visually on the page using tooltips
  * `displaySpeed`: (*default: 1*) Animation speed for displayProgress tooltips (0.5 = half speed, 2 = double speed, etc)
  * `globalDelay`: (*default: 500*) Time between actions in milliseconds
  * `logCollapse`: (*default: false*) Initializes the console group collapsed
  * `logProgress`: (*default: true*) Show real-time progress in the browser console
  * `logResult`: (*default: true*) Show the final result in the browser console
  * `message`: (*default: 'Dry-Run'*) Label to show in the console and in the DOM
  * `messageAttribution`: (*default: 'Dry-Run'*) Subtitle text shown when custom message is provided
  * `overrideCss`: (*default: ''*) Override default Dry-Run CSS, target classes such as .dry-run-message, .dry-run-focus-box, or .dry-run-tooltip
  * `separator`: (*default: ' ' (space)*) Choose different text to separate the different parts of the action string. For example, with `selector` set to `'; '`, you could write an action string like `'await; .container div[name="Result Box"]; Result Text'` without worrying about spaces breaking the CSS selector. Alternatively you can use `>>` instead of spaces without customizing the separator, like `await .container>>div Result Text`.
  * `tutorialMode`: (*default: false*) Only animate tooltips for "log" and "comment" actions

Output details:

* The `dryRun` function returns type `DryRunReturn`:
  * `export type DryRunReturn = { success: boolean, log: string[], message: string };`
* Updates are also logged to the browser console like so:

```
[Dry-Run] Message
  * Filled the value of form>input.name to 'Cory'
  * Clicked on button[type="submit"]
  * Awaiting 'div.success-message'...
  * ...Found 'div.success-message'
  * Done, success: true
  Result: { success: true, log: Array(4), message: 'Message' }
```

# Examples

## Template

See the [dry-run.template.js](./dist/dry-run.template.js) for examples of running multiple sequential tests using async/await.

## Use-cases

### Fill inputs with `fill` and interact with `click` using Selectors:

```javascript
dryRun([
  'fill input[type="text"] Hello, world!', // Fills in the input
  'fill input[type="number"] 20',
  'click button.some-class', // Clicks a button with class 'some-class'
  'click div With certain text', // Clicks on the given text within a div
  'click * With certain text', // Clicks on the given text regardless of containing element
  'click body>>.nested-div', // Use `>>` instead of spaces in CSS selectors
]);
```

* Note: To use spaces in CSS selectors, either replace the spaces with `>>` (like `body>>.class` instead of `body .class`) or define a custom separator using the `separator` option (like `separator: '; '`).

### Validate the DOM with `exists`:

```javascript
dryRun([
  'exists p.some-class', // Checks for the existence of this element
  'exists p.some-class With certain text', // Also checks if it includes certain text
  '!exists p.some-class', // Ensures the element does not exist
  '!exists p.some-class With certain text', // Ensures the element does not exist with certain text
]);
```

### Deal with timing using `await` and `wait`:

```javascript
dryRun([
  'await div.some-popup', // Awaits the existence of this element
  'await div.some-popup With certain text', // Also waits for it to include certain text
  '!await div.some-spinner', // Awaits the non-existence of this element
  '!await div.some-popup With certain text', // Also waits for it to not include certain text
  'wait 3000', // waits 3 seconds
]);
```

* Note: The default await timeout is 15000 ms (15 seconds), overwrite using the `awaitTimeout` option.

### Navigate within a single-page application using `nav`:

```javascript
dryRun([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

### Add notes with `append`, `log`, and `write`:

```javascript
dryRun([
  'write h1 Testing successful!', // overwrites the h1's textContent
  'append h1  - Testing successful!', // appends to the h1's textContent
  'log The testing is complete.',
]);
```

### Pass options as a second argument:

```javascript
dryRun([
  'fill input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// ^ Options object with 1 second between actions
```

* Note: See [Usage](#Usage) for a list of options

# Development

## Release Notes

Version 5.0

* ...

## Maintainers

### Getting Started

* Install dependencies for the Demo using `npm install`
* Open the Demo with the `quick-regression` url parameter: [demo/dist/index.html?test=quick-regression](./demo/dist/index.html?test=quick-regression)

### Continuous Development

* Make changes to [lib/dry-run.ts](./lib/dry-run.ts)
* Run `npm run build:local`
* To test changes, edit either [demo/src/regression-tests.js](./demo/src/regression-tests.js) or [demo/src/script.js](./demo/src/script.js)
* Open the Demo with the `quick-regression` url parameter: [demo/dist/index.html?test=quick-regression](./demo/dist/index.html?test=quick-regression)
* Before each commit, run the full `npm run build`

To publish:

1. Bump the version number in the [package.json](./package.json)
2. `npm i`
3. `npm run build`
4. Test one last time
5. `npm publish --access public`

TODO:

* [ ] Add CDN example https://cdn.jsdelivr.net/gh/CoryLR/dry-run/lib/dry-run.min.js
* [x] Test and make sure the new notOperator syntax works as expected
* [x] Add "comment" action
* [x] Add "tutorialMode" option
* [x] Change to "tutorialMode"
* [x] Improve "tutorialMode" to include clickable "next" buttons on each log and comment
  * [ ] add "tutorialModeAutoPlay" option? (default false)
  * [x] Make highlight boxes click-through-able
  * [ ] Maybe add a feature so that if a check fail Dry-Run goes back to the previous log or comment? - OR - Add 'gate' command or something similar to prevent the user from continuing if they don't follow the tutorial instructions
* [x] Add "attributionText" option.
* [ ] Finish the Demo page
* [x] Add auto-test URL params to demo page so I can use it for testing
* [x] Add multiline string action list option
* [x] Add a check so dryRun ends if there is already an existing Dry-Run happening
  * [x] Handle condition where multiple SPA Routines run at once, check for the message element
* [x] Add play/pause/stop support - coordinate via data-attributes so it can be controlled from the outside too. When one of the buttons is clicked, it can set a data-attribute flag which Dry-Run can look at both on the globaldelay but also before tooltip hide
* [ ] Add a tutorial walkthrough to the demo page *using* Dry-Run
* [ ] Add count action
* [ ] Add a value action which will check for a value or a specific value
* [x] Change name to dry-run / Dry-Run / dryRun
* [ ] Change Repo name and publish new name to NPM, options:
  * dry-run
  * task-routine
  * auto-routine
  * action-list
  * dry-run
  * spa-bot
  * spa-check
  * spa-list

 