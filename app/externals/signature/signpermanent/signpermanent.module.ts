import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignpermanentRoutingModule } from './signpermanent-routing.module';
import { SignpermanentComponent } from './signpermanent/signpermanent.component';
import { SignatureService } from '../signature.service';
import { SendmailService } from '../../../shared/sendmail/sendmail.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    SignpermanentRoutingModule
  ],
  declarations: [SignpermanentComponent],
  providers : [SignatureService,SendmailService,UserService]
})
export class SignpermanentModule { }
