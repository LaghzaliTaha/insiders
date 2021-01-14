import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthpermanentRoutingModule } from './authpermanent-routing.module';
import { AutpermanentComponent } from './autpermanent/autpermanent.component';
import { SignatureService } from '../signature.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    AuthpermanentRoutingModule
  ],
  declarations: [AutpermanentComponent],
  providers : [SignatureService,UserService]
})
export class AuthpermanentModule { }
