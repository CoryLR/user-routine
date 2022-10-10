export type SpaCheckAction = SpaCheckActionString | SpaCheckActionFunction;
export type SpaCheckOptions = {
  continueOnFailure?: false,
  done?: (success: boolean, errors?: string[]) => { },
  drawMessage?: boolean,
  globalDelay?: number,
  message?: string,
  messageStyle?: string,
}
export type SpaCheckActionString = '' | `nav ${string}` | `click ${string}` | `exists ${string}` | `value ${string} ${string}` | `write ${string} ${string}` | `includes ${string} ${string}` | `log ${string}`;
export type SpaCheckActionFunction = () => void;