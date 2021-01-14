import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPeriodesComponent } from './Components/list-periodes/list-periodes.component';
import { AddPeriodComponent } from './Components/add-period/add-period.component';
import { InsidersConstants } from '../core/insiders-constants';
import { ShowPeriodComponent } from './Components/show-period/show-period.component';

const routes: Routes = [ 
  {
    path: InsidersConstants.ROUTE_ADDPERIOD,
    component: AddPeriodComponent
  },
  {
    path: InsidersConstants.ROUTE_SHOWPERIOD+ '/:id',
    component: ShowPeriodComponent
  },
  {
    path: '',
    component: ListPeriodesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodesRoutingModule { }
