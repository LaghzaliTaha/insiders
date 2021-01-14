import { InputBase } from "./input-base";

export class DateBoxInput extends InputBase<Date> {
  controlType = 'datebox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
