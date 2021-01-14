import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmdisRoutingModule } from './confirmdis-routing.module';
import { ConfirmdisComponent } from './confirmdis/confirmdis.component';
import { SignatureService } from '../signature.service';
import { SendmailService } from '../../../shared/sendmail/sendmail.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    ConfirmdisRoutingModule
  ],
  declarations: [ConfirmdisComponent],
  providers : [SignatureService,SendmailService,UserService]
})
export class ConfirmdisModule { }
