
/* 
 * Dry-Run Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: 5.0.0
 * Description: Automated routines for single-page applications (SPAs), useful for end-to-end-testing and guided tutorials. Small, portable, and easy to use. Click buttons, fill values, await results, guide users, etc.
*/

/**
 * Dry-Run examples, replace with your tests
*/
async function startDryRun() {
  
  await dryRun([
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

Dry-Run is served as a function named `dryRun`.

**Some simple examples:**

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

# 
*/

/* Minified Dry-Run code, provides function 'dryRun' */ /* @ts-ignore */
(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{dryRun:()=>n});var e=function(t,o,e,n){return new(e||(e=Promise))((function(r,i){function d(t){try{s(n.next(t))}catch(t){i(t)}}function l(t){try{s(n.throw(t))}catch(t){i(t)}}function s(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(d,l)}s((n=n.apply(t,o||[])).next())}))};function n(t,o={}){return e(this,void 0,void 0,(function*(){o.tutorialMode&&(o.globalDelay=200);const n=Object.freeze(Object.assign(Object.assign({},{awaitTimeout:15e3,continueOnFailure:!1,displayMessage:!0,displayProgress:!0,displaySpeed:1,globalDelay:500,logCollapse:!1,logProgress:!0,logResult:!0,message:"Dry-Run",messageAttribution:"Dry-Run",overrideCss:"",separator:" ",tutorialMode:!1}),o)),r=[],i=n.message?`[Dry-Run] ${n.message}`:"[Dry-Run]",d={paused:!1,errorOccurred:!1,continueActions:!0,documentKeyDownSet:!1,nextButtonPressed:!1};let l;const s={arrow:void 0,arrowShadow:void 0,focusBox:void 0,message:void 0,style:void 0,tooltip:void 0,tooltipShadow:void 0,nextButton:void 0,playButton:void 0,pauseButton:void 0,stopButton:void 0,status:void 0};if(!function(){if("undefined"==typeof document){let t="FAIL: document is undefined. Dry-Run can only be used in the browser. Halting execution.";return n.logProgress&&console.error(t),r.push(t),!1}const t=document.querySelector("body > .dry-run");if(t){let o=`FAIL: Dry-Run '${t.getAttribute("data-dry-run")}' is already running. Halting execution.`;return n.logProgress&&console.error(o),r.push(o),!1}return!0}()){const t={success:!1,log:r,message:n.message};return $(t,!1),t}(n.displayMessage||n.displayProgress)&&function(){e(this,void 0,void 0,(function*(){s.style=document.createElement("style"),s.style.textContent="\n      body > .dry-run {\n        font: 20px Arial;\n        padding: 18px 12px 6px 12px;\n        z-index: 9999;\n        position: fixed;\n        top: 0;\n        right: 10%;\n        color: black;\n        background-color: rgba(250,250,250,0.8);\n        text-align: center;\n        border-radius: 0 0 12px 12px;\n        max-width: 80vw;\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        border: 2px solid rgb(180,180,180);\n        border-top: 0;\n      }\n      body > .dry-run > .dry-run-footer {\n        width: 100%;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        line-height: 15px;\n        font-size: 12px;\n        margin-top: 5px;\n      }\n      body .dry-run-footer .dry-run-play {\n        display: none;\n      }\n      body .dry-run-footer .dry-run-play,\n      body .dry-run-footer .dry-run-pause,\n      body .dry-run-footer .dry-run-stop {\n        padding: 4px;\n      }\n      body .dry-run-footer .dry-run-play:hover,\n      body .dry-run-footer .dry-run-pause:hover,\n      body .dry-run-footer .dry-run-stop:hover {\n        cursor: pointer;\n      }\n      body > .dry-run > .dry-run-footer .dry-run-play-icon {\n        width: 0;\n        height: 0;\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        border-left: 8px solid rgb(191, 191, 191);\n      }\n      body > .dry-run > .dry-run-footer .dry-run-pause-icon {\n        width: 2px;\n        height: 8px;\n        border-left: 3px solid rgb(191, 191, 191);\n        border-right: 3px solid rgb(191, 191, 191);\n        margin: 1px 0;\n      }\n      body > .dry-run > .dry-run-footer .dry-run-stop-icon {\n        height: 8px;\n        width: 8px;\n        background-color: rgb(191, 191, 191);\n      }\n      body .dry-run-footer .dry-run-play:hover .dry-run-play-icon {\n        border-left: 8px solid rgb(80, 80, 80);\n      }\n      body .dry-run-footer .dry-run-pause:hover .dry-run-pause-icon {\n        border-left: 3px solid rgb(80, 80, 80);\n        border-right: 3px solid rgb(80, 80, 80);\n      }\n      body .dry-run-footer .dry-run-stop:hover .dry-run-stop-icon {\n        background-color: rgb(80, 80, 80);\n      }\n      body > .dry-run > .dry-run-footer > .dry-run-status,\n      body > .dry-run > .dry-run-footer > .dry-run-attribution {\n        text-align: left;\n        color: dimgray;\n      }\n      body > .dry-run > .dry-run-footer > .dry-run-status {\n        min-width: 60px;\n        min-height: 15px;\n        margin-left: 5px;\n        font-style: italic;\n      }\n      body > .dry-run > .dry-run-footer > .dry-run-attribution {\n        margin-left: auto;\n        padding-left: 5px;\n      }\n      body > .dry-run-focus-box {\n        z-index: 9997;\n        visibility: hidden;\n        position: absolute;\n        background-color: rgba(255,255,255,0.2);\n        border: 2px solid white;\n        box-shadow: 0 0 0 2px rgb(0,0,0);\n        pointer-events: none;\n      }\n      body > .dry-run-tooltip {\n        z-index: 9999;\n        visibility: hidden;\n        font: 14px Arial;\n        position: absolute;\n        background-color: rgb(245,245,245);\n        color: black;\n        text-align: center;\n        padding: 10px;\n        border-radius: 10px;\n        max-width: 200px;\n      }\n      body > .dry-run-tooltip-error {\n        color: darkred;\n      }\n      body > .dry-run-arrow {\n        z-index: 9999;\n        visibility: hidden;\n        width: 0;\n        height: 0;\n        position: absolute;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 10px solid rgb(245,245,245); \n      }\n      body > .dry-run-arrow-shadow {\n        z-index: 9998;\n        border-left: 14px solid transparent;\n        border-right: 14px solid transparent;\n        border-bottom: 14px solid rgb(180,180,180);\n        margin: -3px 0 0 -4px;\n      }\n      body > .dry-run-tooltip-shadow {\n        z-index: 9998;\n        color: transparent;\n        border: 2px solid rgb(180,180,180);\n        background-color: rgb(180,180,180);\n        margin: -2px 0 0 -2px;\n        border-radius: 12px;\n      }\n      body > .dry-run-tooltip .dry-run-next-button {\n        display: block;\n        margin: 5px auto 0 auto;\n        border-radius: 5px;\n        padding: 5px;\n        background-color: rgb(220,220,220);\n        border-width: 0;\n        cursor: pointer;\n      }\n      body > .dry-run-fade-in {\n        visibility: visible;\n        animation: dryRunfadeIn 150ms; \n      }\n      body > .dry-run-fade-out {\n        opacity: 0;\n        animation: dryRunfadeOut 150ms; \n      }\n      @keyframes dryRunfadeIn {\n        0% { opacity: 0; }\n        100% { opacity: 1; }\n      }\n      @keyframes dryRunfadeOut {\n        0% { opacity: 1; }\n        100% { opacity: 0; }\n      }\n    ",s.style.textContent+=n.overrideCss,document.querySelector("body").appendChild(s.style)}))}(),n.logProgress&&(n.logCollapse?console.groupCollapsed(i):console.group(i)),function(t){s.message=document.createElement("div");let o=`\n      ${t}\n      <div class="dry-run-footer">\n    `;n.tutorialMode||(o+='\n        <div class="dry-run-play" title="Play">\n          <div class="dry-run-play-icon"></div>\n        </div>\n        <div class="dry-run-pause" title="Pause">\n          <div class="dry-run-pause-icon"></div>\n        </div>\n      '),o+=`\n        <div class="dry-run-stop" title="Stop">\n          <div class="dry-run-stop-icon"></div>\n        </div>\n        <div class="dry-run-status"></div>\n        <div class="dry-run-attribution">${n.messageAttribution}</div>\n      </div>\n    `,s.message.innerHTML=o,s.message.setAttribute("data-dry-run",t),s.message.classList.add("dry-run"),n.displayMessage||(s.message.style.visibility="hidden"),document.querySelector("body").appendChild(s.message),s.playButton=document.querySelector(".dry-run .dry-run-play"),s.pauseButton=document.querySelector(".dry-run .dry-run-pause"),s.stopButton=document.querySelector(".dry-run .dry-run-stop"),s.status=document.querySelector(".dry-run .dry-run-status"),n.tutorialMode||(s.playButton.addEventListener("click",(()=>e(this,void 0,void 0,(function*(){S()})))),s.pauseButton.addEventListener("click",(()=>e(this,void 0,void 0,(function*(){M()}))))),s.stopButton.addEventListener("click",(()=>e(this,void 0,void 0,(function*(){yield B("pause button")})))),null===document.onkeydown&&n.displayProgress&&!n.tutorialMode&&(document.onkeydown=t=>e(this,void 0,void 0,(function*(){"Escape"===t.key?yield B("escape key"):" "===t.key&&(d.paused?S():M())})),d.documentKeyDownSet=!0)}(n.message);const a=yield function(t,o){return e(this,void 0,void 0,(function*(){let e=!0;return void 0===t?(e=!1,yield P("Missing required argument Action List","",!1)):Array.isArray(t)||"string"==typeof t||(e=!1,yield P("Action list argument is not an Array or string","",!1)),void 0===o||"object"==typeof o&&!Array.isArray(o)||(e=!1,yield P("Options argument is not an Object","",!1)),e}))}(t,o);if(!a)return C();const u=function(t){return"string"==typeof t?t.split("\n").map((t=>t.trimStart())):Array.isArray(t)?t.map((t=>"string"==typeof t?t.trimStart():t)):void 0}(t);for(const t of u){if(!d.continueActions)return C();yield E(n.globalDelay);try{yield c(t)}catch(t){yield P("Unexpected error: "+t.message)}}return C();function c(t){return e(this,void 0,void 0,(function*(){if("string"==typeof t)yield function(t){return e(this,void 0,void 0,(function*(){const o=t.replace("!","").substring(0,3);if("nav"===o){const o=t.split(n.separator)[1];o&&"#"===o[0]?(yield y((()=>{window.location.href=o}),`Navigating to ${o}`,void 0,!n.tutorialMode),A(`Navigated to ${o}`)):yield P("Unexpected nav action, got",t)}else if("cli"===o){const[o,e,r]=yield w(t),i=x(e,r);if(r){const t=g(e);l=void 0,v(t,r,b),l?(yield y((()=>{l.click()}),`Clicking ${l.tagName.toLowerCase()} with text '${r}'`,l,!n.tutorialMode),A(`Clicked text '${r}' inside ${e} (clicked on ${l.tagName.toLowerCase()})`)):yield P("Could not find selector to click",i),l=void 0}else{const t=yield p(e);if(!t)return;yield y((()=>{t.click()}),`Clicking ${t.tagName.toLowerCase()}`,t,!n.tutorialMode),A(`Clicked ${e}`)}}else if("exi"===o){let[o,e,r]=yield w(t),i=!1;"!"===t[0]&&(i=!0);const d=x(e,r);let a,u=!1;if(r){const t=g(e,!1);l=void 0,v(t,r,b),l&&(a=l,u=!0)}else{const t=f(e,!1);t&&(u=!0,a=t)}u&&!i?(n.tutorialMode||(yield k(a,`Confirmed exists: ${d}`,"info")),n.tutorialMode||(yield L()),A(`Confirmed exists: ${d}`)):u||i?u&&i?(n.tutorialMode||(yield k(a,`Incorrectly exists: ${d}`,"error")),n.tutorialMode||(yield L()),yield P(`Incorrectly exists: ${d}`)):!u&&i&&(n.tutorialMode||(yield k(s.message,`Confirmed does not exist: ${d}`,"info",!0)),n.tutorialMode||(yield L()),A(`Confirmed does not exist: ${d}`)):yield P("Did not exist",d),l=void 0}else if("fil"===o){const[o,e,r]=yield h(t),i=yield p(e);if(!i)return;yield y((()=>{i.value=r,i.dispatchEvent(new InputEvent("input"))}),`Filling value of ${i.tagName.toLowerCase()}`,i,!n.tutorialMode),A(`Filled the value of ${e} to '${r}'`)}else if("val"===o){const[o,e,r]=yield w(t),i=yield p(e);if(!i)return;void 0!==i.value&&null!==i.value||(n.tutorialMode||(yield k(i,"Element cannot have a value","error")),n.tutorialMode||(yield L()),yield P(`Element ${e} (${i.tagName.toLowerCase()}) did not have a value attribute`)),null==r?""!==i.value?(n.tutorialMode||(yield k(i,"Confirmed has a value","info")),n.tutorialMode||(yield L()),A(`Element '${e}' had a value ('${i.value}')`)):(n.tutorialMode||(yield k(i,"Expected value to exist","error")),n.tutorialMode||(yield L()),yield P(`Element '${e}' did not have a value`)):i.value===r?(n.tutorialMode||(yield k(i,"Value is correct","info")),n.tutorialMode||(yield L()),A(`Element '${e}' has the correct value: '${i.value}'`)):(n.tutorialMode||(yield k(i,`Expected a value of '${r}'`,"error")),n.tutorialMode||(yield L()),yield P(`Element '${e}' has an incorrect value, expected '${r}' but saw '${i.value}'`))}else if("wri"===o||"app"===o){const[e,r,i]=yield h(t),d=yield p(r);if(!d)return;let l=i||"";"wri"===o?(yield y((()=>{d.textContent=l}),`Writing over ${r}`,d,!n.tutorialMode),A(`Wrote '${l}' over ${r}`)):(yield y((()=>{d.textContent+=l}),`Appending text to ${r}`,d,!n.tutorialMode),A(`Appended '${l}' to ${r}`))}else if("log"===o){let o,e;" "!==n.separator?[o,e]=t.split(n.separator):[o,e]=t.split(/ (.*)/s),n.tutorialMode&&(d.nextButtonPressed=!1),yield y((()=>{A(e)}),`${e}`),n.tutorialMode&&(yield D())}else if("com"===o){const[o,e,r]=yield w(t);if(!r)return void(yield P(`Value was not provided for comment action '${t}'`));const i=yield p(e);if(!i)return;n.tutorialMode&&(d.nextButtonPressed=!1),yield k(i,r,"info"),n.tutorialMode||(yield L()),n.tutorialMode&&(yield D())}else if("wai"===o){const[o,r]=t.split(n.separator);A(`Waiting ${Number(r)/1e3} second(s)`),yield y((()=>e(this,void 0,void 0,(function*(){yield function(t){return e(this,void 0,void 0,(function*(){if(t<=n.globalDelay/2)yield R(t);else{const o=t/n.globalDelay*2,e=t%n.globalDelay/2;for(let t=0;t<o;t++)yield E(n.globalDelay/2);yield E(e)}}))}(Number(r))}))),`Waiting ${Number(r)/1e3} second(s)`,void 0,!n.tutorialMode)}else if("awa"===o){let[o,e,r]=yield w(t),i=!1;"!"===t[0]&&(i=!0);const d=n.awaitTimeout/n.globalDelay*2;let a,u=!1;const c=x(e,r);A(`Awaiting ${c}...`);const y=i?`Awaiting ${c} to not exist...`:`Awaiting ${c}...`;n.tutorialMode||(yield k(s.message,y,"info",!0));for(let t=0;t<d;t++){if(r){const t=Array.from(g(e.replace(/>>/g," ")));for(const o of t)if(o&&o.textContent&&o.textContent.toLowerCase().includes(r.toLowerCase())){u=!0,l=void 0,v([o],r,b),a=l;break}}else{const t=f(e);t&&(u=!0,a=t)}if(u&&!i)break;if(!u&&i)break;u=!1,yield E(n.globalDelay/2)}n.tutorialMode||(yield L()),u&&!i?(n.tutorialMode||(yield k(a,`...Found ${c}`,"info")),n.tutorialMode||(yield L()),A(`...Found ${c}`)):u||i?u&&i?(n.tutorialMode||(yield k(a,`...Timed out awaiting ${c} to not exist`,"error")),n.tutorialMode||(yield L()),yield P(`...Timed out awaiting ${c} to not exist`)):!u&&i&&A(`...${c} disappeared`):yield P(`Timed out after ${n.awaitTimeout/1e3} second(s) awaiting`,c)}else""===t||(yield P("Action string keyword not recognized, got",t))}))}(t);else if("function"==typeof t)try{yield y(t,"Running provided function",void 0,!n.tutorialMode),A("Ran provided function")}catch(o){yield L(),yield P("Error running provided function",o+"; function: "+t.toString())}else yield P("Action is not of type string or function, got",typeof t)}))}function y(t,o,r,i=!0){return e(this,void 0,void 0,(function*(){let e=!1;r||(r=s.message?s.message:document.body,e=!0),i&&(yield k(r,o,"info",e)),yield t(),i&&!n.tutorialMode&&(yield L())}))}function p(t){return e(this,void 0,void 0,(function*(){const o=f(t);return o||(yield P("CSS Selector not found",t.replace(/>>/g," "))),o}))}function f(t,o=!0){const e=t.replace(/>>/g," ");return document.querySelector(e)}function g(t,o=!0){const e=t.replace(/>>/g," ");return document.querySelectorAll(e)}function v(t,o,e=(t=>"SCRIPT"!==t.tagName)){for(const n of t)m(n,o)&&(e(n)&&(l=n),v(Array.from(n.childNodes).filter((t=>{if(e(t))return t})),o,e))}function b(t){return t.click&&"SCRIPT"!==t.tagName}function m(t,o){const e=o.toLowerCase(),n=t.textContent&&t.textContent.toLowerCase().includes(e),r="string"==typeof t.value&&t.value.toLowerCase().includes(e);return n||r}function x(t,o){return`'${t}'`+(o?` containing text '${o}'`:"")}function h(t){return e(this,void 0,void 0,(function*(){if(" "!==n.separator)return t.split(n.separator);const o=t.split(/ ([^\s]+) (.*)/s);return o.length<3&&(yield P("Unexpected input with data, got",t)),o[1]=o[1].replace(/>>/g," "),o}))}function w(t){return e(this,void 0,void 0,(function*(){const o=t.split(n.separator);return" "!==n.separator?o:o.length>2?yield h(t):(o[1]=o[1].replace(/>>/g," "),o)}))}function $(t,o=!0){return e(this,void 0,void 0,(function*(){!function(){e(this,void 0,void 0,(function*(){for(const t in s)s[t]&&s[t].parentNode&&s[t].remove&&s[t].remove();d.documentKeyDownSet&&(document.onkeydown=null)}))}();const r=n.logProgress?"":i;n.logResult&&console.log(`${r} Result:`,t),n.logProgress&&o&&console.groupEnd()}))}function C(){return e(this,void 0,void 0,(function*(){const t=!d.errorOccurred,o={success:t,log:r,message:n.message};return A(`Done, success: ${t}`),$(o),o}))}function S(){d.paused=!1,s.playButton.style.display="none",s.pauseButton.style.display="block",s.status.textContent=""}function M(){d.paused=!0,s.playButton.style.display="block",s.pauseButton.style.display="none",s.status.textContent="Paused"}function B(t){return e(this,void 0,void 0,(function*(){confirm(`[${n.messageAttribution}]: Are you sure you would like to stop '${n.message}'?`)&&(s.status.textContent="Stopping",yield function(t){return e(this,void 0,void 0,(function*(){d.continueActions=!1,document.contains(s.tooltip)&&(yield L(!1)),yield P(t,"",!1,!1)}))}(`Stopped by user (${t})`))}))}function k(t,o,r="info",i){return e(this,void 0,void 0,(function*(){if(!n.displayProgress)return;const l=document.body.getBoundingClientRect(),a=t.getBoundingClientRect(),u=i?0:window.pageYOffset||t.scrollTop||document.body.scrollTop,c=window.pageXOffset||t.scrollLeft||document.body.scrollLeft;s.focusBox=document.createElement("div"),s.focusBox.classList.add("dry-run-focus-box"),s.arrow=document.createElement("div"),s.arrow.classList.add("dry-run-arrow"),s.tooltip=document.createElement("div"),s.tooltip.classList.add("dry-run-tooltip"),"error"===r&&s.tooltip.classList.add("dry-run-tooltip-error"),s.tooltip.textContent=o.replace(/>>/g," "),n.tutorialMode&&(s.nextButton=document.createElement("button"),s.nextButton.textContent="Next",s.nextButton.classList.add("dry-run-next-button"),s.nextButton.addEventListener("click",(()=>e(this,void 0,void 0,(function*(){yield function(){return e(this,void 0,void 0,(function*(){d.nextButtonPressed=!0,yield L(!1)}))}()})))),s.tooltip.appendChild(s.nextButton)),document.body.appendChild(s.focusBox),document.body.appendChild(s.arrow),document.body.appendChild(s.tooltip);const y=s.tooltip.getBoundingClientRect().width;let p=a.bottom+10+u,f=a.left+c+a.width/2-10,g=a.left+c+a.width/2-y/2;f<8?f=8:l.right+c-f<20&&(f=l.right+c-20),g<0&&(g=0),i&&(s.focusBox.style.display="none",s.arrow.style.display="none",s.tooltip.style.position="fixed",f-=c,p-=5,g-=c),s.arrow.style.top=String(a.bottom+u+2)+"px",s.arrow.style.left=String(f)+"px",s.tooltip.style.top=String(p+2)+"px",s.tooltip.style.left=String(g)+"px",s.focusBox.style.top=String(a.top+u-2)+"px",s.focusBox.style.left=String(a.left+c-2)+"px",s.focusBox.style.width=String(a.width)+"px",s.focusBox.style.height=String(a.height)+"px",s.arrowShadow=s.arrow.cloneNode(!0),s.tooltipShadow=s.tooltip.cloneNode(!0),s.arrowShadow.classList.add("dry-run-arrow-shadow"),s.tooltipShadow.classList.add("dry-run-tooltip-shadow"),document.body.appendChild(s.arrowShadow),document.body.appendChild(s.tooltipShadow),yield function(t){return e(this,void 0,void 0,(function*(){(function(t){var o=t.getBoundingClientRect(),e=Math.max(document.documentElement.clientHeight,window.innerHeight);return!(o.bottom<0||o.top-e>=0)})(t)||(t.scrollIntoView({behavior:"smooth"}),yield E(700))}))}(t),s.focusBox.classList.add("dry-run-fade-in"),s.arrowShadow.classList.add("dry-run-fade-in"),s.tooltipShadow.classList.add("dry-run-fade-in"),s.arrow.classList.add("dry-run-fade-in"),s.tooltip.classList.add("dry-run-fade-in");let v=30*o.length<2e3?30*o.length:2e3;yield E((650+v)/n.displaySpeed)}))}function L(t=!0){return e(this,void 0,void 0,(function*(){n.displayProgress&&s.focusBox&&s.arrow&&s.tooltip&&s.arrowShadow&&s.tooltipShadow&&(t&&(yield E(500)),s.focusBox.classList.add("dry-run-fade-out"),s.arrow.classList.add("dry-run-fade-out"),s.tooltip.classList.add("dry-run-fade-out"),s.arrowShadow.classList.add("dry-run-fade-out"),s.tooltipShadow.classList.add("dry-run-fade-out"),yield E(150),s.focusBox.remove(),s.tooltip.remove(),s.arrow.remove(),s.tooltipShadow.remove(),s.arrowShadow.remove())}))}function A(t){r.push(t);const o=`* ${t}`;n.logProgress&&console.log(o)}function P(t,o,i=n.continueOnFailure,l=!0){return e(this,void 0,void 0,(function*(){d.errorOccurred=!0;let e=t+(o?`: '${o}'`:"");i?e+=". Continuing execution.":(d.continueActions=!1,e+=". Halting execution.");const a="FAIL: "+e;r.push(a),n.logProgress&&console.error(a),l&&(yield k(s.message,a,"error",!0),yield L())}))}function E(t){return e(this,void 0,void 0,(function*(){return yield function(){return e(this,void 0,void 0,(function*(){for(;d.paused&&d.continueActions;)yield R(n.globalDelay/2)}))}(),yield R(t)}))}function D(){return e(this,void 0,void 0,(function*(){for(;!d.nextButtonPressed&&d.continueActions;)yield R(n.globalDelay/2);d.nextButtonPressed=!1}))}function R(t){return e(this,void 0,void 0,(function*(){return new Promise((o=>setTimeout(o,t)))}))}}))}var r=self;for(var i in o)r[i]=o[i];o.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();

startDryRun();
