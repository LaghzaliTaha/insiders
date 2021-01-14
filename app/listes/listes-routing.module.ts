import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListReferentsComponent } from './Components/list-referents/list-referents.component';
import { ListInitieComponent } from './Components/list-initie/list-initie.component';
import { InsidersConstants } from '../core/insiders-constants';
import { ListDisComponent } from './Components/list-dis/list-dis.component';

const routes: Routes = [
  {
    path: '',
    component: ListReferentsComponent
  }, {
    path: InsidersConstants.ROUTE_listeinities,
    component: ListInitieComponent
  }, {
    path: InsidersConstants.ROUTE_listeDis,
    component: ListDisComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListesRoutingModule { }
