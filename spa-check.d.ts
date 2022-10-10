export type SpaCheckAction = SpaCheckActionString | SpaCheckActionFunction;
export type SpaCheckOptions = {
  continueOnFailure: boolean,
  globalDelay: number,
  logUpdates: boolean,
  message: string,
  messageShowInDOM: boolean,
  messageStyle: string,
}
export type SpaCheckActionString = '' | `nav ${string}` | `click ${string}` | `exists ${string}` | `value ${string} ${string}` | `write ${string} ${string}` | `includes ${string} ${string}` | `log ${string}`;
export type SpaCheckActionFunction = () => void;