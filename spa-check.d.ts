export type SpaCheckAction = SpaCheckActionString | (() => void) | Promise<void>;
type ActionSimple = 'await' | 'click' | 'exists' | 'log' | 'nav' | 'wait';
type ActionComplex = 'await' |'append' | 'exists' | 'value' | 'write';
type StringSimple = `${ActionSimple} ${string}`;
type StringComplex = `${ActionComplex} ${string} ${string}`;
export type SpaCheckActionString = '' | StringSimple | StringComplex;
export type SpaCheckOptions = {
  awaitTimeout?: number,
  continueOnFailure?: boolean,
  displayMessage?: boolean,
  displayProgress?: boolean,
  globalDelay?: number,
  logCollapse?: boolean,
  logProgress?: boolean,
  logResult?: boolean,
  message?: string,
  overrideCss?: string,
}
export type SpaCheckReturn = { success: boolean, log: string[], message: string };
export type DomElements = {
  arrow?: HTMLElement,
  arrowShadow?: HTMLElement,
  focusBox?: HTMLElement,
  message?: HTMLElement,
  style?: HTMLElement,
  tooltip?: HTMLElement
  tooltipShadow?: HTMLElement
}

