
# User Routine

Automated user routines for end-to-end testing or guided user tutorials. Small, portable, and zero setup. Click buttons, fill values, await results, etc.

# Access

Options:

**1.** Install using `npm install --save-dev user-routine` and import:

```javascript
import { userRoutine } from 'user-routine';
// or
const { userRoutine } = require('user-routine');
```

**2.** Add a reference to `user-routine.min.js` to your HTML:

```html
<!-- From CDN -->
<script src="https://cdn.jsdelivr.net/gh/CoryLR/user-routine/dist/user-routine.min.js"></script>

<!-- Or from local file -->
<script src="/user-routine.min.js"></script>
```

**3.** Or copy the portable template from here: [user-routine.template.js](./dist/user-routine.template.js)
* This works with zero setup if you copy-paste the contents into a browser console or into client-side JavaScript

# Usage

User Routine is served as a function named `userRoutine`.

**Some simple examples:**

Run a test:

```javascript
userRoutine([
  'click button.btn', // Target using CSS selectors
  'await .result Result Text', // Await some result
]);
```

Display a tutorial:

```javascript
userRoutine([
  'comment .some-form First, fill this out',
  'comment .submit-button Then, hit Submit!',
], { message:'Tutorial', tutorialMode: true });
```

Customize some options:

```javascript
userRoutine(
  ['click button', 'await .result Result Text'], // Actions
  { message:'Example Test', globalDelay: 1000,   // Options
  displayProgress: false, continueOnFailure: true},
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
    * `value` - `'value input.required'` or `'value input.name Test User 1'`
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
  * `message`: (*default: 'User Routine'*) Label to show in the console and in the DOM
  * `messageAttribution`: (*default: 'User Routine'*) Subtitle text shown when custom message is provided
  * `overrideCss`: (*default: ''*) Override default User Routine CSS, target classes such as .user-routine-message, .user-routine-focus-box, or .user-routine-tooltip
  * `separator`: (*default: ' ' (space)*) Choose different text to separate the different parts of the action string. For example, with `separator` set to `'; '`, you could write an action string like `'await; .container div[name="Result Box"]; Result Text'`. (Alternatively you can use `>>` instead of spaces without customizing the CSS selector, like `await .container>>div Result Text`).
  * `tutorialMode`: (*default: false*) Add a "Next" button to tooltips, and only show tooltips for "log" and "comment" actions

Output details:

* The `userRoutine` function returns type `UserRoutineReturn`:
  * `export type UserRoutineReturn = { success: boolean, log: string[], message: string, configuration: UserRoutineOptions };`
* Updates are also logged to the browser console like so:

```
[User Routine] Message
  * Filled the value of form>input.name to 'Cory'
  * Clicked on button[type="submit"]
  * Awaiting 'div.success-message'...
  * ...Found 'div.success-message'
  * Done, success: true
  Result: { success: true, log: Array(4), message: 'Message' }
```

# Examples

## Template

See the [user-routine.template.js](./dist/user-routine.template.js) for examples of running multiple sequential tests using async/await.

## Use-cases

### Fill inputs with `fill` and interact with `click` using Selectors:

```javascript
userRoutine([
  'fill input[type="text"] Hello, world!', // Fills in the input
  'fill input[type="number"] 20',
  'click button.some-class', // Clicks a button with class 'some-class'
  'click div With certain text', // Clicks on the given text within a div
  'click * With certain text', // Clicks on the given text regardless of containing element
  'click body>>.nested-div', // Use `>>` instead of spaces in CSS selectors
]);
```

* Note: To use spaces in CSS selectors, either replace the spaces with `>>` (like `body>>.class` instead of `body .class`) or define a custom separator using the `separator` option (like `separator: '; '`).

### Validate the DOM with `exists` and `value`:

```javascript
userRoutine([
  'exists p.some-class', // Checks for the existence of this element
  'exists p.some-class With certain text', // Also checks if it includes certain text
  '!exists p.some-class', // Validates that the element does not exist
  '!exists p.some-class With certain text', // Validates that the element does not exist with certain text
  'value input.required', // Validates that the element has any value
  'value input.name Jane Doe', // Validates that the element has a value of "Jane Doe"
]);
```

### Deal with timing using `await` and `wait`:

```javascript
userRoutine([
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
userRoutine([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

### Add notes with `append`, `log`, and `write`:

```javascript
userRoutine([
  'write h1 Testing successful!', // overwrites the h1's textContent
  'append h1  - Testing successful!', // appends to the h1's textContent
  'log The testing is complete.',
]);
```

### Pass options as a second argument:

```javascript
userRoutine([
  'fill input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// ^ Options object with 1 second between actions
```

* Note: See [Usage](#Usage) for a list of options

# Development

## Maintainers

### Getting Started

* Install dependencies for the Demo using `npm install`
* Open the Demo with the `quick-regression` url parameter: [demo/dist/index.html?test=quick-regression](./demo/dist/index.html?test=quick-regression)

### Continuous Development

* Make changes to [lib/user-routine.ts](./lib/user-routine.ts)
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

TO DO:

* [ ] Pick new name, some options: user-routine, action-routine, task-routine, auto-routine, spa-routine, spa-list
* [ ] Finish the Demo page
* [ ] Add count action to count instances of a particular CSS selector
* [ ] Add a tutorial walkthrough to the demo page, using User Routine to showcase User Routine
* [ ] Improve tutorialMode by automating progress via `await` and other actions instead of relying on the Next button
* [ ] Add config warnings that might conflict, like tutorialMode and displayProgress/globalDelay
