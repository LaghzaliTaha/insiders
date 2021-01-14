import { InputBase } from "./input-base";

export class SelectBoxInput extends InputBase<any> {
  controlType = 'dropdown';
  options: {key: any, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
