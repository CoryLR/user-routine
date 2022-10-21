
/* 
 * SPA Check template for quick copy-paste
 * Version 3.2.2
 * Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, await for things exist, etc.
*/

/* Minified SPA Check code, provides function 'spaCheck' */ /* @ts-ignore */
var that={},__awaiter=that&&that.__awaiter||function(t,e,o,a){return new(o||(o=Promise))((function(n,i){function r(t){try{s(a.next(t))}catch(t){i(t)}}function l(t){try{s(a.throw(t))}catch(t){i(t)}}function s(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(r,l)}s((a=a.apply(t,e||[])).next())}))};function spaCheck(t,e={}){return __awaiter(that,void 0,void 0,(function*(){const o=[],a=Object.freeze(Object.assign(Object.assign({},{continueOnFailure:!1,globalDelay:500,awaitTimeout:15e3,logCollapse:!1,logResult:!0,logUpdates:!0,message:"",messageShowInDOM:!1,messageStyle:"font-size:24px; padding:10px; z-index:9999; position:fixed; top:0; right:10%; color:black; background-color:rgba(222,222,222,0.8);"}),e)),n=a.message?`[SPA Check] ${a.message}`:"[SPA Check]";let i,r,l=!1,s=!0;return that.main=t=>__awaiter(that,void 0,void 0,(function*(){yield that.messageStart();if(!that.validateInputs(t,e))return that.finish();for(const e of t){if(!s)return that.finish();yield that.sleep(a.globalDelay);try{yield that.do(e)}catch(t){that.error("Unexpected error: "+t.message)}}return that.finish()})),that.finish=()=>{const t=!l,e={success:t,log:o,message:a.message};return that.log(`Done, success: ${t}`),that.messageEnd(e),e},that.do=t=>__awaiter(that,void 0,void 0,(function*(){if("string"==typeof t)yield that.doActionString(t);else if("function"==typeof t)try{yield t(),that.log("Ran provided function")}catch(e){that.error("Error running provided function",e+"; function: "+t.toString())}else that.error("Action is not of type string or function, got",typeof t)})),that.doActionString=t=>__awaiter(that,void 0,void 0,(function*(){const e=t.substring(0,3);if("nav"===e){const e=t.split(" ")[1];e&&"#"===e[0]?(window.location.href=e,that.log(`Navigated to ${e}`)):that.error("Unexpected nav action, got",t)}else if("cli"===e){const[e,o,a]=that.argSplitComplex(t),n=that.getTargetText(o,a);if(a){const t=document.querySelectorAll(o);r=void 0,that.findClickableElementWithText(t,a),r?(r.click(),that.log(`Clicked text '${a}' inside ${o} (clicked on ${r.tagName.toLowerCase()})`)):that.error("Could not find selector to click",n),r=void 0}else{const t=that.select(o);if(!t)return;t.click(),that.log(`Clicked ${o}`)}}else if("exi"===e){const[e,o,a]=that.argSplitComplex(t),n=that.getTargetText(o,a);let i=!1;if(a){const t=document.querySelectorAll(o);for(const e of t)if(that.checkIfElementContainsText(e,a)){i=!0;break}}else{document.querySelector(o)&&(i=!0)}i?that.log(`Did exist: ${n}`):that.error("Did not exist",n)}else if("val"===e){const[e,o,a]=that.argSplit(t);if(!that.select(o))return;that.select(o).value=a,that.log(`Set the value of ${o} to ${a}`)}else if("wri"===e||"app"===e){const[o,a,n]=that.argSplit(t),i=that.select(a);if(!i)return;"wri"===e?(i.textContent=n,that.log(`Wrote '${n}' over ${a}`)):(i.textContent+=n,that.log(`Appended '${n}' to ${a}`))}else if("log"===e){const[e,o]=t.split(/ (.*)/s);that.log(o)}else if("wai"===e){const[e,o]=t.split(" ");that.log(`Waiting ${Number(o)/1e3} second(s)`),yield that.sleep(Number(o))}else if("awa"===e){const[e,o,n]=that.argSplitComplex(t),i=a.awaitTimeout/a.globalDelay;let r=!1;const l=that.getTargetText(o,n);that.log(`Awaiting ${l}...`);for(let t=0;t<i;t++){if(n){const t=Array.from(document.querySelectorAll(o));for(const e of t)if(e&&e.textContent&&e.textContent.toLowerCase().includes(n.toLowerCase())){r=!0;break}}else{document.querySelector(o)&&(r=!0)}if(r)break;yield that.sleep(a.globalDelay)}r?that.log(`...Found ${l}`):that.error(`Timed out after ${a.awaitTimeout/1e3} second(s) awaiting`,l)}else""===t||that.error("Action string keyword not recognized, got",t)})),that.select=t=>{const e=document.querySelector(t);return e||that.error("CSS Selector not found",t),e},that.findClickableElementWithText=(t,e)=>{for(const o of t){if(!that.checkIfElementContainsText(o,e))continue;r=o;const t=Array.from(o.childNodes).filter((t=>t.click));that.findClickableElementWithText(t,e)}},that.checkIfElementContainsText=(t,e)=>{const o=e.toLowerCase(),a=t.textContent&&t.textContent.toLowerCase().includes(o),n="string"==typeof t.value&&t.value.toLocaleLowerCase().includes(o);return a||n},that.getTargetText=(t,e)=>`'${t}'`+(e?` containing text '${e}'`:""),that.argSplit=t=>{const e=t.split(/ ([^\s]+) (.*)/s);return e.length<3&&that.error(`Unexpected ${e[0]} input with data, got:`,t),e},that.argSplitComplex=t=>{const e=t.split(" ");return e.length>2?that.argSplit(t):e},that.messageStart=()=>__awaiter(that,void 0,void 0,(function*(){yield that.sleep(0),a.logUpdates&&(a.logCollapse?console.groupCollapsed(n):console.group(n)),i=a.messageShowInDOM&&a.message?that.displayMessageInDOM(a.message,a.messageStyle):void 0})),that.messageEnd=t=>{i&&i.remove();const e=a.logUpdates?"":n;a.logResult&&console.log(`${e} Result:`,t),a.logUpdates&&console.groupEnd()},that.displayMessageInDOM=(t,e)=>{var o;const a=document.createElement("p");return a.textContent=t,a.setAttribute("style",e),null===(o=document.querySelector("body"))||void 0===o||o.appendChild(a),a},that.validateInputs=(t,e)=>{let o=!0;return void 0===t?(o=!1,that.error("Missing required argument Action List","",!1)):Array.isArray(t)||(o=!1,that.error("Action list argument is not an Array","",!1)),void 0===e||"object"==typeof e&&!Array.isArray(e)||(o=!1,that.error("Options argument is not an Object","",!1)),o},that.log=t=>{o.push(t);const e=`* ${t}`;a.logUpdates&&console.log(e)},that.error=(t,e,n=a.continueOnFailure)=>{l=!0;let i=`FAIL: ${t}`+(e?`: '${e}'`:"");n?i+=". Continuing execution.":(s=!1,i+=". Halting execution."),o.push(i),console.error(i)},that.sleep=t=>new Promise((e=>setTimeout(e,t))),yield that.main(t)}))}

