import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmoccasComponent } from './confirmoccas/confirmoccas.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmoccasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmoccasRoutingModule { }
