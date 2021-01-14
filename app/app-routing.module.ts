import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispatcherComponent } from './core/dispatcher/dispatcher.component';
import { InsidersConstants } from './core/insiders-constants';

const routes: Routes = [
  {path: '', component: DispatcherComponent, pathMatch: 'full'},
  {
    path: 'test',
    loadChildren: 'app/core/core.module#CoreModule'
  },
  {
    path: InsidersConstants.ROUTE_USERS,
    loadChildren: 'app/users/users.module#UsersModule'
  },
  {
    path: InsidersConstants.ROUTE_HOME,
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'INSIDERS/rest/mail/sendmail',
    loadChildren: 'app/shared/sendmail/sendmail.module#SendmailModule'
  },
  {
    path: 'angular/redirectToAuthentification/:id/:nomPerm/:prenomPerm/:emailPerm/:telPerm/:raisonPerm/:role',
    loadChildren: 'app/externals/signature/authpermanent/authpermanent.module#AuthpermanentModule'
  },
  {
    path: 'angular/redirectToAuthentificationOccas/:id/:nomOccas/:prenomOccas/:emailOccas/:telOccas/:role/:projet',
    loadChildren: 'app/externals/signature/authoccasionnel/authoccasionnel.module#AuthoccasionnelModule'
  },
  {
    path: 'angular/redirectToAuthentificationDis/:id/:nomDis/:prenomDis/:emailDis/:telDis/:fonctionDis/:societeDis/:adresseDis/:role',
    loadChildren: 'app/externals/signature/authdis/authdis.module#AuthdisModule'
  },
  {
    path: 'angular/rsp/:idPermanent/:nomPermanent/:prenomPermanent/:emailPermanent/:telPermanent/:role',
    loadChildren: 'app/externals/signature/signpermanent/signpermanent.module#SignpermanentModule'
  },
  {
    path: 'angular/redirectToSignDis/:id/:nomDis/:prenomDis/:emailDis/:telDis/:role',
    loadChildren: 'app/externals/signature/signdis/signdis.module#SigndisModule'
  },
  {
    path: 'angular/redirectToSignOccas/:id/:nomOccas/:prenomOccas/:emailOccas/:telOccas/:role',
    loadChildren: 'app/externals/signature/signoccasionnel/signoccasionnel.module#SignoccasionnelModule'
  },
  {
    path: 'angular/redirectToConfirm/:id/:nomPermanent/:prenomPermanent/:emailPermanent/:telPermanent',
    loadChildren: 'app/externals/signature/confirmperm/confirmperm.module#ConfirmpermModule'
  },
  {
    path: 'angular/redirectToConfirmOccas/:id/:nomOccas/:prenomOccas/:emailOccas/:telOccas',
    loadChildren: 'app/externals/signature/confirmoccas/confirmoccas.module#ConfirmoccasModule'
  },
  {
    path: 'angular/redirectToConfirmDis/:id/:nomDis/:prenomDis/:emailDis/:telDis',
    loadChildren: 'app/externals/signature/confirmdis/confirmdis.module#ConfirmdisModule'
  },
  {
    path: InsidersConstants.ROUTE_PERIODES,
    loadChildren: 'app/periodes/periodes.module#PeriodesModule'
  },
  {
    path: InsidersConstants.ROUTE_REFERENTS,
    loadChildren: 'app/listes/listes.module#ListesModule'
  },
  {path: '**', component: DispatcherComponent}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
