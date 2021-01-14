import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigndisComponent } from './signdis/signdis.component';

const routes: Routes = [
  {
    path: '',
    component: SigndisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigndisRoutingModule { }
