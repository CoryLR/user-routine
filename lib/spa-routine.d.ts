export type SpaRoutineAction = SpaRoutineActionString | (() => void) | Promise<void> | string;
type ActionSimple = 'await' | 'click' | 'comment' | 'exists' | 'log' | 'nav' | 'wait';
type ActionComplex = 'await' |'append' | 'exists' | 'value' | 'write';
type StringSimple = `${ActionSimple} ${string}`;
type StringComplex = `${ActionComplex} ${string} ${string}`;
export type SpaRoutineActionString = '' | StringSimple | StringComplex;
export type SpaRoutineOptions = {
  awaitTimeout?: number,
  continueOnFailure?: boolean,
  displayMessage?: boolean,
  displayProgress?: boolean,
  displaySpeed?: number,
  globalDelay?: number,
  logCollapse?: boolean,
  logProgress?: boolean,
  logResult?: boolean,
  message?: string,
  overrideCss?: string,
  separator?: string,
  tutorialMode?: boolean,
}
export type SpaRoutineReturn = { success: boolean, log: string[], message: string };
export type DomElements = {
  arrow?: HTMLElement,
  arrowShadow?: HTMLElement,
  focusBox?: HTMLElement,
  message?: HTMLElement,
  style?: HTMLElement,
  tooltip?: HTMLElement,
  tooltipShadow?: HTMLElement,
  nextButton?: HTMLElement,
  playButton?: HTMLElement,
  pauseButton?: HTMLElement,
  stopButton?: HTMLElement,
  attribution?: HTMLElement,
  status?: HTMLElement,
}

