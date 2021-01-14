import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmoccasRoutingModule } from './confirmoccas-routing.module';
import { ConfirmoccasComponent } from './confirmoccas/confirmoccas.component';
import { SignatureService } from '../signature.service';
import { SendmailService } from '../../../shared/sendmail/sendmail.service';
import { UserService } from '../../../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    ConfirmoccasRoutingModule
  ],
  declarations: [ConfirmoccasComponent],
  providers : [SignatureService,SendmailService,UserService]
})
export class ConfirmoccasModule { }
