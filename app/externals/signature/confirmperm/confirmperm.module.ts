import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmpermRoutingModule } from './confirmperm-routing.module';
import { ConfirmpermComponent } from './confirmperm/confirmperm.component';
import { SignatureService } from '../signature.service';
import { SendmailService } from '../../../shared/sendmail/sendmail.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    ConfirmpermRoutingModule
  ],
  declarations: [ConfirmpermComponent],
  providers : [SignatureService,SendmailService,UserService]
})
export class ConfirmpermModule { }
