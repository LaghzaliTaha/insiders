import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthOccasionnelComponent } from './auth-occasionnel/auth-occasionnel.component';

const routes: Routes = [
  {
    path: '',
    component: AuthOccasionnelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthoccasionnelRoutingModule { }
