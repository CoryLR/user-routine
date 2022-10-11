import { SpaCheckAction, SpaCheckActionString, SpaCheckOptions, SpaCheckReturn } from './spa-check.d';

/**
 * Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, check if things exist, etc.
 * @example new SpaCheck(['click button.some-class', 'value form>input Hello, world!', 'exists .success-message'], {message: 'See if the feature works', globalDelay: 1000});
 * @param actionList Available actions types: append, await, click, exists, log, nav, value, write, or provide a custom function
 * @param options Available options: awaitTimeout, continueOnFailure, globalDelay, logUpdates, message, messageStyle, messageShowInDOM
 */
export async function spaCheck(actionList: SpaCheckAction[], options?: SpaCheckOptions): Promise<SpaCheckReturn> {

  const defaultConfig = {
    continueOnFailure: false,
    globalDelay: 500,
    awaitTimeout: 15000,
    logUpdates: true,
    message: '',
    messageShowInDOM: false,
    messageStyle: 'font-size:24px; padding:10px; z-index:9999; position:fixed; top:0; right:10%; color:black; background-color:rgba(222,222,222,0.8);',
  };
  const updateList: string[] = [];
  const config: SpaCheckOptions = { ...defaultConfig, ...options };
  let errorOccurred = false;
  let msgElement: HTMLElement | undefined = undefined;
  let continueActions = true;

  this.main = async (actionList: SpaCheckAction[]) => {
    this.messageStart();
    for (const action of actionList) {
      if (!continueActions) { return this.finish() }
      await this.sleep(config.globalDelay);
      try {
        await this.do(action);
      } catch (error) {
        console.error('FAIL: Unexpected error received', error);
      }
    }
    return this.finish();
  }

  this.finish = (): SpaCheckReturn => {
    const result = !errorOccurred;
    const returnPayload: SpaCheckReturn = { success: result, log: updateList, message: config.message };
    this.log(`Done, success: ${result}`);
    this.messageEnd(returnPayload);
    return returnPayload;
  }

  this.do = async (action: SpaCheckAction) => {
    if (typeof action === 'string') {
      await this.doActionString(action as SpaCheckActionString)
    } else if (typeof action === 'function') {
      try {
        await action();
        this.log('Ran provided function');
      } catch (error) {
        this.error('Error running provided function', error + '; function: ' + action.toString());
      }
    } else {
      this.error('Action is not of type string or function, got', typeof action);
    }
  }

  this.doActionString = async (action: SpaCheckActionString) => {
    const actionCode = action.substring(0, 3);
    if (actionCode === 'nav') {
      const location = action.split(' ')[1];
      if (location && location[0] === '#') {
        window.location.href = location;
        this.log(`Navigated to ${location}`);
      } else {
        this.error(`Unexpected nav action, got`, action);
      }

    } else if (actionCode === 'cli') {
      const selector = action.split(' ')[1];
      const element = this.select(selector);
      if (!element) return;
      element.click();
      this.log(`Clicked ${selector}`);

    } else if (actionCode === 'exi') {
      const spaceSplit = action.split(' ');
      const [_, selector, value] = spaceSplit.length > 2 ? this.argSplit(action) : spaceSplit;
      const element = document.querySelector(selector) as HTMLElement & HTMLInputElement;
      const found = value ? element && element.textContent?.toLowerCase().includes(value.toLowerCase()) : element;
      const existsTarget = `'${selector}'` + (value ? ` containing text '${value}'` : '');
      if (found) {
        this.log(`Exists: ${existsTarget}`);
      } else {
        this.error(`Does not exist`, existsTarget);
      }

    } else if (actionCode === 'val') {
      const [_, selector, value] = this.argSplit(action);
      const element = this.select(selector);
      if (!element) return;
      this.select(selector).value = value;
      this.log(`Set the value of ${selector} to ${value}`);

    } else if (actionCode === 'wri' || actionCode === 'app') {
      const [_, selector, text] = this.argSplit(action);
      const element = this.select(selector);
      if (!element) return;
      if (actionCode === 'wri') {
        element.textContent = text;
        this.log(`Wrote '${text}' over ${selector}`);
      } else {
        element.textContent += text;
        this.log(`Appended '${text}' to ${selector}`);
      }

    } else if (actionCode === 'log') {
      const [_, value] = action.split(/ (.*)/s);
      this.log(value);

    } else if (actionCode === 'wai') {
      const [_, value] = action.split(' ');
      this.log(`Waiting ${Number(value) / 1000} second(s)`);
      await this.sleep(Number(value));

    } else if (actionCode === 'awa') {
      const spaceSplit = action.split(' ');
      const [_, selector, value] = spaceSplit.length > 2 ? this.argSplit(action) : spaceSplit;
      const loopCount = config.awaitTimeout / config.globalDelay;
      let element;
      let found;
      const awaitingTarget = `'${selector}'` + (value ? ` containing text '${value}'` : '');
      this.log(`Awaiting ${awaitingTarget}...`);
      for (let i = 0; i < loopCount; i++) {
        element = document.querySelector(selector) as HTMLElement & HTMLInputElement;
        found = value ? element && element.textContent.toLowerCase().includes(value.toLowerCase()) : element;
        if (found) {
          break;
        } else {
          await this.sleep(config.globalDelay);
        }
      }
      if (found) {
        this.log(`... Found ${awaitingTarget}`);
      } else {
        this.error(`Timed out after ${config.awaitTimeout / 1000} second(s) awaiting`, awaitingTarget);
      }
    } else if (action === '') {
      /* Do nothing, just add an extra globalDelay */
    } else {
      this.error('Action string keyword not recognized, got', action);
    }
  }

  this.select = (selector: string): HTMLElement & HTMLInputElement => {
    const element = document.querySelector(selector) as HTMLElement & HTMLInputElement;
    if (!element) {
      this.error('CSS Selector not found', selector);
    }
    return element;
  }

  this.argSplit = (action): string[] => {
    const split = action.split(/ ([^\s]+) (.*)/s);
    if (split.length < 3) {
      this.error(`Unexpected ${split[0]} input with data, got:`, action);
    }
    return split;
  }

  this.messageStart = () => {
    if (config.logUpdates) console.group(`[SPA Check] ${config.message}`);
    msgElement = config.messageShowInDOM && config.message ? this.displayMessageInDOM(config.message, config.messageStyle) : undefined;
  }

  this.messageEnd = (returnPayload) => {
    if (msgElement) { msgElement.remove() };
    if (config.logUpdates) console.log('Result:', returnPayload);
    if (config.logUpdates) console.groupEnd();
  }

  this.displayMessageInDOM = (message: string, messageStyle: string) => {
    const msgElement = document.createElement('p');
    msgElement.textContent = message;
    msgElement.setAttribute('style', messageStyle);
    document.querySelector('body')?.appendChild(msgElement);
    return msgElement;
  }

  this.log = (message: string) => {
    updateList.push(message);
    const updateMessage = `* ${message}`;
    if (config.logUpdates) {
      console.log(updateMessage);
    }
  }

  this.error = (message: string, value: string, continueOnFailure = config.continueOnFailure) => {
    errorOccurred = true;
    let errorMessage = `FAIL: ${message}: '${value}'`;
    if (continueOnFailure) {
      errorMessage += '. Continuing execution.';
      updateList.push(errorMessage);
      console.error(errorMessage);
    } else {
      continueActions = false;
      errorMessage += '. Halting execution.';
      updateList.push(errorMessage);
      throw new Error(errorMessage);
    }
  }

  this.sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  return await this.main(actionList);
}
