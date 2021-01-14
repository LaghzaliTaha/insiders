import { InputBase } from "./input-base";

export class GroupInputs {
    label: string;
    inputs: InputBase<any>[];

    constructor(options: {} = {}) {
        this.label = options['label'] || '';
        this.inputs = options['inputs'] || [];
    }
}
