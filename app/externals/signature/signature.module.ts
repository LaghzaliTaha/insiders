import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignatureRoutingModule } from './signature-routing.module';
import { AuthpermanentModule } from './authpermanent/authpermanent.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthoccasionnelModule } from './authoccasionnel/authoccasionnel.module';
import { AuthdisModule } from './authdis/authdis.module';
import { SignoccasionnelModule } from './signoccasionnel/signoccasionnel.module';
import { SignpermanentModule } from './signpermanent/signpermanent.module';
import { SigndisModule } from './signdis/signdis.module';
import { ConfirmpermModule } from './confirmperm/confirmperm.module';
import { ConfirmoccasModule } from './confirmoccas/confirmoccas.module';
import { ConfirmdisModule } from './confirmdis/confirmdis.module';

@NgModule({
  imports: [
    CommonModule,
    SignatureRoutingModule,
    AuthpermanentModule,
    AuthoccasionnelModule,
    AuthdisModule,
    SignoccasionnelModule,
    SignpermanentModule,
    SigndisModule,
    ConfirmpermModule,
    ConfirmoccasModule,
    ConfirmdisModule,
    HttpClientModule,
    SignatureRoutingModule
  ],
  declarations: []
})
export class SignatureModule { }
