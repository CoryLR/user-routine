import { DomElements, DryRunAction, DryRunActionString, DryRunOptions, DryRunReturn } from './dry-run.d';

export async function dryRun(actions: DryRunAction[] | string, options: DryRunOptions = {}): Promise<DryRunReturn> {

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
    message: 'Dry-Run',
    messageAttribution: 'Dry-Run',
    overrideCss: '',
    separator: ' ',
    tutorialMode: false,
  };
  /* TODO: is this necessary? */
  if (options.tutorialMode) options.globalDelay = 200;
  const config: typeof defaultConfig = Object.freeze({ ...defaultConfig, ...options });
  const updateList: string[] = [];
  const dryRunLogTitle = config.message ? `[Dry-Run] ${config.message}` : '[Dry-Run]';

  const state = {
    paused: false,
    errorOccurred: false,
    continueActions: true,
    documentKeyDownSet: false,
    nextButtonPressed: false,
  }

  let clickableTextElement: HTMLElement | undefined = undefined;
  const domElements: DomElements = {
    arrow: undefined,
    arrowShadow: undefined,
    focusBox: undefined,
    message: undefined,
    style: undefined,
    tooltip: undefined,
    tooltipShadow: undefined,
    nextButton: undefined,
    playButton: undefined,
    pauseButton: undefined,
    stopButton: undefined,
    status: undefined,
  }

  const ANIMATION_FADE_TIME = 150;
  const COMPREHEND_ACTION_RESULT_TIME = 500;
  const ANIMATION_TOOLTIP_MAX_WIDTH = 200;

  const shouldStart = checkIfShouldStart();
  if (!shouldStart) {
    const returnPayload = { success: false, log: updateList, message: config.message };
    messageEnd(returnPayload, false);
    return returnPayload;
  }

  messageStart();
  const inputsValid = await validateInputs(actions, options);
  if (!inputsValid) return finish();

  const actionList = makeActionList(actions);

  /* Event Loop */
  for (const action of actionList) {
    if (!state.continueActions) { return finish(); }
    await advanceDelay(config.globalDelay);
    try {
      await doAction(action);
    } catch (error) {
      await raiseError('Unexpected error: ' + error.message);
    }
  }
  return finish();

  /* Bundled functions */

  function makeActionList(actions: DryRunAction[] | string): DryRunAction[] {
    /* Make actionList */
    if (typeof actions === 'string') {
      return actions.split('\n').map(a => a.trimStart());
    } else if (Array.isArray(actions)) {
      return actions.map(a => typeof a === 'string' ? a.trimStart() : a);
    }
  }

  async function doAction(action: DryRunAction) {
    if (typeof action === 'string') {
      await doActionString(action as DryRunActionString)
    } else if (typeof action === 'function') {
      try {
        await performAction(
          action,
          'Running provided function',
          undefined,
          !config.tutorialMode
        );
        log('Ran provided function');
      } catch (error) {
        await animateTooltipClose();
        await raiseError('Error running provided function', error + '; function: ' + action.toString());
      }
    } else {
      await raiseError('Action is not of type string or function, got', typeof action);
    }
  }

  async function doActionString(action: DryRunActionString) {
    const actionCode = action.replace('!', '').substring(0, 3);
    if (actionCode === 'nav') {
      const location = action.split(config.separator)[1];
      if (location && location[0] === '#') {
        await performAction(
          () => { window.location.href = location; },
          `Navigating to ${location}`,
          undefined,
          !config.tutorialMode,
        )
        log(`Navigated to ${location}`);
      } else {
        await raiseError(`Unexpected nav action, got`, action);
      }

    } else if (actionCode === 'cli') {
      const [_, selector, value] = await argSplitComplex(action);
      const clickTarget = getTargetText(selector, value);
      if (value) {
        const elements = querySelectorAll(selector);
        clickableTextElement = undefined;
        findElementWithTextRecursive(elements, value, checkIfElementIsClickable);
        if (clickableTextElement) {
          await performAction(
            () => { (clickableTextElement as HTMLElement).click() },
            `Clicking ${(clickableTextElement as HTMLElement).tagName.toLowerCase()} with text '${value}'`,
            clickableTextElement,
            !config.tutorialMode,
          )
          log(`Clicked text '${value}' inside ${selector} (clicked on ${(clickableTextElement as HTMLElement).tagName.toLowerCase()})`);
        } else {
          await raiseError(`Could not find selector to click`, clickTarget);
        }
        clickableTextElement = undefined;
      } else {
        const element = await select(selector);
        if (!element) return;
        await performAction(
          () => { element.click(); },
          `Clicking ${(element as HTMLElement).tagName.toLowerCase()}`,
          element,
          !config.tutorialMode,
        )
        log(`Clicked ${selector}`);
      }

    } else if (actionCode === 'exi') {
      let [_, selector, value] = await argSplitComplex(action);
      let notOperator = false;
      if (action[0] === '!') notOperator = true;
      const existsTarget = getTargetText(selector, value);
      let found = false;
      let foundElement;

      if (value) {
        const elements = querySelectorAll(selector, false);
        clickableTextElement = undefined;
        findElementWithTextRecursive(elements, value, checkIfElementIsClickable);
        if (clickableTextElement) {
          foundElement = clickableTextElement;
          found = true;
        }
      } else {
        const element = querySelector(selector, false);
        if (element) {
          found = true;
          foundElement = element;
        }
      }

      if (found && !notOperator) {
        if (!config.tutorialMode) await animateTooltipOpen(foundElement, `Confirmed exists: ${existsTarget}`, 'info');
        if (!config.tutorialMode) await animateTooltipClose();
        log(`Confirmed exists: ${existsTarget}`);
      } else if (!found && !notOperator) {
        await raiseError(`Did not exist`, existsTarget);
      } else if (found && notOperator) {
        if (!config.tutorialMode) await animateTooltipOpen(foundElement, `Incorrectly exists: ${existsTarget}`, 'error');
        if (!config.tutorialMode) await animateTooltipClose();
        await raiseError(`Incorrectly exists: ${existsTarget}`);
      } else if (!found && notOperator) {
        if (!config.tutorialMode) await animateTooltipOpen(domElements.message, `Confirmed does not exist: ${existsTarget}`, 'info', true);
        if (!config.tutorialMode) await animateTooltipClose();
        log(`Confirmed does not exist: ${existsTarget}`);
      }
      clickableTextElement = undefined;

    } else if (actionCode === 'fil') {
      const [_, selector, value] = await argSplit(action);
      const element = await select(selector);
      if (!element) return;
      await performAction(
        () => { element.value = value; element.dispatchEvent(new InputEvent('input')); },
        `Filling value of ${element.tagName.toLowerCase()}`,
        element,
        !config.tutorialMode,
      )
      log(`Filled the value of ${selector} to '${value}'`);

    } else if (actionCode === 'val') {
      const [_, selector, value] = await argSplitComplex(action);
      const element = await select(selector);
      if (!element) return;
      /* TODO: working */
      if (element.value === undefined || element.value === null) {
        if (!config.tutorialMode) await animateTooltipOpen(element, `Element cannot have a value`, 'error');
        if (!config.tutorialMode) await animateTooltipClose();
        await raiseError(`Element ${selector} (${element.tagName.toLowerCase()}) did not have a value attribute`)
      };
      if (value === undefined || value === null) {
        if (element.value !== '') {
          if (!config.tutorialMode) await animateTooltipOpen(element, `Confirmed has a value`, 'info');
          if (!config.tutorialMode) await animateTooltipClose();
          log(`Element '${selector}' had a value ('${element.value}')`);
        } else {
          if (!config.tutorialMode) await animateTooltipOpen(element, `Expected value to exist`, 'error');
          if (!config.tutorialMode) await animateTooltipClose();
          await raiseError(`Element '${selector}' did not have a value`);
        }
      } else {
        if (element.value === value) {
          if (!config.tutorialMode) await animateTooltipOpen(element, `Value is correct`, 'info');
          if (!config.tutorialMode) await animateTooltipClose();
          log(`Element '${selector}' has the correct value: '${element.value}'`);
        } else {
          if (!config.tutorialMode) await animateTooltipOpen(element, `Expected a value of '${value}'`, 'error');
          if (!config.tutorialMode) await animateTooltipClose();
          await raiseError(`Element '${selector}' has an incorrect value, expected '${value}' but saw '${element.value}'`);
        }
      }

    } else if (actionCode === 'wri' || actionCode === 'app') {
      const [_, selector, splitText] = await argSplit(action);
      const element = await select(selector);
      if (!element) return;
      let text = splitText ? splitText : '';
      if (actionCode === 'wri') {
        await performAction(
          () => { element.textContent = text; },
          `Writing over ${selector}`,
          element,
          !config.tutorialMode,
        );
        log(`Wrote '${text}' over ${selector}`);
      } else {
        await performAction(
          () => { element.textContent += text; },
          `Appending text to ${selector}`,
          element,
          !config.tutorialMode,
        );
        log(`Appended '${text}' to ${selector}`);
      }

    } else if (actionCode === 'log') {
      let _, value;
      if (config.separator !== ' ') {
        [_, value] = action.split(config.separator)
      } else {
        [_, value] = action.split(/ (.*)/s);
      }
      if (config.tutorialMode) state.nextButtonPressed = false;
      await performAction(
        () => { log(value); },
        `${value}`,
      );
      if (config.tutorialMode) await pauseBetweenNextButtons();

    } else if (actionCode === 'com') {
      const [_, selector, value] = await argSplitComplex(action);
      if (!value) {
        await raiseError(`Value was not provided for comment action '${action}'`);
        return;
      }
      const element = await select(selector);
      if (!element) return;
      if (config.tutorialMode) state.nextButtonPressed = false;
      await animateTooltipOpen(element as HTMLElement, value, 'info');
      if (!config.tutorialMode) await animateTooltipClose();
      if (config.tutorialMode) await pauseBetweenNextButtons();

    } else if (actionCode === 'wai') {
      const [_, value] = action.split(config.separator);
      log(`Waiting ${Number(value) / 1000} second(s)`);
      await performAction(
        async () => { await nonBlockingSleep(Number(value)); },
        `Waiting ${Number(value) / 1000} second(s)`,
        undefined,
        !config.tutorialMode
      );

    } else if (actionCode === 'awa') {
      let [_, selector, value] = await argSplitComplex(action);
      let notOperator = false;
      if (action[0] === '!') notOperator = true;

      const loopCount = (config.awaitTimeout / config.globalDelay) * 2;
      let found = false;
      let foundElement;
      const awaitingTarget = getTargetText(selector, value);
      log(`Awaiting ${awaitingTarget}...`);
      const tooltipText = notOperator ? `Awaiting ${awaitingTarget} to not exist...` : `Awaiting ${awaitingTarget}...`;
      if (!config.tutorialMode) await animateTooltipOpen(domElements.message, tooltipText, 'info', true);
      for (let i = 0; i < loopCount; i++) {
        if (value) {
          /* Check for text */
          const elements: (Element | HTMLElement | HTMLInputElement)[] = Array.from(querySelectorAll(selector.replace(/>>/g, ' ')));
          for (const element of elements) {
            if (element && element.textContent && element.textContent.toLowerCase().includes(value.toLowerCase())) {
              found = true;
              clickableTextElement = undefined;
              findElementWithTextRecursive([element], value, checkIfElementIsClickable);
              foundElement = clickableTextElement;
              break;
            }
          }
        } else {
          /* Just check for element */
          const element = querySelector(selector) as HTMLElement & HTMLInputElement;
          if (element) {
            found = true;
            foundElement = element;
          }
        }
        if (found && !notOperator) break;
        if (!found && notOperator) break;
        found = false;
        await advanceDelay(config.globalDelay / 2);
      }
      if (!config.tutorialMode) await animateTooltipClose();

      if (found && !notOperator) {
        if (!config.tutorialMode) await animateTooltipOpen(foundElement, `...Found ${awaitingTarget}`, 'info');
        if (!config.tutorialMode) await animateTooltipClose();
        log(`...Found ${awaitingTarget}`);
      } else if (!found && !notOperator) {
        await raiseError(`Timed out after ${config.awaitTimeout / 1000} second(s) awaiting`, awaitingTarget);
      } else if (found && notOperator) {
        if (!config.tutorialMode) await animateTooltipOpen(foundElement, `...Timed out awaiting ${awaitingTarget} to not exist`, 'error');
        if (!config.tutorialMode) await animateTooltipClose();
        await raiseError(`...Timed out awaiting ${awaitingTarget} to not exist`);
      } else if (!found && notOperator) {
        log(`...${awaitingTarget} disappeared`);
      }
    } else if (action === '') {
      /* Do nothing, just add an extra globalDelay */
    } else {
      await raiseError('Action string keyword not recognized, got', action);
    }
  }

  async function performAction(
    actionFunction: () => void, message: string,
    element?: HTMLElement, showTooltip = true,
  ) {
    let fixedPositionOverride = false;
    if (!element) {
      element = domElements.message ? domElements.message : document.body;
      fixedPositionOverride = true;
    }
    if (showTooltip) await animateTooltipOpen(element, message, 'info', fixedPositionOverride);
    await actionFunction();
    if (showTooltip && !config.tutorialMode) await animateTooltipClose();
  }

  async function select(selector: string): Promise<HTMLElement & HTMLInputElement> {
    const element = querySelector(selector) as HTMLElement & HTMLInputElement;
    if (!element) {
      await raiseError('CSS Selector not found', selector.replace(/>>/g, ' '));
    }
    return element;
  }

  function querySelector(selector: string, reportError = true): Element | Node | undefined {
    const cssSelector = selector.replace(/>>/g, ' ');
    const element = document.querySelector(cssSelector);
    return element;
  }

  function querySelectorAll(selector: string, reportError = true): Element[] | NodeListOf<Element> | undefined {
    const cssSelector = selector.replace(/>>/g, ' ');
    const element = document.querySelectorAll(cssSelector);
    return element;
  }

  /**
   * Finds the smallest element containing the given text and assigns it to clickableTextElement
   */
  function findElementWithTextRecursive(
    elements: any | NodeListOf<any>,
    text: string,
    condition = (e: HTMLElement) => e.tagName !== 'SCRIPT',
  ): void {
    for (const element of elements) {
      const elementContainsText = checkIfElementContainsText(element, text);
      if (!elementContainsText) continue;
      if (condition(element)) {
        clickableTextElement = element
      }
      const selectedChildNodes = Array.from(element.childNodes).filter((e: any) => { if (condition(e)) return e })
      findElementWithTextRecursive(selectedChildNodes, text, condition);
    }
  }

  function checkIfElementIsClickable(element: HTMLElement): boolean {
    return (element as HTMLElement).click && element.tagName !== 'SCRIPT';
  }

  function checkIfElementContainsText(element: HTMLElement | HTMLInputElement | Element, text: string): boolean {
    const lowerText = text.toLowerCase();
    const foundInTextContent = element.textContent && element.textContent.toLowerCase().includes(lowerText);
    const foundInValue = typeof ((element as HTMLInputElement)).value === 'string' && ((element as HTMLInputElement)).value.toLowerCase().includes(lowerText);
    return foundInTextContent || foundInValue;
  }

  function getTargetText(selector: string, value?: string) {
    return `'${selector}'` + (value ? ` containing text '${value}'` : '');
  }

  async function argSplit(action): Promise<string[]> {
    if (config.separator !== ' ') return action.split(config.separator);
    const split = action.split(/ ([^\s]+) (.*)/s);
    if (split.length < 3) await raiseError(`Unexpected input with data, got`, action);
    split[1] = split[1].replace(/>>/g, ' ');
    return split;
  }

  async function argSplitComplex(action: string): Promise<string[]> {
    const regularSplit = action.split(config.separator);
    if (config.separator !== ' ') return regularSplit;
    if (regularSplit.length > 2) return await argSplit(action);
    regularSplit[1] = regularSplit[1].replace(/>>/g, ' ');
    return regularSplit;
  }

  function checkIfShouldStart() {
    if (typeof document === 'undefined') {
      let errorMessage = 'FAIL: document is undefined. Dry-Run can only be used in the browser. Halting execution.';
      if (config.logProgress) console.error(errorMessage);
      updateList.push(errorMessage);
      return false
    }

    const otherDryRun = document.querySelector('body > .dry-run');
    if (otherDryRun) {
      const otherMessage = otherDryRun.getAttribute('data-dry-run')
      let errorMessage = `FAIL: Dry-Run '${otherMessage}' is already running. Halting execution.`;
      if (config.logProgress) console.error(errorMessage);
      updateList.push(errorMessage);
      return false
    }

    return true
  }

  function messageStart() {
    if (config.displayMessage || config.displayProgress) addCss();
    if (config.logProgress) {
      if (config.logCollapse) {
        console.groupCollapsed(dryRunLogTitle);
      } else {
        console.group(dryRunLogTitle);
      }
    }
    displayMessageInDOM(config.message);
  }

  async function messageEnd(returnPayload, groupEndOverride = true) {
    cleanUpDOM();
    const resultPrepend = config.logProgress ? '' : dryRunLogTitle;
    if (config.logResult) console.log(`${resultPrepend} Result:`, returnPayload);
    if (config.logProgress && groupEndOverride) console.groupEnd();
  }

  async function finish(): Promise<DryRunReturn> {
    const result = !state.errorOccurred;
    const returnPayload: DryRunReturn = { success: result, log: updateList, message: config.message };
    log(`Done, success: ${result}`);
    messageEnd(returnPayload);
    return returnPayload;
  }

  async function cleanUpDOM() {
    for (const key in domElements) {
      if (domElements[key] && domElements[key].parentNode && domElements[key].remove) {
        domElements[key].remove();
      }
    }
    if (state.documentKeyDownSet) {document.onkeydown = null};
  }

  async function addCss() {
    domElements.style = document.createElement('style');
    domElements.style.textContent = `
      body > .dry-run {
        font: 20px Arial;
        padding: 18px 12px 6px 12px;
        z-index: 9999;
        position: fixed;
        top: 0;
        right: 10%;
        color: black;
        background-color: rgba(250,250,250,0.8);
        text-align: center;
        border-radius: 0 0 12px 12px;
        max-width: 80vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: 2px solid rgb(180,180,180);
        border-top: 0;
      }
      body > .dry-run > .dry-run-footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: 15px;
        font-size: 12px;
        margin-top: 5px;
      }
      body .dry-run-footer .dry-run-play {
        display: none;
      }
      body .dry-run-footer .dry-run-play,
      body .dry-run-footer .dry-run-pause,
      body .dry-run-footer .dry-run-stop {
        padding: 4px;
      }
      body .dry-run-footer .dry-run-play:hover,
      body .dry-run-footer .dry-run-pause:hover,
      body .dry-run-footer .dry-run-stop:hover {
        cursor: pointer;
      }
      body > .dry-run > .dry-run-footer .dry-run-play-icon {
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 8px solid rgb(191, 191, 191);
      }
      body > .dry-run > .dry-run-footer .dry-run-pause-icon {
        width: 2px;
        height: 8px;
        border-left: 3px solid rgb(191, 191, 191);
        border-right: 3px solid rgb(191, 191, 191);
        margin: 1px 0;
      }
      body > .dry-run > .dry-run-footer .dry-run-stop-icon {
        height: 8px;
        width: 8px;
        background-color: rgb(191, 191, 191);
      }
      body .dry-run-footer .dry-run-play:hover .dry-run-play-icon {
        border-left: 8px solid rgb(80, 80, 80);
      }
      body .dry-run-footer .dry-run-pause:hover .dry-run-pause-icon {
        border-left: 3px solid rgb(80, 80, 80);
        border-right: 3px solid rgb(80, 80, 80);
      }
      body .dry-run-footer .dry-run-stop:hover .dry-run-stop-icon {
        background-color: rgb(80, 80, 80);
      }
      body > .dry-run > .dry-run-footer > .dry-run-status,
      body > .dry-run > .dry-run-footer > .dry-run-attribution {
        text-align: left;
        color: dimgray;
      }
      body > .dry-run > .dry-run-footer > .dry-run-status {
        min-width: 60px;
        min-height: 15px;
        margin-left: 5px;
        font-style: italic;
      }
      body > .dry-run > .dry-run-footer > .dry-run-attribution {
        margin-left: auto;
        padding-left: 5px;
      }
      body > .dry-run-focus-box {
        z-index: 9997;
        visibility: hidden;
        position: absolute;
        background-color: rgba(255,255,255,0.2);
        border: 2px solid white;
        box-shadow: 0 0 0 2px rgb(0,0,0);
        pointer-events: none;
      }
      body > .dry-run-tooltip {
        z-index: 9999;
        visibility: hidden;
        font: 14px Arial;
        position: absolute;
        background-color: rgb(245,245,245);
        color: black;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
        max-width: ${ANIMATION_TOOLTIP_MAX_WIDTH}px;
      }
      body > .dry-run-tooltip-error {
        color: darkred;
      }
      body > .dry-run-arrow {
        z-index: 9999;
        visibility: hidden;
        width: 0;
        height: 0;
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgb(245,245,245); 
      }
      body > .dry-run-arrow-shadow {
        z-index: 9998;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        border-bottom: 14px solid rgb(180,180,180);
        margin: -3px 0 0 -4px;
      }
      body > .dry-run-tooltip-shadow {
        z-index: 9998;
        color: transparent;
        border: 2px solid rgb(180,180,180);
        background-color: rgb(180,180,180);
        margin: -2px 0 0 -2px;
        border-radius: 12px;
      }
      body > .dry-run-tooltip .dry-run-next-button {
        display: block;
        margin: 5px auto 0 auto;
        border-radius: 5px;
        padding: 5px;
        background-color: rgb(220,220,220);
        border-width: 0;
        cursor: pointer;
      }
      body > .dry-run-fade-in {
        visibility: visible;
        animation: dryRunfadeIn ${ANIMATION_FADE_TIME}ms; 
      }
      body > .dry-run-fade-out {
        opacity: 0;
        animation: dryRunfadeOut ${ANIMATION_FADE_TIME}ms; 
      }
      @keyframes dryRunfadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes dryRunfadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    domElements.style.textContent += config.overrideCss;
    document.querySelector('body').appendChild(domElements.style);
  }

  function displayMessageInDOM(message: string) {
    domElements.message = document.createElement('div');

    let htmlString = `
      ${message}
      <div class="dry-run-footer">
    `;
    if (!config.tutorialMode) {
      htmlString += `
        <div class="dry-run-play" title="Play">
          <div class="dry-run-play-icon"></div>
        </div>
        <div class="dry-run-pause" title="Pause">
          <div class="dry-run-pause-icon"></div>
        </div>
      `;
    }
    htmlString += `
        <div class="dry-run-stop" title="Stop">
          <div class="dry-run-stop-icon"></div>
        </div>
        <div class="dry-run-status"></div>
        <div class="dry-run-attribution">${config.messageAttribution}</div>
      </div>
    `;
    domElements.message.innerHTML = htmlString;

    domElements.message.setAttribute('data-dry-run', message);
    domElements.message.classList.add('dry-run');
    if (!config.displayMessage) domElements.message.style.visibility = 'hidden';
    document.querySelector('body').appendChild(domElements.message);

    domElements.playButton = document.querySelector('.dry-run .dry-run-play');
    domElements.pauseButton = document.querySelector('.dry-run .dry-run-pause');
    domElements.stopButton = document.querySelector('.dry-run .dry-run-stop');
    domElements.status = document.querySelector('.dry-run .dry-run-status');

    /* Add event listeners to play, pause, and stop buttons */
    if (!config.tutorialMode) {
      domElements.playButton.addEventListener('click', async () => {
        play();
      });
      domElements.pauseButton.addEventListener('click', async () => {
        pause();
      });
    }
    domElements.stopButton.addEventListener('click', async () => {
      await stop('pause button');
    });

    if (document.onkeydown === null && config.displayProgress && !config.tutorialMode) {
      document.onkeydown = async (event) => {
        if (event.key === 'Escape') {
          await stop('escape key');
        } else if (event.key === ' ') {
          if (state.paused) {
            play();
          } else {
            pause();
          }
        }
      }
      state.documentKeyDownSet = true;
    }
  }

  function play() {
    state.paused = false;
    domElements.playButton.style.display = "none";
    domElements.pauseButton.style.display = "block";
    domElements.status.textContent = '';
  }
  function pause() {
    state.paused = true;
    domElements.playButton.style.display = "block";
    domElements.pauseButton.style.display = "none";
    domElements.status.textContent = 'Paused';
  }
  async function stop(source) {
    const stopConfirmation = confirm(`[${config.messageAttribution}]: Are you sure you would like to stop '${config.message}'?`);
    if (stopConfirmation) {
      domElements.status.textContent = 'Stopping';
      await interruptExecution(`Stopped by user (${source})`)
    };
  }
  /* TODO2 */
  async function next() {
    state.nextButtonPressed = true;
    await animateTooltipClose(false);
  }

  async function animateTooltipOpen(element: HTMLElement, actionMessage: string, type: 'info' | 'error' = 'info', pinnedOverride?: boolean) {
    if (!config.displayProgress) return;

    const bodyRect = document.body.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const scrollTop = pinnedOverride ? 0 : window.pageYOffset || element.scrollTop || document.body.scrollTop;
    const scrollLeftActual = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

    domElements.focusBox = document.createElement('div');
    domElements.focusBox.classList.add('dry-run-focus-box');

    domElements.arrow = document.createElement('div');
    domElements.arrow.classList.add('dry-run-arrow');

    domElements.tooltip = document.createElement('div');
    domElements.tooltip.classList.add('dry-run-tooltip');
    if (type === 'error') domElements.tooltip.classList.add('dry-run-tooltip-error');
    domElements.tooltip.textContent = actionMessage.replace(/>>/g, ' ');

    if (config.tutorialMode) {
      domElements.nextButton = document.createElement('button');
      domElements.nextButton.textContent = "Next";
      domElements.nextButton.classList.add('dry-run-next-button');
      domElements.nextButton.addEventListener('click', async () => {
        await next();
      });
      domElements.tooltip.appendChild(domElements.nextButton);
    }

    document.body.appendChild(domElements.focusBox);
    document.body.appendChild(domElements.arrow);
    document.body.appendChild(domElements.tooltip);
    const tooltipWidth = domElements.tooltip.getBoundingClientRect().width;

    let tooltipTop = elementRect.bottom + 10 + scrollTop;
    let arrowLeft = elementRect.left + scrollLeftActual + (elementRect.width / 2) - 10;
    let tooltipLeft = elementRect.left + scrollLeftActual + (elementRect.width / 2) - (tooltipWidth / 2);

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
    domElements.arrowShadow.classList.add('dry-run-arrow-shadow');
    domElements.tooltipShadow.classList.add('dry-run-tooltip-shadow');
    document.body.appendChild(domElements.arrowShadow);
    document.body.appendChild(domElements.tooltipShadow);

    await scrollIntoViewIfNeeded(element);

    domElements.focusBox.classList.add('dry-run-fade-in');
    domElements.arrowShadow.classList.add('dry-run-fade-in');
    domElements.tooltipShadow.classList.add('dry-run-fade-in');
    domElements.arrow.classList.add('dry-run-fade-in');
    domElements.tooltip.classList.add('dry-run-fade-in');
    const findTime = 500; // Time it takes for eye movement to begin (200ms) plus movement duration (est. 300ms)
    let readTime = actionMessage.length * 30 < 2000 ? actionMessage.length * 30 : 2000; // Reading covers one letter per 30ms in sentences
    readTime = readTime;
    await advanceDelay((ANIMATION_FADE_TIME + findTime + readTime) / config.displaySpeed);
  }

  async function animateTooltipClose(addComprehensionTime = true) {
    if (!config.displayProgress || !domElements.focusBox || !domElements.arrow || !domElements.tooltip || !domElements.arrowShadow || !domElements.tooltipShadow) return;
    /* TODO: Significantly reduce delay after clicking "next", maybe change strategy
            to do more with the actual click event */
    if (addComprehensionTime) await (advanceDelay(COMPREHEND_ACTION_RESULT_TIME));
    domElements.focusBox.classList.add('dry-run-fade-out');
    domElements.arrow.classList.add('dry-run-fade-out');
    domElements.tooltip.classList.add('dry-run-fade-out');
    domElements.arrowShadow.classList.add('dry-run-fade-out');
    domElements.tooltipShadow.classList.add('dry-run-fade-out');
    await advanceDelay(ANIMATION_FADE_TIME);
    domElements.focusBox.remove();
    domElements.tooltip.remove();
    domElements.arrow.remove();
    domElements.tooltipShadow.remove();
    domElements.arrowShadow.remove();
  }

  async function scrollIntoViewIfNeeded(element: HTMLElement) {
    if (!checkVisible(element)) {
      element.scrollIntoView({ behavior: 'smooth' });
      await advanceDelay(700);
    }
  }

  function checkVisible(element: HTMLElement): boolean {
    var rect = element.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  async function validateInputs(actionList: DryRunAction[] | string, options?: DryRunOptions): Promise<boolean> {
    let inputsValid = true;
    if (actionList === undefined) {
      inputsValid = false;
      await raiseError('Missing required argument Action List', '', false);
    } else if (!Array.isArray(actionList) && typeof actionList !== 'string') {
      inputsValid = false;
      await raiseError('Action list argument is not an Array or string', '', false);
    }
    if (options !== undefined && (typeof options !== 'object' || Array.isArray(options))) {
      inputsValid = false;
      await raiseError('Options argument is not an Object', '', false);
    }
    return inputsValid;
  }

  function log(message: string) {
    updateList.push(message);
    const updateMessage = `* ${message}`;
    if (config.logProgress) console.log(updateMessage);
  }

  async function raiseError(message: string, value?: string, continueOnFailure = config.continueOnFailure, animateError = true) {
    state.errorOccurred = true;
    const valuePart = value ? `: '${value}'` : '';
    let showMessage = message + valuePart;
    if (continueOnFailure) {
      showMessage += '. Continuing execution.';
    } else {
      state.continueActions = false;
      showMessage += '. Halting execution.';
    }
    const errorMessage = 'FAIL: ' + showMessage;
    updateList.push(errorMessage);
    if (config.logProgress) console.error(errorMessage);
    if (animateError) {
      await animateTooltipOpen(domElements.message, errorMessage, 'error', true);
      await animateTooltipClose();
    }
  }

  async function interruptExecution(message: string) {
    state.continueActions = false;
    if (document.contains(domElements.tooltip)) await animateTooltipClose(false);
    await raiseError(message, '', false, false);
  }

  async function advanceDelay(milliseconds) {
    await pauseIfNeeded();
    return await sleep(milliseconds);
  }

  async function pauseIfNeeded() {
    while (state.paused && state.continueActions) {
      await sleep(config.globalDelay / 2);
    }
  }
  async function pauseBetweenNextButtons() {
    /* TODO2 */
    while (!state.nextButtonPressed && state.continueActions) {
      await sleep(config.globalDelay / 2);
    }
    state.nextButtonPressed = false;
  }

  async function nonBlockingSleep(milliseconds: number) {
    if (milliseconds <= (config.globalDelay / 2)) {
      await sleep(milliseconds);
    } else {
      const loopCount = (milliseconds / config.globalDelay) * 2;
      const timeRemainder = (milliseconds % config.globalDelay) / 2;
      for (let i = 0; i < loopCount; i++) {
        await advanceDelay(config.globalDelay / 2);
      }
      await advanceDelay(timeRemainder);
    }
  }

  async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

}