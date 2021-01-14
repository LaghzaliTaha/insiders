import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigndisRoutingModule } from './signdis-routing.module';
import { SigndisComponent } from './signdis/signdis.component';
import { SignatureService } from '../signature.service';

@NgModule({
  imports: [
    CommonModule,
    SigndisRoutingModule
  ],
  declarations: [SigndisComponent],
  providers : [SignatureService]
})
export class SigndisModule { }
