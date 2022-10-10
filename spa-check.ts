import { SpaCheckAction, SpaCheckActionFunction, SpaCheckActionString, SpaCheckOptions } from './spa-check.d';

/**
 * Automated testing for single-page applications (SPAs). Small, portable, and easy to use. Click on things, fill in values, check if things exist, etc.
 * @example new SpaCheck(['click button.some-class', 'value form>input Hello, world!', 'exists .success-message'], {message: "See if the feature works", globalDelay: 1000});
 * @param actionList Available actions types: click, exists, includes, log, nav, value, write, or provide a custom function
 * @param options Available options: continueOnFailure, done (callback function), globalDelay, logUpdates, message, messageStyle, messageShowInDOM
 */
export class SpaCheck {

  public static defaultConfig = {
    continueOnFailure: false,
    done: (success: boolean, log: string[]) => { console.log('Success:', success) },
    globalDelay: 500,
    logUpdates: true,
    message: '',
    messageShowInDOM: false,
    messageStyle: 'font-size:24px; padding:10px; z-index:9999; position:fixed; top:0; right:10%; color:black; background-color:rgba(222,222,222,0.8);',
  };
  public updateList: string[] = [];
  public startTime = new Date();

  private config: typeof SpaCheck.defaultConfig;
  private continue = true;
  private errorOccurred = false;
  private msgElement;

  constructor(actionList: SpaCheckAction[], options?: SpaCheckOptions) {
    this.config = { ...SpaCheck.defaultConfig, ...options };
    this.start(actionList);
  }

  private async start(actionList: SpaCheckAction[]) {
    try {
      this.messageStart();
      for (const action of actionList) {
        if (!this.config.continueOnFailure && this.continue) {
          await this.sleep(this.config.globalDelay);
          await this.do(action);
        }
      }
      this.messageEnd();
      const success = !this.errorOccurred;
      this.config.done(success, this.updateList);
    } catch (error) {
      this.error('Unepected error received', error, false);
    }
  }

  private async do(action: SpaCheckAction) {
    if (typeof action === 'string') {
      this.doActionString(action as SpaCheckActionString)
    } else if (typeof action === 'function') {
      try {
        (action as SpaCheckActionFunction)();
      } catch (error) {
        this.error('Error running provided function', error + '; function: ' + action.toString());
      }
    } else {
      this.error('Action is not of type string or function, got', typeof action);
    }
  }

  private doActionString(action: SpaCheckActionString) {
    const actionCode = action.substring(0, 3);
    if (actionCode === 'nav') {
      const location = action.split(' ')[1]
      if (location && location[0] === '#') {
        window.location.href = location;
        this.log(`Navigated to ${location}`);
      } else {
        this.error(`Unexpected nav action, got`, action);
      }

    } else if (actionCode === 'cli') {
      const selector = action.split(' ')[1];
      this.select(selector).click();
      this.log(`Clicked on ${selector}`);

    } else if (actionCode === 'exi') {
      const selector = action.split(' ')[1];
      this.select(selector);
      this.log(`Verified ${selector} exists`);

    } else if (actionCode === 'val') {
      const [_, selector, value] = this.argSplit(action);
      this.select(selector).value = value;
      this.log(`Set the value of ${selector} to ${value}`);

    } else if (actionCode === 'inc') {
      const [_, selector, text] = this.argSplit(action);
      if (this.select(selector).innerText.indexOf(text) === -1) {
        this.error('Text not found', text);
      } else {
        this.log(`Verified ${selector} includes "${text}"`);
      }

    } else if (actionCode === 'wri') {
      const [_, selector, text] = this.argSplit(action);
      this.select(selector).textContent += text;
      this.log(`Wrote "${text}" at the end of ${selector}`);

    } else if (actionCode === 'log') {
      const [_, value] = action.split(/ (.*)/s);
      console.log(value);
    } else if (action === '') {
    } else {
      this.error('Action string keyword not recognized, got', action);
    }
  }

  private select(selector: string): HTMLElement & HTMLInputElement {
    const element = document.querySelector(selector) as HTMLElement & HTMLInputElement;
    if (!element) {
      this.continue = false;
      this.error('CSS Selector not found', selector);
    }
    return element;
  }

  private argSplit(action): string[] {
    const split = action.split(/ ([^\s]+) (.*)/s);
    if (split.length < 3) {
      this.error(`Unexpected ${split[0]} input, got:`, action);
    }
    return split
  }

  private messageStart() {
    console.group(`[SpaCheck] ${this.config.message}`);
    this.msgElement = this.config.messageShowInDOM && this.config.message ? this.displayMessageInDOM(this.config.message, this.config.messageStyle) : undefined;
  }

  private messageEnd() {
    if (this.msgElement) { this.msgElement.remove() };
    console.groupEnd();
  }

  private displayMessageInDOM(message: string, messageStyle: string) {
    const msgElement = document.createElement('p');
    msgElement.textContent = message;
    msgElement.setAttribute('style', messageStyle);
    document.querySelector('body')?.appendChild(msgElement);
    return msgElement;
  }

  private log(message: string) {
    const updateMessage = `* ${message}`;
    this.updateList.push(updateMessage);
    if (this.config.logUpdates) {
      console.log(updateMessage);
    }
  }

  private error(message: string, value: string, continueOnFailure = this.config.continueOnFailure) {
    const errorMessage = `* ${message}: '${value}'`;
    this.updateList.push(errorMessage);
    if (continueOnFailure) {
      console.error(`${errorMessage}. Continuing execution.`);
    } else {
      this.config.done(false, this.updateList);
      throw new Error(`${errorMessage}. Halting execution.`);
    }
  }

  private sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

}