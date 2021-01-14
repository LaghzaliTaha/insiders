import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthoccasionnelRoutingModule } from './authoccasionnel-routing.module';
import { AuthOccasionnelComponent } from './auth-occasionnel/auth-occasionnel.component';
import { SignatureService } from '../signature.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    AuthoccasionnelRoutingModule
  ],
  declarations: [AuthOccasionnelComponent],
  providers : [SignatureService,UserService]
})
export class AuthoccasionnelModule { }
