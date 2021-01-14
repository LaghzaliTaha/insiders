export interface GroupOfInputs {
    group_label: string;
    inputs: {
            key: string;
            label: string;
            editable: boolean;
            order: number;
            type: string;
            }[];
}
