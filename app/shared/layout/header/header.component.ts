import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { InsidersConstants } from '../../../core/insiders-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private _LocalStorageService: LocalstorageService) {

  }
  ngOnInit(): void {}


  logout(): void {
    this._LocalStorageService.clearLocalStorage(InsidersConstants.KEY_USER);
   const url = location.origin + '/INSIDERS/logout' ;
   window.location.href = url;
  }

}
