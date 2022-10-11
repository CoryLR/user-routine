export type SpaCheckAction = SpaCheckActionString | (() => void) | Promise<void>;
type ActionSimple = 'await' | 'click' | 'exists' | 'log' | 'nav' | 'wait';
type ActionComplex = 'await' |'append' | 'exists' | 'value' | 'write';
type StringSimple = `${ActionSimple} ${string}`;
type StringComplex = `${ActionComplex} ${string} ${string}`;
export type SpaCheckActionString = '' | StringSimple | StringComplex;
export type SpaCheckOptions = {
  awaitTimeout: number,
  continueOnFailure: boolean,
  globalDelay: number,
  logUpdates: boolean,
  message: string,
  messageShowInDOM: boolean,
  messageStyle: string,
}
export type SpaCheckReturn = { success: boolean, log: string[], message: string };

