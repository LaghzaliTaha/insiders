import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { InsidersConstants } from '../core/insiders-constants';
import { CanActivateSecurityService } from '../core/services/can-activate-security.service';
import { CompleteInitiePermanentComponent } from './complete-initie-permanent/complete-initie-permanent.component';
import { CompleteInitieOccasionnelComponent } from './complete-initie-occasionnel/complete-initie-occasionnel.component';
import { MajListePiloteComponent } from './maj-liste-pilote/maj-liste-pilote.component';
import { MajListeCorrespondantComponent } from './maj-liste-correspondant/maj-liste-correspondant.component';


const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent ,
    canActivate: [CanActivateSecurityService]
  },
  {
    path: InsidersConstants.ROUTE_ADDUSER,
    component: AddUserComponent,
    canActivate: [CanActivateSecurityService]
  },
  {
    path: 'formInitiePermanent/:id',
    component: CompleteInitiePermanentComponent,
    canActivate: [CanActivateSecurityService]
  },
  {
    path: 'formInitieOccasionnel/:id',
    component: CompleteInitieOccasionnelComponent,
    canActivate: [CanActivateSecurityService]
  },
  {
    path: 'referent/majInitieOccasionnel',
    component: MajListePiloteComponent,
    canActivate: [CanActivateSecurityService]
  },
  {
    path: InsidersConstants.ROUTE_MAJLISTDIS,
    component: MajListeCorrespondantComponent,
    canActivate: [CanActivateSecurityService]
  }

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
