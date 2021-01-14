import { Component, Input, OnInit, Output, EventEmitter, ViewChild }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { InputBase } from '../../models/input-base';
import { FormService } from '../../services/form.service';
import { GroupInputs } from '../../models/group-inputs';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @ViewChild(DynamicFormInputComponent)
  myInputForm: DynamicFormInputComponent;
  @Output() formChanged: EventEmitter<any> = new EventEmitter();
  @Output() formSubmited: EventEmitter<any> = new EventEmitter();
  @Output() formValid: EventEmitter<any> = new EventEmitter();
  @Output() showPopup: EventEmitter<any> = new EventEmitter();
  @Input() groups: GroupInputs[] = [];
  form: FormGroup;
  payLoad = '';
  changedInputs = [];
  disabled = true;
  constructor(private _formService: FormService) {  }

  ngOnInit() {
    let inputs: InputBase<any>[] = [];
    this.groups.forEach(group => {
      inputs = inputs.concat(group.inputs);
    });

    this.form = this._formService.toFormGroup(inputs);
    this.onValid();

    this.groups.forEach(group => {
      group.inputs.forEach(input => {
        this.form.get(input.key).valueChanges.subscribe(data => {
          // if (!this.changedInputs.find(inp => inp.input == input.key)) {
            this.changedInputs.push({
              group: group.label,
              input: input.key,
              label: input.label
            });
         // }
        }); 
      });
    });

    this.form.valueChanges.subscribe(data => {
      this.disabled = false;
    });
 
    
  }

  onClick($event){
    this.showPopup.emit($event) ;
  };

  onSubmit() {
    //this.payLoad = JSON.stringify(this.form.value);
    this.formSubmited.emit(this.form.value);
  }

  onChanges(event): void {
        this.formChanged.emit({
          input: 'pilote',
          value: event
        });
  }

  

  onValid(): void {
    this.form.statusChanges.subscribe(
      valid => {
        this.formValid.emit(!this.form.valid);
      }
    );
  }
  
}