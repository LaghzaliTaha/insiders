import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendmailRoutingModule } from './sendmail-routing.module';
import { SendmailComponent } from './sendmail/sendmail.component';
import { SendmailService } from './sendmail.service';

@NgModule({
  imports: [
    CommonModule,
    SendmailRoutingModule
  ],
  declarations: [SendmailComponent],
  providers : [SendmailService]
})
export class SendmailModule { }
