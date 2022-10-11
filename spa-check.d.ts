export type SpaCheckAction = SpaCheckActionString | (() => void) | Promise<void>;
export type SpaCheckActionString = '' | `nav ${string}` | `click ${string}` | `exists ${string}` | `value ${string} ${string}` | `write ${string} ${string}` | `includes ${string} ${string}` | `log ${string}`;
export type SpaCheckOptions = {
  awaitTimeout: number,
  continueOnFailure: boolean,
  globalDelay: number,
  logUpdates: boolean,
  message: string,
  messageShowInDOM: boolean,
  messageStyle: string,
}
export type SpaCheckReturn = { result: boolean, updateList: string[] };

