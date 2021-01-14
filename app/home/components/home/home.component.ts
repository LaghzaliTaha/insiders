import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _coreService:CoreService) { }

  ngOnInit() {
    this._coreService.setcurrentPos('Profil');
  }

}
