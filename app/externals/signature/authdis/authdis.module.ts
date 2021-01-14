import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthdisRoutingModule } from './authdis-routing.module';
import { AuthdisComponent } from './authdis/authdis.component';
import { SignatureService } from '../signature.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    AuthdisRoutingModule
  ],
  declarations: [AuthdisComponent],
  providers : [SignatureService,UserService]
})
export class AuthdisModule { }
