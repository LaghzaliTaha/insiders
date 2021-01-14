import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignoccasionnelComponent } from './signoccasionnel/signoccasionnel.component';

const routes: Routes = [
  {
    path: '',
    component: SignoccasionnelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignoccasionnelRoutingModule { }
