import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendmailComponent } from './sendmail/sendmail.component';

const routes: Routes = [
  {
    path: '',
    component: SendmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendmailRoutingModule { }
