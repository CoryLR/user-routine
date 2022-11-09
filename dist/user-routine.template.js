
/* 
 * User Routine Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: 5.0.1
 * Description: Automated user routines for end-to-end testing or guided user tutorials. Small, portable, and zero setup. Click buttons, fill values, await results, etc.
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
    () => { if (logProgress) console.log('This is logging from a provided function!') },
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
# Usage

User Routine is served as a function named `userRoutine`.

**Some simple examples:**

Run a test:

```javascript
userRoutine([
  'click button.btn', // Target using CSS selectors
  'await div.result Result Text', // Await result text
]);
```

Display a tutorial:

```javascript
userRoutine([
  'comment .some-form First, fill this out',
  'comment .submit-button Then, hit Submit!',
], { message:'Tutorial', tutorialMode: true });
```

Example with more actions and options:

```javascript
userRoutine(
  [
    'fill input.class Some Text', // fill input value
    'wait 500', // wait half a second
    'click button.some-class', // click a button
    '!await .spinner', // await disappearance of a loading spinner
    'await div.output With this text', // await output message text
  ], {
    message: 'Example Test', // name of routine
    awaitTimeout: 2000, // maximum time to await
    continueOnFailure: true, // don't stop on errors
    displayProgress: false, // don't show progress tooltips
    globalDelay: 100, // shorten time between actions to 0.1 seconds
  },
);
```

Input parameter details:

* 1: Actions List (*String* (separate actions by new lines) or *Array of strings/functions*, required)
  * Action strings & examples:
    * `append` -- Add text, like `'append section>p Appended text'`
    * `await` -- Await for something to appear, like `'await .modal.success-message'` or `'await h1 With This Text'`
    * `!await` -- Await for something to disappear, like `'!await .spinner'` or `'!await h1 This title should disappear'`
    * `click` -- Click on something, like `'click button.submit'` or `'click button With This Text'`
    * `comment` -- Show a tooltip to point something out, like `'comment input.name Type your name here'`
    * `exists` -- Check to see if something exists, like `'exists .class-name'` or `'exists h1 With This Text'`
    * `!exists` -- Check to see if something doesn't exist, like `'!exists h1 Incorrect text'`
    * `fill` -- Fill the value attribute of an element, like `'fill form>input.name Cory Rahman'`
    * `log` -- Record a message, like `'log Some message'`
    * `nav` -- Use hash navigation, like `'nav #id'` or `'nav #/some/hash/routing/path'`
    * `value` -- Check the value attribute of an element, like `'value input.required'` or `'value input.name Test User 1'`
    * `wait` -- Wait for some time, like `'wait 3000'` (3 seconds)
    * `write` -- Overwrite textContent of an element, like `'write p Overwritten text'`
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

# 
*/

