import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignoccasionnelRoutingModule } from './signoccasionnel-routing.module';
import { SignoccasionnelComponent } from './signoccasionnel/signoccasionnel.component';
import { SignatureService } from '../signature.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    SignoccasionnelRoutingModule
  ],
  declarations: [SignoccasionnelComponent],
  providers : [SignatureService,UserService]
})
export class SignoccasionnelModule { }