/* Examples: */
async function runSpaChecks() {
  await spaCheck([
    'wait 500',
    'val input[type="text"] Hello, world!',
    'val input[type="number"] 20',
    'click button',
    'exists pre hello',
    'nav #far-down',
    'write #far-down Back up we go!',
    'exists body',
    'nav #',
    () => { console.log('This is a regular function') },
    'log Next is an async function',
    async () => { await new Promise(resolve => setTimeout(() => { resolve() }, 1000)) },
    'click button long process',
    'await p.output>p',
    'await p.output process complete',
  ], { message: 'Testing features', messageShowInDOM: true, globalDelay: 250 });

  await spaCheck([
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
    'await does-not-exist',
    'await body>main this text should not exist anywhere'
  ], {
    message: 'Testing error handling (expect success: false)', messageShowInDOM: true,
    continueOnFailure: true, globalDelay: 100, awaitTimeout: 250,
  });

  await spaCheck([
    'log Should halt after the following error',
    'click does-not-exist',
    'write h1 This text should not appear',
  ], { message: 'Testing graceful fail (expect success: false)', messageShowInDOM: true });

  await spaCheck([
    'append #progress  Done! Check the browser console for results.',
  ], { globalDelay: 0, logUpdates: false, logResult: false });

  console.log('Done! See above for results.');
}
runSpaChecks();

/*
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

# 
*/

