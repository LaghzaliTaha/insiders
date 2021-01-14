import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthdisComponent } from './authdis/authdis.component';

const routes: Routes = [
  {
    path: '',
    component: AuthdisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthdisRoutingModule { }
