import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core/core.component';

import {DataTableModule, SharedModule, MultiSelectModule, TreeModule, DialogModule} from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { CoreService } from './services/core.service';
import { DispatcherComponent } from './dispatcher/dispatcher.component';
import { LocalstorageService } from './services/localstorage.service';
import { CanActivateSecurityService } from './services/can-activate-security.service';
import { CrypturlparamsService } from './services/crypturlparams.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    DataTableModule,
    HttpClientModule,
    DialogModule
  ],
  declarations: [CoreComponent , DispatcherComponent],
  providers: [CoreService , LocalstorageService, CanActivateSecurityService, CrypturlparamsService]
})
export class CoreModule { }
