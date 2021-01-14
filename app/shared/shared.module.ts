import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';


import { LayoutModule } from './layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './forms/components/dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './forms/components/dynamic-form-input/dynamic-form-input.component';
import { FormService } from './forms/services/form.service';
import { CalendarModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    CalendarModule
  ],
   declarations: [DynamicFormComponent, DynamicFormInputComponent],
   exports: [LayoutModule, DynamicFormComponent],
   providers: [FormService]
})
export class SharedModule { }
