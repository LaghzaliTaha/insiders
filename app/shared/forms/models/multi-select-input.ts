import { InputBase } from "./input-base";

export class MultiSelectInput extends InputBase<any[]> {
  controlType = 'multiselect';
  options: {key: any, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}