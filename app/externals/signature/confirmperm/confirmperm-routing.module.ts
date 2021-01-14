import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmpermComponent } from './confirmperm/confirmperm.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmpermComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmpermRoutingModule { }
