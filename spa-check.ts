import { DomElements, SpaCheckAction, SpaCheckActionString, SpaCheckOptions, SpaCheckReturn } from './spa-check.d';

/**
 * Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, check if things exist, etc.
 * @example new SpaCheck(['click button.some-class', 'value form>input Hello, world!', 'exists .success-message'], {message: 'See if the feature works', globalDelay: 1000});
 * @param actionList Available actions types: append, await, click, exists, log, nav, value, wait, write, or provide a custom function
 * @param options Available options: awaitTimeout, continueOnFailure, displayMessage, displayProgress, globalDelay, logCollapse, logProgress, logResult, message, overrideCss
 */
export async function spaCheck(actionList: SpaCheckAction[], options: SpaCheckOptions = {}): Promise<SpaCheckReturn> {

  const defaultConfig = {
    awaitTimeout: 15000,
    continueOnFailure: false,
    displayMessage: true,
    displayProgress: true,
    displaySpeed: 1,
    globalDelay: 500,
    logCollapse: false,
    logProgress: true,
    logResult: true,
    message: 'SPA Check',
    overrideCss: '',
    separator: ' ',
  };
  const updateList: string[] = [];
  const config: typeof defaultConfig = Object.freeze({ ...defaultConfig, ...options });
  const spaCheckLogTitle = config.message ? `[SPA Check] ${config.message}` : '[SPA Check]';
  let errorOccurred = false;
  let continueActions = true;
  let clickableTextElement: HTMLElement | undefined = undefined;
  const domElements: DomElements = {
    arrow: undefined,
    arrowShadow: undefined,
    focusBox: undefined,
    message: undefined,
    style: undefined,
    tooltip: undefined,
    tooltipShadow: undefined,
  }

  const animationFadeTime = 150;
  const animationTooltipMaxWidth = 200;

  this.main = async (actionList: SpaCheckAction[]) => {
    await this.messageStart();
    const inputsValid = await this.validateInputs(actionList, options);
    if (!inputsValid) return this.finish();

    for (const action of actionList) {
      if (!continueActions) { return this.finish(); }
      await this.sleep(config.globalDelay);
      try {
        await this.do(action);
      } catch (error) {
        await this.error('Unexpected error: ' + error.message);
      }
    }
    return this.finish();
  }

  this.do = async (action: SpaCheckAction) => {
    if (typeof action === 'string') {
      await this.doActionString(action as SpaCheckActionString)
    } else if (typeof action === 'function') {
      try {
        await this.performAction(
          action,
          'Running provided function',
        );
        this.log('Ran provided function');
      } catch (error) {
        await this.animateTooltipClose();
        await this.error('Error running provided function', error + '; function: ' + action.toString());
      }
    } else {
      await this.error('Action is not of type string or function, got', typeof action);
    }
  }

  this.doActionString = async (action: SpaCheckActionString) => {
    const actionCode = action.substring(0, 3);
    if (actionCode === 'nav') {
      const location = action.split(config.separator)[1];
      if (location && location[0] === '#') {
        await this.performAction(
          () => { window.location.href = location; },
          `Navigating to ${location}`
        )
        this.log(`Navigated to ${location}`);
      } else {
        await this.error(`Unexpected nav action, got`, action);
      }

    } else if (actionCode === 'cli') {
      const [_, selector, value] = await this.argSplitComplex(action);
      const clickTarget = this.getTargetText(selector, value);
      if (value) {
        const elements = this.selectorAll(selector);
        clickableTextElement = undefined;
        this.findClickableElementWithTextRecursive(elements, value);
        if (clickableTextElement) {
          await this.performAction(
            () => { (clickableTextElement as HTMLElement).click() },
            `Clicking ${(clickableTextElement as HTMLElement).tagName.toLowerCase()} with text '${value}'`,
            clickableTextElement
          )
          this.log(`Clicked text '${value}' inside ${selector} (clicked on ${(clickableTextElement as HTMLElement).tagName.toLowerCase()})`);
        } else {
          await this.error(`Could not find selector to click`, clickTarget);
        }
        clickableTextElement = undefined;
      } else {
        const element = await this.select(selector);
        if (!element) return;
        await this.performAction(
          () => { element.click(); },
          `Clicking ${selector}`,
          element
        )
        this.log(`Clicked ${selector}`);
      }

    } else if (actionCode === 'exi') {
      let [_, selector, value] = await this.argSplitComplex(action);
      let notOperator = false;
      if (selector[0] === '!') {
        selector = selector.substring(1);
        notOperator = true;
      }
      const existsTarget = this.getTargetText(selector, value);
      let found = false;
      let foundElement;

      if (value) {
        const elements = this.selectorAll(selector);
        for (const element of elements) {
          if (this.checkIfElementContainsText(element, value)) {
            found = true;
            clickableTextElement = undefined;
            this.findClickableElementWithTextRecursive([element], value);
            foundElement = clickableTextElement;
            break;
          }
        }
      } else {
        const element = this.selector(selector);
        if (element) {
          found = true;
          foundElement = element;
        }
      }
      if (found && !notOperator) {
        await this.animateTooltipOpen(foundElement, `Confirmed exists: ${existsTarget}`, 'info');
        await this.animateTooltipClose();
        this.log(`Confirmed exists: ${existsTarget}`);
      } else if (!found && !notOperator) {
        await this.error(`Did not exist`, existsTarget);
      } else if (found && notOperator) {
        await this.animateTooltipOpen(foundElement, `Confirmed exists: ${existsTarget}`, 'error');
        await this.animateTooltipClose();
        await this.error(`Confirmed exists: ${existsTarget}`);
      } else if (!found && notOperator) {
        await this.animateTooltipOpen(domElements.message, `Confirmed does not exist: ${existsTarget}`, 'info', true);
        await this.animateTooltipClose();
        this.log(`Confirmed does not exist: ${existsTarget}`);
      }
      clickableTextElement = undefined;

    } else if (actionCode === 'val') {
      const [_, selector, value] = await this.argSplit(action);
      const element = await this.select(selector);
      if (!element) return;
      await this.performAction(
        () => { element.value = value; element.dispatchEvent(new InputEvent('input')); },
        `Filling value of ${element.tagName.toLowerCase()}`,
        element
      )
      this.log(`Set the value of ${selector} to ${value}`);

    } else if (actionCode === 'wri' || actionCode === 'app') {
      const [_, selector, text] = await this.argSplit(action);
      const element = await this.select(selector);
      if (!element) return;
      if (actionCode === 'wri') {
        await this.performAction(
          () => {element.textContent = text;},
          `Writing over ${selector}`,
          element
        );
        this.log(`Wrote '${text}' over ${selector}`);
      } else {
        await this.performAction(
          () => {element.textContent += text;},
          `Appending text to ${selector}`,
          element
        );
        this.log(`Appended '${text}' to ${selector}`);
      }

    } else if (actionCode === 'log') {
      const [_, value] = action.split(/ (.*)/s);
      await this.performAction(
        () => {this.log(value);},
        `${value}`,
      );
      
    } else if (actionCode === 'wai') {
      const [_, value] = action.split(config.separator);
      this.log(`Waiting ${Number(value) / 1000} second(s)`);
      await this.performAction(
        async () => {await this.sleep(Number(value));},
        `Waiting ${Number(value) / 1000} second(s)`,
      );

    } else if (actionCode === 'awa') {
      let [_, selector, value] = await this.argSplitComplex(action);
      let notOperator = false;
      if (selector[0] === '!') {
        selector = selector.substring(1);
        notOperator = true;
      }

      const loopCount = config.awaitTimeout / config.globalDelay;
      let found = false;
      let foundElement;
      const awaitingTarget = this.getTargetText(selector, value);
      this.log(`Awaiting ${awaitingTarget}...`);
      const tooltipText = notOperator ? `Awaiting ${awaitingTarget} to not exist...` : `Awaiting ${awaitingTarget}...`;
      await this.animateTooltipOpen(domElements.message, tooltipText, 'info', true);
      for (let i = 0; i < loopCount; i++) {
        if (value) {
          /* Check for text */
          const elements: (HTMLElement & HTMLInputElement)[] = Array.from(this.selectorAll(selector.replace(/>>/g)));
          for (const element of elements) {
            if (element && element.textContent && element.textContent.toLowerCase().includes(value.toLowerCase())) {
              found = true;
              clickableTextElement = undefined;
              this.findClickableElementWithTextRecursive([element], value);
              foundElement = clickableTextElement;  
              break;
            }
          }
        } else {
          /* Just check for element */
          const element = this.selector(selector) as HTMLElement & HTMLInputElement;
          if (element) {
            found = true;
            foundElement = element;
          }
        }
        if (found && !notOperator) break;
        if (!found && notOperator) break;
        found = false;
        await this.sleep(config.globalDelay);
      }
      await this.animateTooltipClose();
      
      // TODO: Test and make sure the new notOperator syntax works as expected

      if (found && !notOperator) {
        await this.animateTooltipOpen(foundElement, `...Found ${awaitingTarget}`, 'info');
        await this.animateTooltipClose();
        this.log(`...Found ${awaitingTarget}`);
      } else if(!found && !notOperator) {
        await this.error(`Timed out after ${config.awaitTimeout / 1000} second(s) awaiting`, awaitingTarget);
      } else if (found && notOperator) {
        await this.animateTooltipOpen(foundElement, `...Timed out awaiting ${awaitingTarget} to not exist`, 'error');
        await this.animateTooltipClose();
        await this.error(`...Timed out awaiting ${awaitingTarget} to not exist`);
      } else if (!found && notOperator) {
        this.log(`...${awaitingTarget} disappeared`);
      }
    } else if (action === '') {
      /* Do nothing, just add an extra globalDelay */
    } else {
      await this.error('Action string keyword not recognized, got', action);
    }
  }

  this.performAction = async (actionFunction: () => void, message: string, element?: HTMLElement) => {
    let fixedPositionOverride = false;
    if (!element) {
      element = domElements.message ? domElements.message : document.body;
      fixedPositionOverride = true;
    }
    await this.animateTooltipOpen(element, message, 'info', fixedPositionOverride);
    await actionFunction();
    await this.animateTooltipClose();
  }

  this.select = async (selector: string): Promise<HTMLElement & HTMLInputElement> => {
    const element = this.selector(selector) as HTMLElement & HTMLInputElement;
    if (!element) {
      await this.error('CSS Selector not found', selector.replace(/>>/g, ' '));
    }
    return element;
  }

  this.selector = (selector: string) => {
    return document.querySelector(selector.replace(/>>/g, ' '));
  }

  this.selectorAll = (selector: string) => {
    return document.querySelectorAll(selector.replace(/>>/g, ' '));
  }

  /**
   * Finds the smallest element containing the given text and assigns it to clickableTextElement
   */
  this.findClickableElementWithTextRecursive = (elements: HTMLElement[], text: string): void => {
    for (const element of elements) {
      const elementContainsText = this.checkIfElementContainsText(element, text);
      if (!elementContainsText) continue;
      if (this.checkIfElementIsClickable(element)) {
        clickableTextElement = element
      }
      const clickableChildNodes = Array.from(element.childNodes).filter(e => { if (this.checkIfElementIsClickable(e)) return e })
      this.findClickableElementWithTextRecursive(clickableChildNodes, text);
    }
  }

  this.checkIfElementIsClickable = (element: HTMLElement) => {
    return (element as HTMLElement).click && element.tagName !== 'SCRIPT';
  }

  this.checkIfElementContainsText = (element: HTMLElement | HTMLInputElement, text: string) => {
    const lowerText = text.toLowerCase();
    const foundInTextContent = element.textContent && element.textContent.toLowerCase().includes(lowerText);
    const foundInValue = typeof ((element as HTMLInputElement)).value === 'string' && ((element as HTMLInputElement)).value.toLocaleLowerCase().includes(lowerText);
    return foundInTextContent || foundInValue;
  }

  this.getTargetText = (selector: string, value?: string) => {
    return `'${selector}'` + (value ? ` containing text '${value}'` : '');
  }

  this.argSplit = async (action): Promise<string[]> => {
    if (config.separator !== ' ') return action.split(config.separator);
    const split = action.split(/ ([^\s]+) (.*)/s);
    if (split.length < 3) await this.error(`Unexpected ${split[0]} input with data, got:`, action);
    split[1] = split[1].replace(/>>/g, ' ');
    return split;
  }
  
  this.argSplitComplex = async (action: string): Promise<string[]> => {
    const regularSplit = action.split(config.separator);
    if (config.separator !== ' ') return regularSplit;
    if (regularSplit.length > 2) return await this.argSplit(action);
    regularSplit[1] = regularSplit[1].replace(/>>/g, ' ');
    return regularSplit;
  }

  this.messageStart = async () => {
    if (config.displayMessage || config.displayProgress) this.addCss();
    await this.sleep(0);
    if (config.logProgress) {
      if (config.logCollapse) {
        console.groupCollapsed(spaCheckLogTitle);
      } else {
        console.group(spaCheckLogTitle);
      }
    }
    this.displayMessageInDOM(config.message);
  }

  this.messageEnd = (returnPayload) => {
    if (domElements.message) { domElements.message.remove() };
    if (domElements.style) { domElements.style.remove() };
    const resultPrepend = config.logProgress ? '' : spaCheckLogTitle;
    if (config.logResult) console.log(`${resultPrepend} Result:`, returnPayload);
    if (config.logProgress) console.groupEnd();
  }

  this.finish = (): SpaCheckReturn => {
    this.ensureCleanDOM();
    const result = !errorOccurred;
    const returnPayload: SpaCheckReturn = { success: result, log: updateList, message: config.message };
    this.log(`Done, success: ${result}`);
    this.messageEnd(returnPayload);
    return returnPayload;
  }

  this.ensureCleanDOM = () => {
    for(const key in domElements) {
      if (domElements[key] && domElements[key].parentNode && domElements[key].remove) {
        domElements[key].remove();
      }
    }
  }

  this.addCss = () => {
    domElements.style = document.createElement('style');
    domElements.style.textContent = `
      body > .spa-check-message {
        font: 20px Georgia;
        padding: 18px 12px 6px 12px;
        z-index: 9999;
        position: fixed;
        top: 0;
        right: 10%;
        color: black;
        background-color: rgba(250,250,250,0.8);
        text-align: right;
        border-radius: 0 0 12px 12px;
        max-width: 80vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: 2px solid rgb(180,180,180);
        border-top: 0;
      }
      body > .spa-check-message>.spa-check-attribution {
        font-size: 12px;
        color: dimgray;
      }
      body > .spa-check-focus-box {
        z-index: 9997;
        visibility: hidden;
        position: absolute;
        background-color: rgba(255,255,255,0.2);
        border: 2px solid white;
        box-shadow: 0 0 0 2px rgb(0,0,0);
      }
      body > .spa-check-tooltip {
        z-index: 9999;
        visibility: hidden;
        font: 14px Georgia;
        position: absolute;
        background-color: rgb(245,245,245);
        color: black;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
        max-width: ${animationTooltipMaxWidth}px;
      }
      body > .spa-check-tooltip-error {
        color: darkred;
      }
      body > .spa-check-arrow {
        z-index: 9999;
        visibility: hidden;
        width: 0;
        height: 0;
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgb(245,245,245); 
      }
      body > .spa-check-arrow-shadow {
        z-index: 9998;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        border-bottom: 14px solid rgb(180,180,180);
        margin: -3px 0 0 -4px;
      }
      body > .spa-check-tooltip-shadow {
        z-index: 9998;
        color: transparent;
        border: 2px solid rgb(180,180,180);
        background-color: rgb(180,180,180);
        margin: -2px 0 0 -2px;
        border-radius: 12px;
      }
      body > .spa-check-fade-in {
        visibility: visible;
        animation: spaCheckfadeIn ${animationFadeTime}ms; 
      }
      body > .spa-check-fade-out {
        opacity: 0;
        animation: spaCheckfadeOut ${animationFadeTime}ms; 
      }
      @keyframes spaCheckfadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes spaCheckfadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    domElements.style.textContent += config.overrideCss;
    this.selector('body')?.appendChild(domElements.style);
  }

  this.displayMessageInDOM = (message: string) => {
    domElements.message = document.createElement('div');
    const subtitle = message === defaultConfig.message ? '' : '<div class="spa-check-attribution">SPA Check</div>';
    domElements.message.innerHTML = message + subtitle;
    domElements.message.classList.add('spa-check-message')
    if (!config.displayMessage) domElements.message.style.visibility = 'hidden';
    this.selector('body')?.appendChild(domElements.message);
  }

  this.animateTooltipOpen = async (element: HTMLElement, actionMessage: string, type: 'info' | 'error' = 'info', pinnedOverride?: boolean) => {
    if (!config.displayProgress) return;

    const bodyRect = document.body.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const scrollTop = pinnedOverride ? 0 : window.pageYOffset || element.scrollTop || document.body.scrollTop;
    const scrollLeftActual = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

    domElements.focusBox = document.createElement('div');
    domElements.focusBox.classList.add('spa-check-focus-box');

    domElements.arrow = document.createElement('div');
    domElements.arrow.classList.add('spa-check-arrow');

    domElements.tooltip = document.createElement('div');
    domElements.tooltip.classList.add('spa-check-tooltip');
    if (type === 'error') domElements.tooltip.classList.add('spa-check-tooltip-error');
    domElements.tooltip.textContent = actionMessage.replace(/>>/g, ' ');

    document.body.appendChild(domElements.focusBox);
    document.body.appendChild(domElements.arrow);
    document.body.appendChild(domElements.tooltip);
    const tooltipWidth = domElements.tooltip.getBoundingClientRect().width;

    let tooltipTop = elementRect.bottom + 10 + scrollTop;
    let arrowLeft = elementRect.left + scrollLeftActual + (elementRect.width/2) - 10;
    let tooltipLeft = elementRect.left + scrollLeftActual + (elementRect.width/2) - (tooltipWidth/2);

    if (arrowLeft < 8) {
      arrowLeft = 8;
    } else if (bodyRect.right + scrollLeftActual - arrowLeft < 20) {
      arrowLeft = bodyRect.right + scrollLeftActual - 20;
    }
    if (tooltipLeft < 0) {
      tooltipLeft = 0;
    }

    if (pinnedOverride) {
      domElements.focusBox.style.display = 'none';
      domElements.arrow.style.display = 'none';
      domElements.tooltip.style.position = 'fixed';
      arrowLeft -= scrollLeftActual;
      tooltipTop -= 5;
      tooltipLeft -= scrollLeftActual;
    }

    domElements.arrow.style.top = String(elementRect.bottom + scrollTop + 2) + 'px';
    domElements.arrow.style.left = String(arrowLeft) + 'px';
    domElements.tooltip.style.top = String(tooltipTop + 2) + 'px';
    domElements.tooltip.style.left = String(tooltipLeft) + 'px';

    domElements.focusBox.style.top = String(elementRect.top + scrollTop - 2) + 'px';
    domElements.focusBox.style.left = String(elementRect.left + scrollLeftActual - 2) + 'px';
    domElements.focusBox.style.width = String(elementRect.width) + 'px';
    domElements.focusBox.style.height = String(elementRect.height) + 'px';

    /* Make the shadow/outline */
    domElements.arrowShadow = domElements.arrow.cloneNode(true) as HTMLElement;
    domElements.tooltipShadow = domElements.tooltip.cloneNode(true) as HTMLElement;
    domElements.arrowShadow.classList.add('spa-check-arrow-shadow');
    domElements.tooltipShadow.classList.add('spa-check-tooltip-shadow');
    document.body.appendChild(domElements.arrowShadow);
    document.body.appendChild(domElements.tooltipShadow);

    await this.scrollIntoViewIfNeeded(element);

    domElements.focusBox.classList.add('spa-check-fade-in');
    domElements.arrowShadow.classList.add('spa-check-fade-in');
    domElements.tooltipShadow.classList.add('spa-check-fade-in');
    domElements.arrow.classList.add('spa-check-fade-in');
    domElements.tooltip.classList.add('spa-check-fade-in');
    const findTime = 500; // Time it takes for eye movement to begin (200ms) plus movement duration (est. 300ms)
    let readTime = actionMessage.length * 30 < 2000 ? actionMessage.length * 30 : 2000; // Reading covers one letter per 30ms in sentences
    readTime = readTime;
    await this.sleep((animationFadeTime + findTime + readTime) / config.displaySpeed);
  }

  this.animateTooltipClose = async () => {
    if (!config.displayProgress || !domElements.focusBox || !domElements.arrow || !domElements.tooltip || !domElements.arrowShadow || !domElements.tooltipShadow) return;
    const comprehendActionResultTime = 500;
    await (this.sleep(comprehendActionResultTime));
    domElements.focusBox.classList.add('spa-check-fade-out');
    domElements.arrow.classList.add('spa-check-fade-out');
    domElements.tooltip.classList.add('spa-check-fade-out');
    domElements.arrowShadow.classList.add('spa-check-fade-out');
    domElements.tooltipShadow.classList.add('spa-check-fade-out');
    await this.sleep(animationFadeTime);
    domElements.focusBox.remove();
    domElements.tooltip.remove();
    domElements.arrow.remove();
    domElements.tooltipShadow.remove();
    domElements.arrowShadow.remove();
  }

  this.scrollIntoViewIfNeeded = async (element: HTMLElement) => {
    if (!this.checkVisible(element)) {
      element.scrollIntoView({behavior: 'smooth'});
      await this.sleep(700);
    }
  }

  this.checkVisible = (element: HTMLElement): boolean => {
    var rect = element.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  this.validateInputs = async (actionList: SpaCheckAction[], options?: SpaCheckOptions): Promise<boolean> => {
    let inputsValid = true;
    if (actionList === undefined) {
      inputsValid = false;
      await this.error('Missing required argument Action List', '', false);
    } else if (!Array.isArray(actionList)) {
      inputsValid = false;
      await this.error('Action list argument is not an Array', '', false);
    }
    if (options !== undefined && (typeof options !== 'object' || Array.isArray(options))) {
      inputsValid = false;
      await this.error('Options argument is not an Object', '', false);
    }
    return inputsValid;
  }

  this.log = (message: string) => {
    updateList.push(message);
    const updateMessage = `* ${message}`;
    if (config.logProgress) {
      console.log(updateMessage);
    }
  }

  this.error = async (message: string, value?: string, continueOnFailure = config.continueOnFailure) => {
    errorOccurred = true;
    const valuePart = value ? `: '${value}'` : '';
    let errorMessage = `FAIL: ${message}` + valuePart;
    if (continueOnFailure) {
      errorMessage += '. Continuing execution.';
    } else {
      continueActions = false;
      errorMessage += '. Halting execution.';
    }
    updateList.push(errorMessage);
    console.error(errorMessage);
    await this.animateTooltipOpen(domElements.message, errorMessage, 'error', true);
    await this.animateTooltipClose();
  }

  this.sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  return await this.main(actionList);
}