/* Minified User Routine code, provides function 'userRoutine' */ /* @ts-ignore */
(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{userRoutine:()=>n});var o=function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function s(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,d)}u((n=n.apply(e,t||[])).next())}))};function n(e,t={}){return o(this,void 0,void 0,(function*(){t.tutorialMode&&(t.globalDelay=200);const n=Object.freeze(Object.assign(Object.assign({},{awaitTimeout:15e3,continueOnFailure:!1,displayMessage:!0,displayProgress:!0,displaySpeed:1,globalDelay:500,logCollapse:!1,logProgress:!0,logResult:!0,message:"User Routine",messageAttribution:"User Routine",overrideCss:"",separator:" ",tutorialMode:!1}),t)),i=[],r=n.message?`[User Routine] ${n.message}`:"[User Routine]",s={paused:!1,errorOccurred:!1,continueActions:!0,documentKeyDownSet:!1,nextButtonPressed:!1};let d;const u={arrow:void 0,arrowShadow:void 0,focusBox:void 0,message:void 0,style:void 0,tooltip:void 0,tooltipShadow:void 0,nextButton:void 0,playButton:void 0,pauseButton:void 0,stopButton:void 0,status:void 0};if(!function(){if("undefined"==typeof document){let e="FAIL: document is undefined. User Routine can only be used in the browser. Halting execution.";return n.logProgress&&console.error(e),i.push(e),!1}const e=document.querySelector("body > .user-routine");if(e){let t=`FAIL: User Routine '${e.getAttribute("data-user-routine")}' is already running. Halting execution.`;return n.logProgress&&console.error(t),i.push(t),!1}return!0}()){const e={success:!1,log:i,message:n.message,configuration:n};return $(e,!1),e}(n.displayMessage||n.displayProgress)&&function(){o(this,void 0,void 0,(function*(){u.style=document.createElement("style"),u.style.textContent="\n      body > .user-routine {\n        font: 20px Arial;\n        padding: 18px 12px 6px 12px;\n        z-index: 9999;\n        position: fixed;\n        top: 0;\n        right: 10%;\n        color: black;\n        background-color: rgba(250,250,250,0.8);\n        text-align: center;\n        border-radius: 0 0 12px 12px;\n        max-width: 80vw;\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        border: 2px solid rgb(180,180,180);\n        border-top: 0;\n      }\n      body > .user-routine > .user-routine-footer {\n        width: 100%;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        line-height: 15px;\n        font-size: 12px;\n        margin-top: 5px;\n      }\n      body .user-routine-footer .user-routine-play {\n        display: none;\n      }\n      body .user-routine-footer .user-routine-play,\n      body .user-routine-footer .user-routine-pause,\n      body .user-routine-footer .user-routine-stop {\n        padding: 4px;\n      }\n      body .user-routine-footer .user-routine-play:hover,\n      body .user-routine-footer .user-routine-pause:hover,\n      body .user-routine-footer .user-routine-stop:hover {\n        cursor: pointer;\n      }\n      body > .user-routine > .user-routine-footer .user-routine-play-icon {\n        width: 0;\n        height: 0;\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        border-left: 8px solid rgb(191, 191, 191);\n      }\n      body > .user-routine > .user-routine-footer .user-routine-pause-icon {\n        width: 2px;\n        height: 8px;\n        border-left: 3px solid rgb(191, 191, 191);\n        border-right: 3px solid rgb(191, 191, 191);\n        margin: 1px 0;\n      }\n      body > .user-routine > .user-routine-footer .user-routine-stop-icon {\n        height: 8px;\n        width: 8px;\n        background-color: rgb(191, 191, 191);\n      }\n      body .user-routine-footer .user-routine-play:hover .user-routine-play-icon {\n        border-left: 8px solid rgb(80, 80, 80);\n      }\n      body .user-routine-footer .user-routine-pause:hover .user-routine-pause-icon {\n        border-left: 3px solid rgb(80, 80, 80);\n        border-right: 3px solid rgb(80, 80, 80);\n      }\n      body .user-routine-footer .user-routine-stop:hover .user-routine-stop-icon {\n        background-color: rgb(80, 80, 80);\n      }\n      body > .user-routine > .user-routine-footer > .user-routine-status,\n      body > .user-routine > .user-routine-footer > .user-routine-attribution {\n        text-align: left;\n        color: dimgray;\n      }\n      body > .user-routine > .user-routine-footer > .user-routine-status {\n        min-width: 60px;\n        min-height: 15px;\n        margin-left: 5px;\n        font-style: italic;\n      }\n      body > .user-routine > .user-routine-footer > .user-routine-attribution {\n        margin-left: auto;\n        padding-left: 5px;\n      }\n      body > .user-routine-focus-box {\n        z-index: 9997;\n        visibility: hidden;\n        position: absolute;\n        background-color: rgba(255,255,255,0.2);\n        border: 2px solid white;\n        box-shadow: 0 0 0 2px rgb(0,0,0);\n        pointer-events: none;\n      }\n      body > .user-routine-tooltip {\n        z-index: 9999;\n        visibility: hidden;\n        font: 14px Arial;\n        position: absolute;\n        background-color: rgb(245,245,245);\n        color: black;\n        text-align: center;\n        padding: 10px;\n        border-radius: 10px;\n        max-width: 200px;\n      }\n      body > .user-routine-tooltip-error {\n        color: darkred;\n      }\n      body > .user-routine-arrow {\n        z-index: 9999;\n        visibility: hidden;\n        width: 0;\n        height: 0;\n        position: absolute;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 10px solid rgb(245,245,245); \n      }\n      body > .user-routine-arrow-shadow {\n        z-index: 9998;\n        border-left: 14px solid transparent;\n        border-right: 14px solid transparent;\n        border-bottom: 14px solid rgb(180,180,180);\n        margin: -3px 0 0 -4px;\n      }\n      body > .user-routine-tooltip-shadow {\n        z-index: 9998;\n        color: transparent;\n        border: 2px solid rgb(180,180,180);\n        background-color: rgb(180,180,180);\n        margin: -2px 0 0 -2px;\n        border-radius: 12px;\n      }\n      body > .user-routine-tooltip .user-routine-next-button {\n        display: block;\n        margin: 5px auto 0 auto;\n        border-radius: 5px;\n        padding: 5px;\n        background-color: rgb(220,220,220);\n        border-width: 0;\n        cursor: pointer;\n      }\n      body > .user-routine-fade-in {\n        visibility: visible;\n        animation: userRoutinefadeIn 150ms; \n      }\n      body > .user-routine-fade-out {\n        opacity: 0;\n        animation: userRoutinefadeOut 150ms; \n      }\n      @keyframes userRoutinefadeIn {\n        0% { opacity: 0; }\n        100% { opacity: 1; }\n      }\n      @keyframes userRoutinefadeOut {\n        0% { opacity: 1; }\n        100% { opacity: 0; }\n      }\n    ",u.style.textContent+=n.overrideCss,document.querySelector("body").appendChild(u.style)}))}(),n.logProgress&&(n.logCollapse?console.groupCollapsed(r):console.group(r)),function(e){u.message=document.createElement("div");let t=`\n      ${e}\n      <div class="user-routine-footer">\n    `;n.tutorialMode||(t+='\n        <div class="user-routine-play" title="Play">\n          <div class="user-routine-play-icon"></div>\n        </div>\n        <div class="user-routine-pause" title="Pause">\n          <div class="user-routine-pause-icon"></div>\n        </div>\n      '),t+=`\n        <div class="user-routine-stop" title="Stop">\n          <div class="user-routine-stop-icon"></div>\n        </div>\n        <div class="user-routine-status"></div>\n        <div class="user-routine-attribution">${n.messageAttribution}</div>\n      </div>\n    `,u.message.innerHTML=t,u.message.setAttribute("data-user-routine",e),u.message.classList.add("user-routine"),n.displayMessage||(u.message.style.visibility="hidden"),document.querySelector("body").appendChild(u.message),u.playButton=document.querySelector(".user-routine .user-routine-play"),u.pauseButton=document.querySelector(".user-routine .user-routine-pause"),u.stopButton=document.querySelector(".user-routine .user-routine-stop"),u.status=document.querySelector(".user-routine .user-routine-status"),n.tutorialMode||(u.playButton.addEventListener("click",(()=>o(this,void 0,void 0,(function*(){S()})))),u.pauseButton.addEventListener("click",(()=>o(this,void 0,void 0,(function*(){M()}))))),u.stopButton.addEventListener("click",(()=>o(this,void 0,void 0,(function*(){yield B("pause button")})))),null===document.onkeydown&&n.displayProgress&&!n.tutorialMode&&(document.onkeydown=e=>o(this,void 0,void 0,(function*(){"Escape"===e.key?yield B("escape key"):" "===e.key&&(s.paused?S():M())})),s.documentKeyDownSet=!0)}(n.message);const l=yield function(e,t){return o(this,void 0,void 0,(function*(){let o=!0;return void 0===e?(o=!1,yield P("Missing required argument Action List","",!1)):Array.isArray(e)||"string"==typeof e||(o=!1,yield P("Action list argument is not an Array or string","",!1)),void 0===t||"object"==typeof t&&!Array.isArray(t)||(o=!1,yield P("Options argument is not an Object","",!1)),o}))}(e,t);if(!l)return C();const a=function(e){return"string"==typeof e?e.split("\n").map((e=>e.trimStart())):Array.isArray(e)?e.map((e=>"string"==typeof e?e.trimStart():e)):void 0}(e);for(const e of a){if(!s.continueActions)return C();yield E(n.globalDelay);try{yield c(e)}catch(e){yield P("Unexpected error: "+e.message)}}return C();function c(e){return o(this,void 0,void 0,(function*(){if("string"==typeof e)yield function(e){return o(this,void 0,void 0,(function*(){const t=e.replace("!","").substring(0,3);if("nav"===t){const t=e.split(n.separator)[1];t&&"#"===t[0]?(yield p((()=>{window.location.href=t}),`Navigating to ${t}`,void 0,!n.tutorialMode),A(`Navigated to ${t}`)):yield P("Unexpected nav action, got",e)}else if("cli"===t){const[t,o,i]=yield w(e),r=x(o,i);if(i){const e=g(o);d=void 0,v(e,i,b),d?(yield p((()=>{d.click()}),`Clicking ${d.tagName.toLowerCase()} with text '${i}'`,d,!n.tutorialMode),A(`Clicked text '${i}' inside ${o} (clicked on ${d.tagName.toLowerCase()})`)):yield P("Could not find selector to click",r),d=void 0}else{const e=yield y(o);if(!e)return;yield p((()=>{e.click()}),`Clicking ${e.tagName.toLowerCase()}`,e,!n.tutorialMode),A(`Clicked ${o}`)}}else if("exi"===t){let[t,o,i]=yield w(e),r=!1;"!"===e[0]&&(r=!0);const s=x(o,i);let l,a=!1;if(i){const e=g(o,!1);d=void 0,v(e,i,b),d&&(l=d,a=!0)}else{const e=f(o,!1);e&&(a=!0,l=e)}a&&!r?(n.tutorialMode||(yield k(l,`Confirmed exists: ${s}`,"info")),n.tutorialMode||(yield L()),A(`Confirmed exists: ${s}`)):a||r?a&&r?(n.tutorialMode||(yield k(l,`Incorrectly exists: ${s}`,"error")),n.tutorialMode||(yield L()),yield P(`Incorrectly exists: ${s}`)):!a&&r&&(n.tutorialMode||(yield k(u.message,`Confirmed does not exist: ${s}`,"info",!0)),n.tutorialMode||(yield L()),A(`Confirmed does not exist: ${s}`)):yield P("Did not exist",s),d=void 0}else if("fil"===t){const[t,o,i]=yield h(e),r=yield y(o);if(!r)return;yield p((()=>{r.value=i,r.dispatchEvent(new InputEvent("input"))}),`Filling value of ${r.tagName.toLowerCase()}`,r,!n.tutorialMode),A(`Filled the value of ${o} to '${i}'`)}else if("val"===t){const[t,o,i]=yield w(e),r=yield y(o);if(!r)return;void 0!==r.value&&null!==r.value||(n.tutorialMode||(yield k(r,"Element cannot have a value","error")),n.tutorialMode||(yield L()),yield P(`Element ${o} (${r.tagName.toLowerCase()}) did not have a value attribute`)),null==i?""!==r.value?(n.tutorialMode||(yield k(r,"Confirmed has a value","info")),n.tutorialMode||(yield L()),A(`Element '${o}' had a value ('${r.value}')`)):(n.tutorialMode||(yield k(r,"Expected value to exist","error")),n.tutorialMode||(yield L()),yield P(`Element '${o}' did not have a value`)):r.value===i?(n.tutorialMode||(yield k(r,"Value is correct","info")),n.tutorialMode||(yield L()),A(`Element '${o}' has the correct value: '${r.value}'`)):(n.tutorialMode||(yield k(r,`Expected a value of '${i}'`,"error")),n.tutorialMode||(yield L()),yield P(`Element '${o}' has an incorrect value, expected '${i}' but saw '${r.value}'`))}else if("wri"===t||"app"===t){const[o,i,r]=yield h(e),s=yield y(i);if(!s)return;let d=r||"";"wri"===t?(yield p((()=>{s.textContent=d}),`Writing over ${i}`,s,!n.tutorialMode),A(`Wrote '${d}' over ${i}`)):(yield p((()=>{s.textContent+=d}),`Appending text to ${i}`,s,!n.tutorialMode),A(`Appended '${d}' to ${i}`))}else if("log"===t){let t,o;" "!==n.separator?[t,o]=e.split(n.separator):[t,o]=e.split(/ (.*)/s),n.tutorialMode&&(s.nextButtonPressed=!1),yield p((()=>{A(o)}),`${o}`),n.tutorialMode&&(yield R())}else if("com"===t){const[t,o,i]=yield w(e);if(!i)return void(yield P(`Value was not provided for comment action '${e}'`));const r=yield y(o);if(!r)return;n.tutorialMode&&(s.nextButtonPressed=!1),yield k(r,i,"info"),n.tutorialMode||(yield L()),n.tutorialMode&&(yield R())}else if("wai"===t){const[t,i]=e.split(n.separator);A(`Waiting ${Number(i)/1e3} second(s)`),yield p((()=>o(this,void 0,void 0,(function*(){yield function(e){return o(this,void 0,void 0,(function*(){if(e<=n.globalDelay/2)yield O(e);else{const t=e/n.globalDelay*2,o=e%n.globalDelay/2;for(let e=0;e<t;e++)yield E(n.globalDelay/2);yield E(o)}}))}(Number(i))}))),`Waiting ${Number(i)/1e3} second(s)`,void 0,!n.tutorialMode)}else if("awa"===t){let[t,o,i]=yield w(e),r=!1;"!"===e[0]&&(r=!0);const s=n.awaitTimeout/n.globalDelay*2;let l,a=!1;const c=x(o,i);A(`Awaiting ${c}...`);const p=r?`Awaiting ${c} to not exist...`:`Awaiting ${c}...`;n.tutorialMode||(yield k(u.message,p,"info",!0));for(let e=0;e<s;e++){if(i){const e=Array.from(g(o.replace(/>>/g," ")));for(const t of e)if(t&&t.textContent&&t.textContent.toLowerCase().includes(i.toLowerCase())){a=!0,d=void 0,v([t],i,b),l=d;break}}else{const e=f(o);e&&(a=!0,l=e)}if(a&&!r)break;if(!a&&r)break;a=!1,yield E(n.globalDelay/2)}n.tutorialMode||(yield L()),a&&!r?(n.tutorialMode||(yield k(l,`...Found ${c}`,"info")),n.tutorialMode||(yield L()),A(`...Found ${c}`)):a||r?a&&r?(n.tutorialMode||(yield k(l,`...Timed out awaiting ${c} to not exist`,"error")),n.tutorialMode||(yield L()),yield P(`...Timed out awaiting ${c} to not exist`)):!a&&r&&A(`...${c} disappeared`):yield P(`Timed out after ${n.awaitTimeout/1e3} second(s) awaiting`,c)}else""===e||(yield P("Action string keyword not recognized, got",e))}))}(e);else if("function"==typeof e)try{yield p(e,"Running provided function",void 0,!n.tutorialMode),A("Ran provided function")}catch(t){yield L(),yield P("Error running provided function",t+"; function: "+e.toString())}else yield P("Action is not of type string or function, got",typeof e)}))}function p(e,t,i,r=!0){return o(this,void 0,void 0,(function*(){let o=!1;i||(i=u.message?u.message:document.body,o=!0),r&&(yield k(i,t,"info",o)),yield e(),r&&!n.tutorialMode&&(yield L())}))}function y(e){return o(this,void 0,void 0,(function*(){const t=f(e);return t||(yield P("CSS Selector not found",e.replace(/>>/g," "))),t}))}function f(e,t=!0){const o=e.replace(/>>/g," ");return document.querySelector(o)}function g(e,t=!0){const o=e.replace(/>>/g," ");return document.querySelectorAll(o)}function v(e,t,o=(e=>"SCRIPT"!==e.tagName)){for(const n of e)m(n,t)&&(o(n)&&(d=n),v(Array.from(n.childNodes).filter((e=>{if(o(e))return e})),t,o))}function b(e){return e.click&&"SCRIPT"!==e.tagName}function m(e,t){const o=t.toLowerCase(),n=e.textContent&&e.textContent.toLowerCase().includes(o),i="string"==typeof e.value&&e.value.toLowerCase().includes(o);return n||i}function x(e,t){return`'${e}'`+(t?` containing text '${t}'`:"")}function h(e){return o(this,void 0,void 0,(function*(){if(" "!==n.separator)return e.split(n.separator);const t=e.split(/ ([^\s]+) (.*)/s);return t.length<3&&(yield P("Unexpected input with data, got",e)),t[1]=t[1].replace(/>>/g," "),t}))}function w(e){return o(this,void 0,void 0,(function*(){const t=e.split(n.separator);return" "!==n.separator?t:t.length>2?yield h(e):(t[1]=t[1].replace(/>>/g," "),t)}))}function $(e,t=!0){return o(this,void 0,void 0,(function*(){!function(){o(this,void 0,void 0,(function*(){for(const e in u)u[e]&&u[e].parentNode&&u[e].remove&&u[e].remove();s.documentKeyDownSet&&(document.onkeydown=null)}))}();const i=n.logProgress?"":r;n.logResult&&console.log(`${i} Result:`,e),n.logProgress&&t&&console.groupEnd()}))}function C(){return o(this,void 0,void 0,(function*(){const e=!s.errorOccurred,t={success:e,log:i,message:n.message,configuration:n};return A(`Done, success: ${e}`),$(t),t}))}function S(){s.paused=!1,u.playButton.style.display="none",u.pauseButton.style.display="block",u.status.textContent=""}function M(){s.paused=!0,u.playButton.style.display="block",u.pauseButton.style.display="none",u.status.textContent="Paused"}function B(e){return o(this,void 0,void 0,(function*(){confirm(`[${n.messageAttribution}]: Are you sure you would like to stop '${n.message}'?`)&&(u.status.textContent="Stopping",yield function(e){return o(this,void 0,void 0,(function*(){s.continueActions=!1,document.contains(u.tooltip)&&(yield L(!1)),yield P(e,"",!1,!1)}))}(`Stopped by user (${e})`))}))}function k(e,t,i="info",r){return o(this,void 0,void 0,(function*(){if(!n.displayProgress)return;const d=document.body.getBoundingClientRect(),l=e.getBoundingClientRect(),a=r?0:window.pageYOffset||e.scrollTop||document.body.scrollTop,c=window.pageXOffset||e.scrollLeft||document.body.scrollLeft;u.focusBox=document.createElement("div"),u.focusBox.classList.add("user-routine-focus-box"),u.arrow=document.createElement("div"),u.arrow.classList.add("user-routine-arrow"),u.tooltip=document.createElement("div"),u.tooltip.classList.add("user-routine-tooltip"),"error"===i&&u.tooltip.classList.add("user-routine-tooltip-error"),u.tooltip.textContent=t.replace(/>>/g," "),n.tutorialMode&&(u.nextButton=document.createElement("button"),u.nextButton.textContent="Next",u.nextButton.classList.add("user-routine-next-button"),u.nextButton.addEventListener("click",(()=>o(this,void 0,void 0,(function*(){yield function(){return o(this,void 0,void 0,(function*(){s.nextButtonPressed=!0,yield L(!1)}))}()})))),u.tooltip.appendChild(u.nextButton)),document.body.appendChild(u.focusBox),document.body.appendChild(u.arrow),document.body.appendChild(u.tooltip);const p=u.tooltip.getBoundingClientRect().width;let y=l.bottom+10+a,f=l.left+c+l.width/2-10,g=l.left+c+l.width/2-p/2;f<8?f=8:d.right+c-f<20&&(f=d.right+c-20),g<0&&(g=0),r&&(u.focusBox.style.display="none",u.arrow.style.display="none",u.tooltip.style.position="fixed",f-=c,y-=5,g-=c),u.arrow.style.top=String(l.bottom+a+2)+"px",u.arrow.style.left=String(f)+"px",u.tooltip.style.top=String(y+2)+"px",u.tooltip.style.left=String(g)+"px",u.focusBox.style.top=String(l.top+a-2)+"px",u.focusBox.style.left=String(l.left+c-2)+"px",u.focusBox.style.width=String(l.width)+"px",u.focusBox.style.height=String(l.height)+"px",u.arrowShadow=u.arrow.cloneNode(!0),u.tooltipShadow=u.tooltip.cloneNode(!0),u.arrowShadow.classList.add("user-routine-arrow-shadow"),u.tooltipShadow.classList.add("user-routine-tooltip-shadow"),document.body.appendChild(u.arrowShadow),document.body.appendChild(u.tooltipShadow),yield function(e){return o(this,void 0,void 0,(function*(){(function(e){var t=e.getBoundingClientRect(),o=Math.max(document.documentElement.clientHeight,window.innerHeight);return!(t.bottom<0||t.top-o>=0)})(e)||(e.scrollIntoView({behavior:"smooth"}),yield E(700))}))}(e),u.focusBox.classList.add("user-routine-fade-in"),u.arrowShadow.classList.add("user-routine-fade-in"),u.tooltipShadow.classList.add("user-routine-fade-in"),u.arrow.classList.add("user-routine-fade-in"),u.tooltip.classList.add("user-routine-fade-in");let v=30*t.length<2e3?30*t.length:2e3;yield E((650+v)/n.displaySpeed)}))}function L(e=!0){return o(this,void 0,void 0,(function*(){n.displayProgress&&u.focusBox&&u.arrow&&u.tooltip&&u.arrowShadow&&u.tooltipShadow&&(e&&(yield E(500)),u.focusBox.classList.add("user-routine-fade-out"),u.arrow.classList.add("user-routine-fade-out"),u.tooltip.classList.add("user-routine-fade-out"),u.arrowShadow.classList.add("user-routine-fade-out"),u.tooltipShadow.classList.add("user-routine-fade-out"),yield E(150),u.focusBox.remove(),u.tooltip.remove(),u.arrow.remove(),u.tooltipShadow.remove(),u.arrowShadow.remove())}))}function A(e){i.push(e);const t=`* ${e}`;n.logProgress&&console.log(t)}function P(e,t,r=n.continueOnFailure,d=!0){return o(this,void 0,void 0,(function*(){s.errorOccurred=!0;let o=e+(t?`: '${t}'`:"");r?o+=". Continuing execution.":(s.continueActions=!1,o+=". Halting execution.");const l="FAIL: "+o;i.push(l),n.logProgress&&console.error(l),d&&(yield k(u.message,l,"error",!0),yield L())}))}function E(e){return o(this,void 0,void 0,(function*(){return yield function(){return o(this,void 0,void 0,(function*(){for(;s.paused&&s.continueActions;)yield O(n.globalDelay/2)}))}(),yield O(e)}))}function R(){return o(this,void 0,void 0,(function*(){for(;!s.nextButtonPressed&&s.continueActions;)yield O(n.globalDelay/2);s.nextButtonPressed=!1}))}function O(e){return o(this,void 0,void 0,(function*(){return new Promise((t=>setTimeout(t,e)))}))}}))}var i=self;for(var r in t)i[r]=t[r];t.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();

startUserRoutine();
