import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutpermanentComponent } from './autpermanent/autpermanent.component';

const routes: Routes = [
  {
    path: '',
    component: AutpermanentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthpermanentRoutingModule { }
