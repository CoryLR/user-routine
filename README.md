# SpaCheck

Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, check if things exist, etc.

# Access

You can either download this Repo and import the Class,

```javascript
import { SpaCheck } from 'SpaCheck'
```

or copy the portable version from [SpaCheck.blob.js](./SpaCheck.blob.js) (works if you paste into the a browser console).

# Usage

Just pass an array of strings where each string is an action to take. You can also pass a function for custum functionality.

## Action String Syntax

`'Action selector data'`

* Available actions: click, exists, includes, log, nav, value, write
* Selector: CSS selector like `button.class-name`
* Data: Only relevant for value, write, includes, and log

Action string examples:

* `'value input#fullname John Doe'`
* `'click button.class-name'`

## Examples

Fill inputs with `value` and interact with `click` using Selectors:

```javascript
new SpaCheck([
  'value input[type="text"] Hello, world!',
  'value input[type="number"] 20',
  'click button.some-class',
]);
```

Navigate within a page using `nav` followed by an ID or hash routing path, if applicable:

```javascript
new SpaCheck([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

Validate the DOM with `exists` and `includes`:

```javascript
new SpaCheck([
  'exists div.some-class',
  '', // Leave some extra time
  'includes p.output some text we want to make sure exists',
]);
```

Add notes with `write` and `log`:
```javascript
new SpaCheck([
  'write h1  - Testing successful!', // adds to the end
  'log The testing is complete.',
]);
```

## Options

You can also pass options as a second argument:

```javascript
new SpaCheck([
  'value input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// Options object with 1 second between actions
```

Available options are:

* `continueOnFailure`: (default: false) Continue to run actions even if one fails
* `done`: Callback function to run once complete
* `globalDelay`: (default: 500) time between actions in milliseconds
* `logUpdates`: (default: true) Show progress in the browser console
* `message`: (default: '') Text to show while the text runs
* `messageShowInDOM`: (default: false) Show the message visually on the page
* `messageStyle`: Override the default message style


* `globalDelay`: time between actions
* `message`: Text to show while the text runs
* `messageStyle`: Override the default message style

# Development

* To run the tests, use `npm install` to install development dependencies and then run `npm run test`
