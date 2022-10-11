
/* 
 * SPA Check template for quick copy-pasting
 * Version 2.0.0
*/

/* Minified SPA Check code, provides function 'spaCheck': */
var __awaiter=this&&this.__awaiter||function(t,e,i,o){return new(i||(i=Promise))((function(s,n){function r(t){try{a(o.next(t))}catch(t){n(t)}}function l(t){try{a(o.throw(t))}catch(t){n(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,l)}a((o=o.apply(t,e||[])).next())}))};function spaCheck(t,e){return __awaiter(this,void 0,void 0,(function*(){const i=[],o=Object.assign(Object.assign({},{continueOnFailure:!1,globalDelay:500,awaitTimeout:15e3,logUpdates:!0,message:"",messageShowInDOM:!1,messageStyle:"font-size:24px; padding:10px; z-index:9999; position:fixed; top:0; right:10%; color:black; background-color:rgba(222,222,222,0.8);"}),e);let s,n=!1,r=!0;return this.main=t=>__awaiter(this,void 0,void 0,(function*(){this.messageStart();for(const e of t){if(!r)return this.finish();yield this.sleep(o.globalDelay);try{yield this.do(e)}catch(t){console.error("Unexpected error received",t)}}return this.finish()})),this.finish=()=>{const t=!n;return this.log(`Done, success: ${t}`),this.messageEnd(),{result:t,updateList:i}},this.do=t=>__awaiter(this,void 0,void 0,(function*(){if("string"==typeof t)yield this.doActionString(t);else if("function"==typeof t)try{yield t()}catch(e){this.error("Error running provided function",e+"; function: "+t.toString())}else this.error("Action is not of type string or function, got",typeof t)})),this.doActionString=t=>__awaiter(this,void 0,void 0,(function*(){var e;const i=t.substring(0,3);if("nav"===i){const e=t.split(" ")[1];e&&"#"===e[0]?(window.location.href=e,this.log(`Navigated to ${e}`)):this.error("Unexpected nav action, got",t)}else if("cli"===i){const e=t.split(" ")[1],i=this.select(e);if(!i)return;i.click(),this.log(`Clicked on ${e}`)}else if("exi"===i){const i=t.split(" "),[o,s,n]=i.length>2?this.argSplit(t):i,r=document.querySelector(s),l=n?r&&(null===(e=r.textContent)||void 0===e?void 0:e.toLowerCase().includes(n.toLowerCase())):r,a=`"${s}"`+(n?` containing text "${n}"`:"");l?this.log(`Exists: ${a}`):this.error("Does not exist",a)}else if("val"===i){const[e,i,o]=this.argSplit(t);if(!this.select(i))return;this.select(i).value=o,this.log(`Set the value of ${i} to ${o}`)}else if("wri"===i||"app"===i){const[e,o,s]=this.argSplit(t),n=this.select(o);if(!n)return;"wri"===i?(n.textContent=s,this.log(`Wrote "${s}" over ${o}`)):(n.textContent+=s,this.log(`Appended "${s}" to ${o}`))}else if("log"===i){const[e,i]=t.split(/ (.*)/s);console.log("* "+i)}else if("wai"===i){const[e,i]=t.split(" ");this.log(`Waiting ${Number(i)/1e3} seconds`),yield this.sleep(Number(i))}else if("awa"===i){const e=t.split(" "),[i,s,n]=e.length>2?this.argSplit(t):e,r=o.awaitTimeout/o.globalDelay;let l,a;for(let t=0;t<r&&(l=document.querySelector(s),a=n?l&&l.textContent.toLowerCase().includes(n.toLowerCase()):l,!a);t++)yield this.sleep(o.globalDelay);const c=`"${s}"`+(n?` containing text "${n}"`:"");a?this.log(`Awaited ${c}`):this.error(`Timed out after ${o.awaitTimeout/1e3} seconds awaiting`,c)}else""===t||this.error("Action string keyword not recognized, got",t)})),this.select=t=>{const e=document.querySelector(t);return e||this.error("CSS Selector not found",t),e},this.argSplit=t=>{const e=t.split(/ ([^\s]+) (.*)/s);return e.length<3&&this.error(`Unexpected ${e[0]} input, got:`,t),e},this.messageStart=()=>{console.group(`[SPA Check] ${o.message}`),s=o.messageShowInDOM&&o.message?this.displayMessageInDOM(o.message,o.messageStyle):void 0},this.messageEnd=()=>{s&&s.remove(),console.groupEnd()},this.displayMessageInDOM=(t,e)=>{var i;const o=document.createElement("p");return o.textContent=t,o.setAttribute("style",e),null===(i=document.querySelector("body"))||void 0===i||i.appendChild(o),o},this.log=t=>{i.push(t);const e=`* ${t}`;o.logUpdates&&console.log(e)},this.error=(t,e,s=o.continueOnFailure)=>{n=!0;const l=`${t}: '${e}'`;if(i.push(l),!s)throw r=!1,new Error(`${l}. Halting execution.`);console.error(`* ${l}. Continuing execution.`)},this.sleep=t=>new Promise((e=>setTimeout(e,t))),yield this.main(t)}))}

/* Examples: */
async function runTests() {
  await spaCheck([
    '',
    'val input[type="text"] Hello, world!',
    'val input[type="number"] 20',
    'click button',
    'exists pre hello',
    'nav #far-down',
    'write #far-down Back up we go!',
    'exists body',
    'nav #',
    () => { console.log('This is a regular function') },
    'log Next is an async function, waiting 1.5 seconds...',
    async () => { await new Promise(resolve => setTimeout(()=>{resolve()}, 1500))},
    'click button.process',
    'log Awaiting span.output>p...',
    'await span.output>p',
  ], { message: 'Testing features', messageShowInDOM: true, globalDelay: 250 });
  
  await spaCheck([
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
    'await does-not-exist',
    'await body>main this text should not exist anywhere'
  ], { message: 'Testing error handling', messageShowInDOM: true, continueOnFailure: true, awaitTimeout: 600 });

  await spaCheck([
    'log Should halt after the following error',
    'click does-not-exist',
    'write h1 This should not appear',
  ], { message: 'Testing graceful fail', messageShowInDOM: true });

  await spaCheck([
    'append #progress  Done! Check the browser console for results.',
  ], { globalDelay: 0 });
}
runTests();

/*
# Usage

SPA Check is served as a function named `spaCheck`. Example:

```javascript
spaCheck(
  ['value .myform>input Hello', 'click button.myclass'], // Actions
  { message: 'Example: Submit form', globalDelay: 1000 } // Options
);
```

Parameter details:

* 1: Action List: Array of strings or functions
  * If using string, separate parts by spaces like so: `['action selector data']`
    * Action strings:
      * `await`, e.g. `'await .modal.success-message'` or `'await h1 With This Text'`
      * `click`, e.g. `'click button.submit'`
      * `exists`, e.g. `'exists .class-name'` or `'exists h1 With This Text'`
      * `log`, e.g. `'log Some message'`
      * `nav`, e.g. `'nav #id'` or `'nav #/some/hash/routing/path'`
      * `value`, e.g. `'value form>input.name Cory Rahman'`
      * `wait`, e.g. `'wait 3000'` (3 seconds)
      * `write`, e.g. `'write p  - Adding some text'`
    * Selector: CSS selector like `button.class-name`, should not contain spaces
    * Data: Argument for `value`, `write`, `log`, and optionally `exists`
* 2: Options (optional): Object
  * `awaitTimeout`: (default: 15000) How long in milliseconds to wait for an element using the await command
  * `continueOnFailure`: (default: false) Continue to run actions even if one fails
  * `globalDelay`: (default: 500) time between actions in milliseconds
  * `logUpdates`: (default: true) Show progress in the browser console
  * `message`: (default: '') Text to show while the text runs
  * `messageShowInDOM`: (default: false) Show the message visually on the page
  * `messageStyle`: Override the default message style

# 
*/

