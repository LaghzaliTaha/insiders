import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PeriodesRoutingModule } from './periodes-routing.module';
import { ScrollEventModule } from 'ngx-scroll-event';
import { ListPeriodesComponent } from './Components/list-periodes/list-periodes.component';
import { StepsModule, CalendarModule, DataTableModule  , Dropdown, DropdownModule, DialogModule, SharedModule, PanelModule} from 'primeng/primeng';
import { PeriodeService } from './Service/periode.service';
import { AddPeriodComponent } from './Components/add-period/add-period.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPeriodComponent } from './Components/show-period/show-period.component';


@NgModule({
  imports: [
    CommonModule,
    PeriodesRoutingModule,
    DataTableModule,
    DropdownModule,
    ScrollEventModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    StepsModule,
  ],
  declarations: [ListPeriodesComponent, AddPeriodComponent, ShowPeriodComponent],
  providers: [PeriodeService],
  exports: [ListPeriodesComponent]
})
export class PeriodesModule { }
