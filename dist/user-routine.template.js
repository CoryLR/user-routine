
/* 
 * User Routine Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: 5.0.10
 * Description: Automate user actions & routines on web pages for testing and creating tutorials. Small, portable, and zero setup. Click buttons, fill values, await results, comment on elements, etc.
*/

/**
 * User Routine examples, replace with your tests
*/
async function startUserRoutine() {
  
  await userRoutine([
    'log Tests starting',
    'fill input.text Hello, world!',
    'value input.text',
    'value input.text Hello, world!',
    'fill input.count 2',
    'click button.duplicate',
    'exists pre.output-duplicate Hello, world! Hello, world! ',
    'append pre.output-duplicate Hello, world!',
    'exists pre.output-duplicate Hello, world! Hello, world! Hello, world!',
    'write .output-duplicate Hello Pluto!',
    '!exists .output-duplicate Hello World!',
    'click button.duplicate',
    'nav #',
    () => { console.log('This is logging from a provided function!') },
    async () => { await new Promise(resolve => setTimeout(() => { resolve() }, 300)) },
    '!exists .output-process Processing...',
    'click button long process',
    '!await .output-process processing...',
    'await .output-process Process complete!',
  ], {
    message: 'Testing Features', globalDelay: 500,
  });
  
}

/*
Usage

User Routine is served as a function named `userRoutine`.

## Simple Examples

Run a test:

```javascript
userRoutine([
  'click button.btn', // Target using CSS selectors
  'await div.result Result Text', // Await result text
], { message: 'Testing the button' });
```

Display a tutorial:

```javascript
userRoutine([
  'comment .some-form First, fill this out',
  'comment .submit-button Then, hit Submit!',
], { message: 'Tutorial', tutorialMode: true });
```

Customize options to run a fast regression test:

```javascript
userRoutine([
  'fill form>input Mock input text',
  'click button.submit',
  'await div.some-expected-result',
  // etc...
], {
  message: 'Testing the button',
  displayProgress: false, // default is true
  logProgress: false, // default is true
  globalDelay: 50, // default is 500 (0.5 seconds)
  awaitTimeout: 1500, // default is 15000 (15 seconds)
});
```

## Input Parameter Details

function userRoutine(actions: *string[] OR string*, options: *UserRoutineOptions?*)

* 1: Actions List (*String* (separate actions by new lines) or *Array of strings/functions*, required)
  * Action strings & examples:
    * `append`
      * Add text to the end of an element's textContent
      * `'append section>p Appended text'`
    * `await`
      * Await for something to appear
      * `'await .modal.success-message'` or `'await h1 With This Text'`
    * `!await`
      * Await for something to disappear
      * `'!await .spinner'` or `'!await h1 This title should disappear'`
    * `click`
      * Click on something
      * `'click button.submit'` or `'click button With This Text'`
    * `comment`
      * Show a tooltip to point something out
      * `'comment input.name Type your name here'`
    * `exists`
      * Check to see if something exists
      * `'exists .class-name'` or `'exists h1 With This Text'`
    * `!exists`
      * Check to see if something doesn't exist
      * `'!exists h1 Incorrect text'`
    * `fill`
      * Fill the value attribute of an element
      * `'fill form>input.name Cory Rahman'`
    * `log`
      * Record a message
      * `'log Some message'`
    * `nav`
      * Use hash navigation
      * `'nav #id'` or `'nav #/some/hash/routing/path'`
    * `value`
      * Check the value attribute of an element
      * `'value input.required'` or `'value input.name Test User 1'`
    * `wait`
      * Wait for some time
      * `'wait 3000'` (3 seconds)
    * `write`
      * Overwrite textContent of an element
      * `'write p Overwritten text'`
  * Selector:
    * CSS selector like `button.class-name`
    * The CSS selector should not contain spaces by default. Either use `>>` instead of spaces like `await .container>>div Result Text`) or pass a custom action string `separator` in the Options
  * Data:
    * Required argument for `append`, `comment`, `fill`, `log`, `value`, `wait`, and `write`
    * Optional argument for `await`, `click`, `exists`, and `value`
* 2: Options (*Object*, optional)
  * `awaitTimeout`: (*default: 15000*) How long in milliseconds to wait for an element using the await command
  * `continueOnFailure`: (*default: false*) Continue to run actions even if one fails
  * `displayMessage`: (*default: true*) Show message at the top of the page
  * `displayProgress`: (*default: true*) Show animations of actions visually on the page using tooltips
  * `displaySpeed`: (*default: 1*) Animation speed for displayProgress tooltips (0.5 = half speed, 2 = double speed, etc)
  * `globalDelay`: (*default: 500*) Time between actions in milliseconds
  * `keyboardControls`: (*default: true*) Enables play/pause/stop with space and escape keys
  * `logCollapse`: (*default: false*) Initializes the console group collapsed
  * `logProgress`: (*default: true*) Show real-time progress in the browser console
  * `logResult`: (*default: true*) Show the final result in the browser console
  * `message`: (*default: 'User Routine'*) Label to show in the console and in the DOM
  * `messageAttribution`: (*default: 'User Routine'*) Subtitle text shown when custom message is provided
  * `overrideCss`: (*default: ''*) Override default User Routine CSS, target classes such as .user-routine-message, .user-routine-focus-box, or .user-routine-tooltip
  * `separator`: (*default: ' ' (space)*) Choose different text to separate the different parts of the action string. For example, with `separator` set to `'; '`, you could write an action string like `'await; .container div[name="Result Box"]; Result Text'`.
  * `simultaneousAllowed`: (*default: false*) Allow the User Routine to run even if one is already running
  * `tutorialMode`: (*default: false*) Add a "Next" button to tooltips, and only show tooltips for "log" and "comment" actions

## Output Details

* The `userRoutine` function returns a Promise resolving to type `UserRoutineReturn`:
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


*/

/* Minified User Routine code, provides function 'userRoutine' */ /* @ts-ignore */
(()=>{"use strict";var e={d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{userRoutine:()=>n});var t=function(e,o,t,n){return new(t||(t=Promise))((function(i,r){function s(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){var o;e.done?i(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(s,d)}u((n=n.apply(e,o||[])).next())}))};function n(e,o={}){return t(this,void 0,void 0,(function*(){const n={awaitTimeout:15e3,continueOnFailure:!1,displayMessage:!0,displayProgress:!0,displaySpeed:1,globalDelay:500,keyboardControls:!0,logCollapse:!1,logProgress:!0,logResult:!0,message:"User Routine",messageAttribution:"User Routine",overrideCss:"",separator:" ",simultaneousAllowed:!1,tutorialMode:!1};!0===o.tutorialMode&&!1===o.displayProgress&&(o.displayProgress=!0,console.warn("[User Routine] WARN: 'displayProgress' changed to 'true' because 'tutorialMode' is enabled")),!0===o.tutorialMode&&!0===o.keyboardControls&&(o.keyboardControls=!1,console.warn("[User Routine] WARN: 'keyboardControls' changed to 'false' because 'tutorialMode' is enabled"));const i=Object.freeze(Object.assign(Object.assign({},n),o)),r=[],s=i.message!==n.message?`[User Routine] ${i.message}`:"[User Routine]",d={paused:!1,errorOccurred:!1,continueActions:!0,documentKeyDownSet:!1,nextButtonPressed:!1};let u;const l={arrow:void 0,arrowShadow:void 0,focusBox:void 0,message:void 0,style:void 0,tooltip:void 0,tooltipShadow:void 0,nextButton:void 0,playButton:void 0,pauseButton:void 0,stopButton:void 0,status:void 0};if(!function(){if("undefined"==typeof document){let e="FAIL: document is undefined. User Routine can only be used in the browser. Halting execution.";return i.logProgress&&console.error(e),r.push(e),!1}if(!i.simultaneousAllowed){const e=document.querySelector("body > .user-routine");if(e){let o=`FAIL: User Routine '${e.querySelector(".user-routine-message").textContent}' is already running. Halting execution.`;return i.logProgress&&console.error(o),r.push(o),!1}}return!0}()){const e={success:!1,log:r,message:i.message,configuration:i};return C(e,!1),e}(i.displayMessage||i.displayProgress)&&function(){t(this,void 0,void 0,(function*(){l.style=document.createElement("style"),l.style.textContent="\n      body > .user-routine {\n        font: 20px Arial;\n        padding: 18px 12px 6px 12px;\n        z-index: 9999;\n        position: fixed;\n        top: 0;\n        right: 10%;\n        color: black;\n        background-color: rgba(250,250,250,0.8);\n        text-align: center;\n        border-radius: 0 0 12px 12px;\n        max-width: 80vw;\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        border: 2px solid rgb(180,180,180);\n        border-top: 0;\n      }\n      body > .user-routine > .user-routine-footer {\n        width: 100%;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        line-height: 15px;\n        font-size: 12px;\n        margin-top: 5px;\n      }\n      body .user-routine-footer .user-routine-play {\n        display: none;\n      }\n      body .user-routine-footer .user-routine-play,\n      body .user-routine-footer .user-routine-pause,\n      body .user-routine-footer .user-routine-stop {\n        padding: 4px;\n      }\n      body .user-routine-footer .user-routine-play:hover,\n      body .user-routine-footer .user-routine-pause:hover,\n      body .user-routine-footer .user-routine-stop:hover {\n        cursor: pointer;\n      }\n      body > .user-routine > .user-routine-footer .user-routine-play-icon {\n        width: 0;\n        height: 0;\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        border-left: 8px solid rgb(191, 191, 191);\n      }\n      body > .user-routine > .user-routine-footer .user-routine-pause-icon {\n        width: 2px;\n        height: 8px;\n        border-left: 3px solid rgb(191, 191, 191);\n        border-right: 3px solid rgb(191, 191, 191);\n        margin: 1px 0;\n      }\n      body > .user-routine > .user-routine-footer .user-routine-stop-icon {\n        height: 8px;\n        width: 8px;\n        background-color: rgb(191, 191, 191);\n      }\n      body .user-routine-footer .user-routine-play:hover .user-routine-play-icon {\n        border-left: 8px solid rgb(80, 80, 80);\n      }\n      body .user-routine-footer .user-routine-pause:hover .user-routine-pause-icon {\n        border-left: 3px solid rgb(80, 80, 80);\n        border-right: 3px solid rgb(80, 80, 80);\n      }\n      body .user-routine-footer .user-routine-stop:hover .user-routine-stop-icon {\n        background-color: rgb(80, 80, 80);\n      }\n      body > .user-routine > .user-routine-footer > .user-routine-status,\n      body > .user-routine > .user-routine-footer > .user-routine-attribution {\n        text-align: left;\n        color: dimgray;\n      }\n      body > .user-routine > .user-routine-footer > .user-routine-status {\n        min-width: 50px;\n        min-height: 15px;\n        margin-left: 5px;\n        font-style: italic;\n      }\n      body > .user-routine > .user-routine-footer > .user-routine-attribution {\n        margin-left: auto;\n        padding-left: 5px;\n      }\n      body > .user-routine-focus-box {\n        z-index: 9997;\n        visibility: hidden;\n        position: absolute;\n        background-color: rgba(255,255,255,0.2);\n        border: 2px solid white;\n        box-shadow: 0 0 0 2px rgb(0,0,0);\n        pointer-events: none;\n      }\n      body > .user-routine-tooltip {\n        z-index: 9999;\n        visibility: hidden;\n        font: 14px Arial;\n        position: absolute;\n        background-color: rgb(245,245,245);\n        color: black;\n        text-align: center;\n        padding: 10px;\n        border-radius: 10px;\n        max-width: 200px;\n      }\n      body > .user-routine-tooltip-error {\n        color: darkred;\n      }\n      body > .user-routine-arrow {\n        z-index: 9999;\n        visibility: hidden;\n        width: 0;\n        height: 0;\n        position: absolute;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 10px solid rgb(245,245,245); \n      }\n      body > .user-routine-arrow-shadow {\n        z-index: 9998;\n        border-left: 14px solid transparent;\n        border-right: 14px solid transparent;\n        border-bottom: 14px solid rgb(180,180,180);\n        margin: -3px 0 0 -4px;\n      }\n      body > .user-routine-tooltip-shadow {\n        z-index: 9998;\n        color: transparent;\n        border: 2px solid rgb(180,180,180);\n        background-color: rgb(180,180,180);\n        margin: -2px 0 0 -2px;\n        border-radius: 12px;\n      }\n      body > .user-routine-tooltip .user-routine-next-button {\n        display: block;\n        margin: 5px auto 0 auto;\n        border-radius: 5px;\n        padding: 5px;\n        background-color: rgb(220,220,220);\n        border-width: 0;\n        cursor: pointer;\n      }\n      body > .user-routine-fade-in {\n        visibility: visible;\n        animation: userRoutinefadeIn 150ms; \n      }\n      body > .user-routine-fade-out {\n        opacity: 0;\n        animation: userRoutinefadeOut 150ms; \n      }\n      @keyframes userRoutinefadeIn {\n        0% { opacity: 0; }\n        100% { opacity: 1; }\n      }\n      @keyframes userRoutinefadeOut {\n        0% { opacity: 1; }\n        100% { opacity: 0; }\n      }\n    ",l.style.textContent+=i.overrideCss,document.querySelector("body").appendChild(l.style)}))}(),i.logProgress&&(i.logCollapse?console.groupCollapsed(s):console.group(s)),function(e){l.message=document.createElement("div");let o=`\n      <div class="user-routine-message">${e}</div>\n      <div class="user-routine-footer">\n    `;i.tutorialMode||(o+='\n        <div class="user-routine-play" title="Play">\n          <div class="user-routine-play-icon"></div>\n        </div>\n        <div class="user-routine-pause" title="Pause">\n          <div class="user-routine-pause-icon"></div>\n        </div>\n      '),o+=`\n        <div class="user-routine-stop" title="Stop">\n          <div class="user-routine-stop-icon"></div>\n        </div>\n        <div class="user-routine-status"></div>\n        <div class="user-routine-attribution">${i.messageAttribution}</div>\n      </div>\n    `,l.message.innerHTML=o,l.message.classList.add("user-routine"),i.displayMessage||(l.message.style.visibility="hidden"),document.querySelector("body").appendChild(l.message),l.playButton=document.querySelector(".user-routine .user-routine-play"),l.pauseButton=document.querySelector(".user-routine .user-routine-pause"),l.stopButton=document.querySelector(".user-routine .user-routine-stop"),l.status=document.querySelector(".user-routine .user-routine-status"),i.tutorialMode||(l.playButton.addEventListener("click",(()=>t(this,void 0,void 0,(function*(){M()})))),l.pauseButton.addEventListener("click",(()=>t(this,void 0,void 0,(function*(){k()}))))),l.stopButton.addEventListener("click",(()=>t(this,void 0,void 0,(function*(){yield B("stop button")})))),null===document.onkeydown&&!i.tutorialMode&&i.keyboardControls?(document.onkeydown=e=>t(this,void 0,void 0,(function*(){"Escape"===e.key?yield B("escape key"):" "===e.key&&(d.paused?M():k())})),d.documentKeyDownSet=!0):null!==document.onkeydown&&console.warn("[User Routine] document.onkeydown already set, keyboard controls disabled")}(i.message);const a=yield function(e,o){return t(this,void 0,void 0,(function*(){let t=!0;return void 0===e?(t=!1,yield R("Missing required argument Action List","",!1)):Array.isArray(e)||"string"==typeof e||(t=!1,yield R("Action list argument is not an Array or string","",!1)),void 0===o||"object"==typeof o&&!Array.isArray(o)||(t=!1,yield R("Options argument is not an Object","",!1)),t}))}(e,o);if(!a)return S();const c=function(e){return"string"==typeof e?e.split("\n").map((e=>e.trimStart())):Array.isArray(e)?e.map((e=>"string"==typeof e?e.trimStart():e)):void 0}(e);for(const e of c){if(!d.continueActions)return S();yield E(i.globalDelay);try{yield p(e)}catch(e){yield R("Unexpected error: "+e.message)}}return S();function p(e){return t(this,void 0,void 0,(function*(){if("string"==typeof e)yield function(e){return t(this,void 0,void 0,(function*(){const o=e.replace("!","").substring(0,3);if("nav"===o){const o=e.split(i.separator)[1];o&&"#"===o[0]?(yield y((()=>{window.location.href=o}),`Navigating to ${o}`,void 0,!i.tutorialMode),P(`Navigated to ${o}`)):yield R("Unexpected nav action, got",e)}else if("cli"===o){const[o,t,n]=yield $(e),r=h(t,n);if(n){const e=v(t);u=void 0,b(e,n,m),u?(yield y((()=>{u.click()}),`Clicking ${u.tagName.toLowerCase()} with text '${n}'`,u,!i.tutorialMode),P(`Clicked text '${n}' inside ${t} (clicked on ${u.tagName.toLowerCase()})`)):yield R("Could not find selector to click",r),u=void 0}else{const e=yield f(t);if(!e)return;yield y((()=>{e.click()}),`Clicking ${e.tagName.toLowerCase()}`,e,!i.tutorialMode),P(`Clicked ${t}`)}}else if("exi"===o){let[o,t,n]=yield $(e),r=!1;"!"===e[0]&&(r=!0);const s=h(t,n);let d,a=!1;if(n){const e=v(t,!1);u=void 0,b(e,n,m),u&&(d=u,a=!0)}else{const e=g(t,!1);e&&(a=!0,d=e)}a&&!r?(i.tutorialMode||(yield L(d,`Confirmed exists: ${s}`,"info")),i.tutorialMode||(yield A()),P(`Confirmed exists: ${s}`)):a||r?a&&r?(i.tutorialMode||(yield L(d,`Incorrectly exists: ${s}`,"error")),i.tutorialMode||(yield A()),yield R(`Incorrectly exists: ${s}`)):!a&&r&&(i.tutorialMode||(yield L(l.message,`Confirmed does not exist: ${s}`,"info",!0)),i.tutorialMode||(yield A()),P(`Confirmed does not exist: ${s}`)):yield R("Did not exist",s),u=void 0}else if("fil"===o){const[o,t,n]=yield w(e),r=yield f(t);if(!r)return;yield y((()=>{r.value=n,r.dispatchEvent(new InputEvent("input"))}),`Filling value of ${r.tagName.toLowerCase()}`,r,!i.tutorialMode),P(`Filled the value of ${t} to '${n}'`)}else if("val"===o){const[o,t,n]=yield $(e),r=yield f(t);if(!r)return;void 0!==r.value&&null!==r.value||(i.tutorialMode||(yield L(r,"Element cannot have a value","error")),i.tutorialMode||(yield A()),yield R(`Element ${t} (${r.tagName.toLowerCase()}) did not have a value attribute`)),null==n?""!==r.value?(i.tutorialMode||(yield L(r,"Confirmed has a value","info")),i.tutorialMode||(yield A()),P(`Element '${t}' had a value ('${r.value}')`)):(i.tutorialMode||(yield L(r,"Expected value to exist","error")),i.tutorialMode||(yield A()),yield R(`Element '${t}' did not have a value`)):r.value===n?(i.tutorialMode||(yield L(r,"Value is correct","info")),i.tutorialMode||(yield A()),P(`Element '${t}' has the correct value: '${r.value}'`)):(i.tutorialMode||(yield L(r,`Expected a value of '${n}'`,"error")),i.tutorialMode||(yield A()),yield R(`Element '${t}' has an incorrect value, expected '${n}' but saw '${r.value}'`))}else if("wri"===o||"app"===o){const[t,n,r]=yield w(e),s=yield f(n);if(!s)return;let d=r||"";"wri"===o?(yield y((()=>{s.textContent=d}),`Writing over ${n}`,s,!i.tutorialMode),P(`Wrote '${d}' over ${n}`)):(yield y((()=>{s.textContent+=d}),`Appending text to ${n}`,s,!i.tutorialMode),P(`Appended '${d}' to ${n}`))}else if("log"===o){let o,t;" "!==i.separator?[o,t]=e.split(i.separator):[o,t]=e.split(/ (.*)/s),i.tutorialMode&&(d.nextButtonPressed=!1),yield y((()=>{P(t)}),`${t}`),i.tutorialMode&&(yield O())}else if("com"===o){const[o,t,n]=yield $(e);if(!n)return void(yield R(`Value was not provided for comment action '${e}'`));const r=yield f(t);if(!r)return;i.tutorialMode&&(d.nextButtonPressed=!1),yield L(r,n,"info"),i.tutorialMode||(yield A()),i.tutorialMode&&(yield O())}else if("wai"===o){const[o,n]=e.split(i.separator);P(`Waiting ${Number(n)/1e3} second(s)`),yield y((()=>t(this,void 0,void 0,(function*(){yield function(e){return t(this,void 0,void 0,(function*(){if(e<=i.globalDelay/2)yield N(e);else{const o=e/i.globalDelay*2,t=e%i.globalDelay/2;for(let e=0;e<o;e++)yield E(i.globalDelay/2);yield E(t)}}))}(Number(n))}))),`Waiting ${Number(n)/1e3} second(s)`,void 0,!i.tutorialMode)}else if("awa"===o){let[o,t,n]=yield $(e),r=!1;"!"===e[0]&&(r=!0);const s=i.awaitTimeout/i.globalDelay*2;let d,a=!1;const c=h(t,n);P(`Awaiting ${c}...`);const p=r?`Awaiting ${c} to not exist...`:`Awaiting ${c}...`;i.tutorialMode||(yield L(l.message,p,"info",!0));for(let e=0;e<s;e++){if(n){const e=Array.from(v(t.replace(/>>/g," ")));for(const o of e)if(o&&o.textContent&&o.textContent.toLowerCase().includes(n.toLowerCase())){a=!0,u=void 0,b([o],n,m),d=u;break}}else{const e=g(t);e&&(a=!0,d=e)}if(a&&!r)break;if(!a&&r)break;a=!1,yield E(i.globalDelay/2)}i.tutorialMode||(yield A()),a&&!r?(i.tutorialMode||(yield L(d,`...Found ${c}`,"info")),i.tutorialMode||(yield A()),P(`...Found ${c}`)):a||r?a&&r?(i.tutorialMode||(yield L(d,`...Timed out awaiting ${c} to not exist`,"error")),i.tutorialMode||(yield A()),yield R(`...Timed out awaiting ${c} to not exist`)):!a&&r&&P(`...${c} disappeared`):yield R(`Timed out after ${i.awaitTimeout/1e3} second(s) awaiting`,c)}else""===e||(yield R("Action string keyword not recognized, got",e))}))}(e);else if("function"==typeof e)try{yield y(e,"Running provided function",void 0,!i.tutorialMode),P("Ran provided function")}catch(o){yield A(),yield R("Error running provided function",o+"; function: "+e.toString())}else yield R("Action is not of type string or function, got",typeof e)}))}function y(e,o,n,r=!0){return t(this,void 0,void 0,(function*(){let t=!1;n||(n=l.message?l.message:document.body,t=!0),r&&(yield L(n,o,"info",t)),yield e(),r&&!i.tutorialMode&&(yield A())}))}function f(e){return t(this,void 0,void 0,(function*(){const o=g(e);return o||(yield R("CSS Selector not found",e.replace(/>>/g," "))),o}))}function g(e,o=!0){const t=e.replace(/>>/g," ");return document.querySelector(t)}function v(e,o=!0){const t=e.replace(/>>/g," ");return document.querySelectorAll(t)}function b(e,o,t=(e=>"SCRIPT"!==e.tagName)){for(const n of e)x(n,o)&&(t(n)&&(u=n),b(Array.from(n.childNodes).filter((e=>{if(t(e))return e})),o,t))}function m(e){return e.click&&"SCRIPT"!==e.tagName}function x(e,o){const t=o.toLowerCase(),n=e.textContent&&e.textContent.toLowerCase().includes(t),i="string"==typeof e.value&&e.value.toLowerCase().includes(t);return n||i}function h(e,o){return`'${e}'`+(o?` containing text '${o}'`:"")}function w(e){return t(this,void 0,void 0,(function*(){if(" "!==i.separator)return e.split(i.separator);const o=e.split(/ ([^\s]+) (.*)/s);return o.length<3&&(yield R("Unexpected input with data, got",e)),o[1]=o[1].replace(/>>/g," "),o}))}function $(e){return t(this,void 0,void 0,(function*(){const o=e.split(i.separator);return" "!==i.separator?o:o.length>2?yield w(e):(o[1]=o[1].replace(/>>/g," "),o)}))}function C(e,o=!0){return t(this,void 0,void 0,(function*(){!function(){t(this,void 0,void 0,(function*(){for(const e in l)l[e]&&l[e].parentNode&&l[e].remove&&l[e].remove();d.documentKeyDownSet&&(document.onkeydown=null)}))}();const n=i.logProgress?"":s;i.logResult&&console.log(`${n} Result:`,e),i.logProgress&&o&&console.groupEnd()}))}function S(){return t(this,void 0,void 0,(function*(){const e=!d.errorOccurred,o={success:e,log:r,message:i.message,configuration:i};return P(`Done, success: ${e}`),C(o),o}))}function M(){d.paused=!1,l.playButton.style.display="none",l.pauseButton.style.display="block",l.status.textContent=""}function k(){d.paused=!0,l.playButton.style.display="block",l.pauseButton.style.display="none",l.status.textContent="Paused"}function B(e){return t(this,void 0,void 0,(function*(){confirm(`[${i.messageAttribution}]: Are you sure you would like to stop '${i.message}'?`)&&(l.status.textContent="Stopping",yield function(e){return t(this,void 0,void 0,(function*(){d.continueActions=!1,document.contains(l.tooltip)&&(yield A(!1)),yield R(e,"",!1,!1)}))}(`Stopped by user (${e})`))}))}function L(e,o,n="info",r){return t(this,void 0,void 0,(function*(){if(!i.displayProgress)return;const s=document.body.getBoundingClientRect(),u=e.getBoundingClientRect(),a=r?0:window.pageYOffset||e.scrollTop||document.body.scrollTop,c=window.pageXOffset||e.scrollLeft||document.body.scrollLeft;l.focusBox=document.createElement("div"),l.focusBox.classList.add("user-routine-focus-box"),l.arrow=document.createElement("div"),l.arrow.classList.add("user-routine-arrow"),l.tooltip=document.createElement("div"),l.tooltip.classList.add("user-routine-tooltip"),"error"===n&&l.tooltip.classList.add("user-routine-tooltip-error"),l.tooltip.textContent=o.replace(/>>/g," "),i.tutorialMode&&(l.nextButton=document.createElement("button"),l.nextButton.textContent="Next",l.nextButton.classList.add("user-routine-next-button"),l.nextButton.addEventListener("click",(()=>t(this,void 0,void 0,(function*(){yield function(){return t(this,void 0,void 0,(function*(){d.nextButtonPressed=!0,yield A(!1)}))}()})))),l.tooltip.appendChild(l.nextButton)),document.body.appendChild(l.focusBox),document.body.appendChild(l.arrow),document.body.appendChild(l.tooltip);const p=l.tooltip.getBoundingClientRect().width;let y=u.bottom+10+a,f=u.left+c+u.width/2-10,g=u.left+c+u.width/2-p/2;f<8?f=8:s.right+c-f<20&&(f=s.right+c-20),g<0&&(g=0),r&&(l.focusBox.style.display="none",l.arrow.style.display="none",l.tooltip.style.position="fixed",f-=c,y-=5,g-=c),l.arrow.style.top=String(u.bottom+a+2)+"px",l.arrow.style.left=String(f)+"px",l.tooltip.style.top=String(y+2)+"px",l.tooltip.style.left=String(g)+"px",l.focusBox.style.top=String(u.top+a-2)+"px",l.focusBox.style.left=String(u.left+c-2)+"px",l.focusBox.style.width=String(u.width)+"px",l.focusBox.style.height=String(u.height)+"px",l.arrowShadow=l.arrow.cloneNode(!0),l.tooltipShadow=l.tooltip.cloneNode(!0),l.arrowShadow.classList.add("user-routine-arrow-shadow"),l.tooltipShadow.classList.add("user-routine-tooltip-shadow"),document.body.appendChild(l.arrowShadow),document.body.appendChild(l.tooltipShadow),i.displayProgress&&(yield function(e){return t(this,void 0,void 0,(function*(){(function(e){var o=e.getBoundingClientRect(),t=Math.max(document.documentElement.clientHeight,window.innerHeight);return!(o.bottom<0||o.top-t>=0)})(e)||(e.scrollIntoView({behavior:"smooth"}),yield E(700))}))}(l.tooltip)),l.focusBox.classList.add("user-routine-fade-in"),l.arrowShadow.classList.add("user-routine-fade-in"),l.tooltipShadow.classList.add("user-routine-fade-in"),l.arrow.classList.add("user-routine-fade-in"),l.tooltip.classList.add("user-routine-fade-in");let v=30*o.length<2500?30*o.length:2500;yield E((650+v)/i.displaySpeed)}))}function A(e=!0){return t(this,void 0,void 0,(function*(){i.displayProgress&&l.focusBox&&l.arrow&&l.tooltip&&l.arrowShadow&&l.tooltipShadow&&(e&&(yield E(500/i.displaySpeed)),l.focusBox.classList.add("user-routine-fade-out"),l.arrow.classList.add("user-routine-fade-out"),l.tooltip.classList.add("user-routine-fade-out"),l.arrowShadow.classList.add("user-routine-fade-out"),l.tooltipShadow.classList.add("user-routine-fade-out"),yield E(150/i.displaySpeed),l.focusBox.remove(),l.tooltip.remove(),l.arrow.remove(),l.tooltipShadow.remove(),l.arrowShadow.remove())}))}function P(e,o="log"){r.push(e);const t=`* ${e}`;i.logProgress&&"log"===o?console.log(t):i.logProgress&&"warn"===o&&console.warn(t)}function R(e,o,n=i.continueOnFailure,s=!0){return t(this,void 0,void 0,(function*(){d.errorOccurred=!0;let t=e+(o?`: '${o}'`:"");n?t+=". Continuing execution.":(d.continueActions=!1,t+=". Halting execution.");const u="FAIL: "+t;r.push(u),i.logProgress&&console.error(u),s&&(yield L(l.message,u,"error",!0),yield A())}))}function E(e){return t(this,void 0,void 0,(function*(){return yield function(){return t(this,void 0,void 0,(function*(){for(;d.paused&&d.continueActions;)yield N(i.globalDelay/2)}))}(),yield N(e)}))}function O(){return t(this,void 0,void 0,(function*(){for(;!d.nextButtonPressed&&d.continueActions;)yield N(i.globalDelay/2);d.nextButtonPressed=!1}))}function N(e){return t(this,void 0,void 0,(function*(){return new Promise((o=>setTimeout(o,e)))}))}}))}var i=self;for(var r in o)i[r]=o[r];o.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();

startUserRoutine();
