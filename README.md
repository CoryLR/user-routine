# MiniTest

Small, 0-dependency, transportable auto e2e testing in JavaScript and TypeScript for single-page application (SPA) navigation, clicking, validating, etc.

# Usage

Just pass an array of strings where each string is an action to take.

## Action String Syntax

`'(Action) (Selector) (Data)'`

* Available actions: nav, click, exists, value, write, includes, log
* Selector: CSS selector like `button.class-name`
* Data: Only relevant for value, write, includes, and log

Action string examples:

* `'value input#name John Doe'`
* `'click button.class-name'`

## Examples

Fill inputs with `value` and interact with `click` using Selectors:

```javascript
new MiniTest([
  'value input[type="text"] Hello, world!',
  'value input[type="number"] 20',
  'click button.some-class',
]);
```

Navigate within a page using `nav` followed by an ID or hash routing path, if applicable:

```javascript
new MiniTest([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

Validate the DOM with `exists` and `includes`:

```javascript
new MiniTest([
  'exists div.some-class',
  '', // Leave some extra time
  'includes p.output some text we want to make sure exists',
]);
```

Add notes with `write` and `log`:
```javascript
new MiniTest([
  'write h1  - Testing successful!', // adds to the end
  'log The testing is complete.',
]);
```

## Options

You can also pass options as a second argument:

```javascript
new MiniTest([
  'value input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// Options object with 1 second between actions
```

Available options are:

* `globalDelay`: time between actions
* `message`: Text to show while the text runs
* `messageStyle`: Override the default message style

# Access

You can either download this Repo and import the Class,

```javascript
import { MiniTest } from 'MiniTest'
```

or copy the portable version from [MiniTest.blob.js](./MiniTest.blob.js) (works if you paste into the a browser console too).

# Development

* To run the tests, use `npm install` to install development dependencies and then run `npm run test`
