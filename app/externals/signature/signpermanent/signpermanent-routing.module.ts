import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignpermanentComponent } from './signpermanent/signpermanent.component';

const routes: Routes = [
  {
    path: '',
    component: SignpermanentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignpermanentRoutingModule { }
