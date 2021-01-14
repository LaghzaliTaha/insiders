import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmdisModule } from './confirmdis.module';
import { ConfirmdisComponent } from './confirmdis/confirmdis.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmdisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmdisRoutingModule { }
