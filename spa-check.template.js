
/* 
 * SPA Check Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: 4.3.0
 * Description: Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, await for things exist, etc.
*/

/**
 * SPA Check examples, replace with your tests
*/
async function runSpaChecks() {
  
  await spaCheck([
    'log Tests starting',
    'value input[type="text"] Hello, world!',
    'value input[type="number"] 20',
    'click button',
    'exists pre hello',
    'write #far-down Back up we go!',
    'nav #',
    'log Next are custom functions',
    () => { console.log('This is logging from a custom function, next is a custom async function!') },
    async () => { await new Promise(resolve => setTimeout(() => { resolve() }, 300)) },
    'exists !.output processing...',
    'click button long process',
    'await !.output processing...',
    'await .output process complete',
  ], { message: 'Testing features', globalDelay: 100 });
  
  await spaCheck([
    'log Expect success: false',
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
    'exists !body',
    'await does-not-exist',
    'await body>main this text should not exist anywhere'
  ], {
    message: 'Testing error handling',
    continueOnFailure: true, awaitTimeout: 600,
    globalDelay: 50, displaySpeed: 2,
  });
  
  await spaCheck([
    'log Expect success: false, should halt after next error',
    'click does-not-exist',
    'log If you see this, it did not work',
  ], { message: 'Testing graceful fail', globalDelay: 50, displaySpeed: 2 });
  
  await spaCheck([
    'append #progress  Done! Check the browser console for results.',
    'log All done!',
  ], { globalDelay: 0, logProgress: false, logResult: false });
  
}

/*
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

# 
*/

/* Minified SPA Check code, provides function 'spaCheck' */ /* @ts-ignore */
var that={},__awaiter=that&&that.__awaiter||function(t,e,o,i){return new(o||(o=Promise))((function(a,n){function r(t){try{l(i.next(t))}catch(t){n(t)}}function s(t){try{l(i.throw(t))}catch(t){n(t)}}function l(t){var e;t.done?a(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(r,s)}l((i=i.apply(t,e||[])).next())}))};function spaCheck(t,e={}){return __awaiter(that,void 0,void 0,(function*(){const o={awaitTimeout:15e3,continueOnFailure:!1,displayMessage:!0,displayProgress:!0,displaySpeed:1,globalDelay:500,logCollapse:!1,logProgress:!0,logResult:!0,message:"SPA Check",overrideCss:"",separator:" "},i=[],a=Object.freeze(Object.assign(Object.assign({},o),e)),n=a.message?`[SPA Check] ${a.message}`:"[SPA Check]";let r,s=!1,l=!0;const d={arrow:void 0,arrowShadow:void 0,focusBox:void 0,message:void 0,style:void 0,tooltip:void 0,tooltipShadow:void 0},c=150;return that.main=t=>__awaiter(that,void 0,void 0,(function*(){yield that.messageStart();if(!(yield that.validateInputs(t,e)))return that.finish();for(const e of t){if(!l)return that.finish();yield that.sleep(a.globalDelay);try{yield that.do(e)}catch(t){yield that.error("Unexpected error: "+t.message)}}return that.finish()})),that.do=t=>__awaiter(that,void 0,void 0,(function*(){if("string"==typeof t)yield that.doActionString(t);else if("function"==typeof t)try{yield that.performAction(t,"Running provided function"),that.log("Ran provided function")}catch(e){yield that.animateTooltipClose(),yield that.error("Error running provided function",e+"; function: "+t.toString())}else yield that.error("Action is not of type string or function, got",typeof t)})),that.doActionString=t=>__awaiter(that,void 0,void 0,(function*(){const e=t.substring(0,3);if("nav"===e){const e=t.split(a.separator)[1];e&&"#"===e[0]?(yield that.performAction((()=>{window.location.href=e}),`Navigating to ${e}`),that.log(`Navigated to ${e}`)):yield that.error("Unexpected nav action, got",t)}else if("cli"===e){const[e,o,i]=yield that.argSplitComplex(t),a=that.getTargetText(o,i);if(i){const t=that.selectorAll(o);r=void 0,that.findClickableElementWithTextRecursive(t,i),r?(yield that.performAction((()=>{r.click()}),`Clicking ${r.tagName.toLowerCase()} with text '${i}'`,r),that.log(`Clicked text '${i}' inside ${o} (clicked on ${r.tagName.toLowerCase()})`)):yield that.error("Could not find selector to click",a),r=void 0}else{const t=yield that.select(o);if(!t)return;yield that.performAction((()=>{t.click()}),`Clicking ${o}`,t),that.log(`Clicked ${o}`)}}else if("exi"===e){let[e,o,i]=yield that.argSplitComplex(t),a=!1;"!"===o[0]&&(o=o.substring(1),a=!0);const n=that.getTargetText(o,i);let s,l=!1;if(i){const t=that.selectorAll(o);for(const e of t)if(that.checkIfElementContainsText(e,i)){l=!0,r=void 0,that.findClickableElementWithTextRecursive([e],i),s=r;break}}else{const t=that.selector(o);t&&(l=!0,s=t)}l&&!a?(yield that.animateTooltipOpen(s,`Confirmed exists: ${n}`,"info"),yield that.animateTooltipClose(),that.log(`Confirmed exists: ${n}`)):l||a?l&&a?(yield that.animateTooltipOpen(s,`Confirmed exists: ${n}`,"error"),yield that.animateTooltipClose(),yield that.error(`Confirmed exists: ${n}`)):!l&&a&&(yield that.animateTooltipOpen(d.message,`Confirmed does not exist: ${n}`,"info"),yield that.animateTooltipClose(),that.log(`Confirmed does not exist: ${n}`)):yield that.error("Did not exist",n),r=void 0}else if("val"===e){const[e,o,i]=yield that.argSplit(t),a=yield that.select(o);if(!a)return;yield that.performAction((()=>{a.value=i,a.dispatchEvent(new InputEvent("input"))}),`Filling value of ${a.tagName.toLowerCase()}`,a),that.log(`Set the value of ${o} to ${i}`)}else if("wri"===e||"app"===e){const[o,i,a]=yield that.argSplit(t),n=yield that.select(i);if(!n)return;"wri"===e?(yield that.performAction((()=>{n.textContent=a}),`Writing over ${i}`,n),that.log(`Wrote '${a}' over ${i}`)):(yield that.performAction((()=>{n.textContent+=a}),`Appending text to ${i}`,n),that.log(`Appended '${a}' to ${i}`))}else if("log"===e){const[e,o]=t.split(/ (.*)/s);yield that.performAction((()=>{that.log(o)}),`${o}`)}else if("wai"===e){const[e,o]=t.split(a.separator);that.log(`Waiting ${Number(o)/1e3} second(s)`),yield that.performAction((()=>__awaiter(that,void 0,void 0,(function*(){yield that.sleep(Number(o))}))),`Waiting ${Number(o)/1e3} second(s)`)}else if("awa"===e){let[e,o,i]=yield that.argSplitComplex(t),n=!1;"!"===o[0]&&(o=o.substring(1),n=!0);const s=a.awaitTimeout/a.globalDelay;let l,c=!1;const h=that.getTargetText(o,i);that.log(`Awaiting ${h}...`);const p=n?`Awaiting ${h} to not exist...`:`Awaiting ${h}...`;yield that.animateTooltipOpen(d.message,p,"info",!0);for(let t=0;t<s;t++){if(i){const t=Array.from(that.selectorAll(o.replace(/>>/g)));for(const e of t)if(e&&e.textContent&&e.textContent.toLowerCase().includes(i.toLowerCase())){c=!0,r=void 0,that.findClickableElementWithTextRecursive([e],i),l=r;break}}else{const t=that.selector(o);t&&(c=!0,l=t)}if(c&&!n)break;if(!c&&n)break;c=!1,yield that.sleep(a.globalDelay)}yield that.animateTooltipClose(),c&&!n?(yield that.animateTooltipOpen(l,`...Found ${h}`,"info"),yield that.animateTooltipClose(),that.log(`...Found ${h}`)):c||n?c&&n?(yield that.animateTooltipOpen(l,`...Timed out awaiting ${h} to not exist`,"error"),yield that.animateTooltipClose(),yield that.error(`...Timed out awaiting ${h} to not exist`)):!c&&n&&that.log(`...${h} disappeared`):yield that.error(`Timed out after ${a.awaitTimeout/1e3} second(s) awaiting`,h)}else""===t||(yield that.error("Action string keyword not recognized, got",t))})),that.performAction=(t,e,o)=>__awaiter(that,void 0,void 0,(function*(){let i=!1;o||(o=d.message?d.message:document.body,i=!0),yield that.animateTooltipOpen(o,e,"info",i),yield t(),yield that.animateTooltipClose()})),that.select=t=>__awaiter(that,void 0,void 0,(function*(){const e=that.selector(t);return e||(yield that.error("CSS Selector not found",t.replace(/>>/g," "))),e})),that.selector=t=>document.querySelector(t.replace(/>>/g," ")),that.selectorAll=t=>document.querySelectorAll(t.replace(/>>/g," ")),that.findClickableElementWithTextRecursive=(t,e)=>{for(const o of t){if(!that.checkIfElementContainsText(o,e))continue;that.checkIfElementIsClickable(o)&&(r=o);const t=Array.from(o.childNodes).filter((t=>{if(that.checkIfElementIsClickable(t))return t}));that.findClickableElementWithTextRecursive(t,e)}},that.checkIfElementIsClickable=t=>t.click&&"SCRIPT"!==t.tagName,that.checkIfElementContainsText=(t,e)=>{const o=e.toLowerCase(),i=t.textContent&&t.textContent.toLowerCase().includes(o),a="string"==typeof t.value&&t.value.toLocaleLowerCase().includes(o);return i||a},that.getTargetText=(t,e)=>`'${t}'`+(e?` containing text '${e}'`:""),that.argSplit=t=>__awaiter(that,void 0,void 0,(function*(){if(" "!==a.separator)return t.split(a.separator);const e=t.split(/ ([^\s]+) (.*)/s);return e.length<3&&(yield that.error(`Unexpected ${e[0]} input with data, got:`,t)),e[1]=e[1].replace(/>>/g," "),e})),that.argSplitComplex=t=>__awaiter(that,void 0,void 0,(function*(){const e=t.split(a.separator);return" "!==a.separator?e:e.length>2?yield that.argSplit(t):(e[1]=e[1].replace(/>>/g," "),e)})),that.messageStart=()=>__awaiter(that,void 0,void 0,(function*(){(a.displayMessage||a.displayProgress)&&that.addCss(),yield that.sleep(0),a.logProgress&&(a.logCollapse?console.groupCollapsed(n):console.group(n)),that.displayMessageInDOM(a.message)})),that.messageEnd=t=>{d.message&&d.message.remove(),d.style&&d.style.remove();const e=a.logProgress?"":n;a.logResult&&console.log(`${e} Result:`,t),a.logProgress&&console.groupEnd()},that.finish=()=>{that.ensureCleanDOM();const t=!s,e={success:t,log:i,message:a.message};return that.log(`Done, success: ${t}`),that.messageEnd(e),e},that.ensureCleanDOM=()=>{for(const t in d)d[t]&&d[t].parentNode&&d[t].remove&&d[t].remove()},that.addCss=()=>{var t;d.style=document.createElement("style"),d.style.textContent="\n body > .spa-check-message {\n font: 20px Georgia;\n padding: 18px 12px 6px 12px;\n z-index: 9999;\n position: fixed;\n top: 0;\n right: 10%;\n color: black;\n background-color: rgba(250,250,250,0.8);\n text-align: right;\n border-radius: 0 0 12px 12px;\n max-width: 80vw;\n overflow: hidden;\n white-space: nowrap;\n text-overflow: ellipsis;\n border: 2px solid rgb(180,180,180);\n border-top: 0;\n }\n body > .spa-check-message>.spa-check-attribution {\n font-size: 12px;\n color: dimgray;\n }\n body > .spa-check-focus-box {\n z-index: 9997;\n visibility: hidden;\n position: absolute;\n background-color: rgba(255,255,255,0.2);\n border: 2px solid white;\n box-shadow: 0 0 0 2px rgb(0,0,0);\n }\n body > .spa-check-tooltip {\n z-index: 9999;\n visibility: hidden;\n font: 14px Georgia;\n position: absolute;\n background-color: rgb(245,245,245);\n color: black;\n text-align: center;\n padding: 10px;\n border-radius: 10px;\n max-width: 200px;\n }\n body > .spa-check-tooltip-error {\n color: darkred;\n }\n body > .spa-check-arrow {\n z-index: 9999;\n visibility: hidden;\n width: 0;\n height: 0;\n position: absolute;\n border-left: 10px solid transparent;\n border-right: 10px solid transparent;\n border-bottom: 10px solid rgb(245,245,245); \n }\n body > .spa-check-arrow-shadow {\n z-index: 9998;\n border-left: 14px solid transparent;\n border-right: 14px solid transparent;\n border-bottom: 14px solid rgb(180,180,180);\n margin: -3px 0 0 -4px;\n }\n body > .spa-check-tooltip-shadow {\n z-index: 9998;\n color: transparent;\n border: 2px solid rgb(180,180,180);\n background-color: rgb(180,180,180);\n margin: -2px 0 0 -2px;\n border-radius: 12px;\n }\n body > .spa-check-fade-in {\n visibility: visible;\n animation: spaCheckfadeIn 150ms; \n }\n body > .spa-check-fade-out {\n opacity: 0;\n animation: spaCheckfadeOut 150ms; \n }\n @keyframes spaCheckfadeIn {\n 0% { opacity: 0; }\n 100% { opacity: 1; }\n }\n @keyframes spaCheckfadeOut {\n 0% { opacity: 1; }\n 100% { opacity: 0; }\n }\n ",d.style.textContent+=a.overrideCss,null===(t=that.selector("body"))||void 0===t||t.appendChild(d.style)},that.displayMessageInDOM=t=>{var e;d.message=document.createElement("div");const i=t===o.message?"":'<div class="spa-check-attribution">SPA Check</div>';d.message.innerHTML=t+i,d.message.classList.add("spa-check-message"),a.displayMessage||(d.message.style.visibility="hidden"),null===(e=that.selector("body"))||void 0===e||e.appendChild(d.message)},that.animateTooltipOpen=(t,e,o="info",i)=>__awaiter(that,void 0,void 0,(function*(){if(!a.displayProgress)return;const n=document.body.getBoundingClientRect(),r=t.getBoundingClientRect(),s=i?0:window.pageYOffset||t.scrollTop||document.body.scrollTop,l=window.pageXOffset||t.scrollLeft||document.body.scrollLeft;d.focusBox=document.createElement("div"),d.focusBox.classList.add("spa-check-focus-box"),d.arrow=document.createElement("div"),d.arrow.classList.add("spa-check-arrow"),d.tooltip=document.createElement("div"),d.tooltip.classList.add("spa-check-tooltip"),"error"===o&&d.tooltip.classList.add("spa-check-tooltip-error"),d.tooltip.textContent=e.replace(/>>/g," "),document.body.appendChild(d.focusBox),document.body.appendChild(d.arrow),document.body.appendChild(d.tooltip);const c=d.tooltip.getBoundingClientRect().width;let h=r.bottom+10+s,p=r.left+l+r.width/2-10,g=r.left+l+r.width/2-c/2;p<8?p=8:n.right+l-p<20&&(p=n.right+l-20),g<0&&(g=0),i&&(d.focusBox.style.display="none",d.arrow.style.display="none",d.tooltip.style.position="fixed",p-=l,h-=5,g-=l),d.arrow.style.top=String(r.bottom+s+2)+"px",d.arrow.style.left=String(p)+"px",d.tooltip.style.top=String(h+2)+"px",d.tooltip.style.left=String(g)+"px",d.focusBox.style.top=String(r.top+s-2)+"px",d.focusBox.style.left=String(r.left+l-2)+"px",d.focusBox.style.width=String(r.width)+"px",d.focusBox.style.height=String(r.height)+"px",d.arrowShadow=d.arrow.cloneNode(!0),d.tooltipShadow=d.tooltip.cloneNode(!0),d.arrowShadow.classList.add("spa-check-arrow-shadow"),d.tooltipShadow.classList.add("spa-check-tooltip-shadow"),document.body.appendChild(d.arrowShadow),document.body.appendChild(d.tooltipShadow),yield that.scrollIntoViewIfNeeded(t),d.focusBox.classList.add("spa-check-fade-in"),d.arrowShadow.classList.add("spa-check-fade-in"),d.tooltipShadow.classList.add("spa-check-fade-in"),d.arrow.classList.add("spa-check-fade-in"),d.tooltip.classList.add("spa-check-fade-in");let f=30*e.length<2e3?30*e.length:2e3;yield that.sleep((650+f)/a.displaySpeed)})),that.animateTooltipClose=()=>__awaiter(that,void 0,void 0,(function*(){if(!(a.displayProgress&&d.focusBox&&d.arrow&&d.tooltip&&d.arrowShadow&&d.tooltipShadow))return;yield that.sleep(500),d.focusBox.classList.add("spa-check-fade-out"),d.arrow.classList.add("spa-check-fade-out"),d.tooltip.classList.add("spa-check-fade-out"),d.arrowShadow.classList.add("spa-check-fade-out"),d.tooltipShadow.classList.add("spa-check-fade-out"),yield that.sleep(c),d.focusBox.remove(),d.tooltip.remove(),d.arrow.remove(),d.tooltipShadow.remove(),d.arrowShadow.remove()})),that.scrollIntoViewIfNeeded=t=>__awaiter(that,void 0,void 0,(function*(){that.checkVisible(t)||(t.scrollIntoView({behavior:"smooth"}),yield that.sleep(700))})),that.checkVisible=t=>{var e=t.getBoundingClientRect(),o=Math.max(document.documentElement.clientHeight,window.innerHeight);return!(e.bottom<0||e.top-o>=0)},that.validateInputs=(t,e)=>__awaiter(that,void 0,void 0,(function*(){let o=!0;return void 0===t?(o=!1,yield that.error("Missing required argument Action List","",!1)):Array.isArray(t)||(o=!1,yield that.error("Action list argument is not an Array","",!1)),void 0===e||"object"==typeof e&&!Array.isArray(e)||(o=!1,yield that.error("Options argument is not an Object","",!1)),o})),that.log=t=>{i.push(t);const e=`* ${t}`;a.logProgress&&console.log(e)},that.error=(t,e,o=a.continueOnFailure)=>__awaiter(that,void 0,void 0,(function*(){s=!0;let a=`FAIL: ${t}`+(e?`: '${e}'`:"");o?a+=". Continuing execution.":(l=!1,a+=". Halting execution."),i.push(a),console.error(a),yield that.animateTooltipOpen(d.message,a,"error",!0),yield that.animateTooltipClose()})),that.sleep=t=>new Promise((e=>setTimeout(e,t))),yield that.main(t)}))}

runSpaChecks();
