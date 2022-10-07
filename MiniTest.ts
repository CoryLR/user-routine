
export type Action = `nav ${string}` | `click ${string}` | `exists ${string}` | `value ${string} ${string}` | `write ${string} ${string}` | `includes ${string} ${string}` | `log ${string}`;
export type MiniTestOptions = { globalDelay?: number; message?: string, messageStyle: string }

/**
 * MiniTest
 * @example new MiniTest(['nav #id', 'click button', 'value input[type="text"] hello world'])
 * @param actionList Available actions: nav, click, exists, value, write, includes, log
 * @param options Available options: globalDelay, message
 */
export class MiniTest {
  static defaultConfig = { globalDelay: 500, message: '', messageStyle: 'font-size:24px; padding:10px; z-index:9999; position:fixed; top:0; right:10%; color:black; background-color:rgba(222,222,222,0.8);'};
  continue = true;
  constructor(actionList: Action[], config?: MiniTestOptions) {
    const finalConfig = { ...MiniTest.defaultConfig, ...config };
    this.start(actionList, finalConfig);
  }

  start(actionList: Action[], config: typeof MiniTest.defaultConfig) {
    const msgElement = config.message ? this.displayMessage(config.message, config.messageStyle) : undefined;
    actionList.forEach((action, i) => {
      const delay = i * config.globalDelay;
      setTimeout(() => {
        if (this.continue) { this.do(action) }
      }, delay)
    })
    if (msgElement) { setTimeout(() => {msgElement.remove()}, actionList.length * config.globalDelay) };
  }

  do(action: Action) {
    const actionCode = action.substring(0, 3);
    if (actionCode === 'nav') {
      window.location.href = action.split(' ')[1];

    } else if (actionCode === 'cli') {
      this.select(action.split(' ')[1]).click();

    } else if (actionCode === 'exi') {
      this.select(action.split(' ')[1]);

    } else if (actionCode === 'val') {
      const [_, selector, value] = this.argSplit(action);
      this.select(selector).value = value;

    } else if (actionCode === 'inc') {
      const [_, selector, text] = this.argSplit(action);
      if (this.select(selector).innerText.indexOf(text) === -1) {
        this.error('Text not found', text);
      }

    } else if (actionCode === 'wri') {
      const [_, selector, text] = this.argSplit(action);
      this.select(selector).textContent += text;

    } else if (actionCode === 'log') {
      const [_, value] = action.split(/ (.*)/s);
      console.log(value);
    }
  }

  select(selector: string): HTMLElement & HTMLInputElement {
    const element = document.querySelector(selector) as HTMLElement & HTMLInputElement;
    if (!element) {
      this.continue = false;
      this.error('CSS Selector not found', selector);
    }
    return element;
  }

  argSplit(action): string[] {
    return action.split(/ ([^\s]+) (.*)/s)
  }

  displayMessage(message: string, messageStyle: string) {
    const msgElement = document.createElement('p');
    msgElement.textContent = message;
    msgElement.setAttribute('style', messageStyle);
    document.querySelector('body')?.appendChild(msgElement);
    return msgElement;
  }

  error(message: string, value: string) {
    throw new Error(`[MiniTest] ${message}: '${value}'. Halting execution.`);
  }
}