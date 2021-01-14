import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from './users.service';
import { DataTableModule, Dropdown, DropdownModule, ConfirmDialogModule, MultiSelectModule, DialogModule, PanelModule, StepsModule } from 'primeng/primeng';
import { ScrollEventModule } from 'ngx-scroll-event';
import { ConfirmationService,CalendarModule } from 'primeng/primeng';
import { SendmailService } from '../shared/sendmail/sendmail.service';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CompleteInitiePermanentComponent } from './complete-initie-permanent/complete-initie-permanent.component';
import { UserSecurityService } from './user-security.service';

import { CompleteInitieOccasionnelComponent } from './complete-initie-occasionnel/complete-initie-occasionnel.component'

import { MajListePiloteComponent } from './maj-liste-pilote/maj-liste-pilote.component';
import { SharedModule } from '../shared/shared.module';
import { MajListeCorrespondantComponent } from './maj-liste-correspondant/maj-liste-correspondant.component';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataTableModule,
    DropdownModule,
    ScrollEventModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    MultiSelectModule,
    RouterModule,
    PanelModule,
    SharedModule,
    StepsModule,
    CalendarModule
  ],
  declarations: [ListUsersComponent, AddUserComponent, CompleteInitiePermanentComponent, CompleteInitieOccasionnelComponent, MajListePiloteComponent, MajListeCorrespondantComponent],
  providers: [UserService, UserSecurityService, ConfirmationService, SendmailService],
  exports: [ListUsersComponent]
})
export class UsersModule { }

