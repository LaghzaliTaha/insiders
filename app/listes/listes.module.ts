import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListesRoutingModule } from './listes-routing.module';
import { ListReferentsComponent } from './Components/list-referents/list-referents.component';
import { ReferentsService } from './Services/referents.service';
import { DataTableModule ,DialogModule, Dropdown, DropdownModule, ConfirmDialogModule, MultiSelectModule, PanelModule, StepsModule, OverlayPanelModule, ConfirmationService } from 'primeng/primeng';
import { ScrollEventModule } from 'ngx-scroll-event';
import { ListInitieComponent } from './Components/list-initie/list-initie.component';
import {ListDisComponent} from './Components/list-dis/list-dis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ListesRoutingModule,
    DialogModule,
    DataTableModule,
    OverlayPanelModule,
    DropdownModule,
    ScrollEventModule,
    FormsModule,
    SharedModule,
     ReactiveFormsModule

  ],
  declarations: [ListReferentsComponent, ListInitieComponent, ListDisComponent],
  providers: [ReferentsService,ConfirmationService],
  exports: [ListReferentsComponent]
})
export class ListesModule { }
