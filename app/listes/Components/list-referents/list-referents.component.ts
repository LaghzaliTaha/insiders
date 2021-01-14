import { Component, OnInit } from '@angular/core';
import { ReferentsService } from '../../Services/referents.service';
import { User } from '../../Interfaces/user.model';
import { ScrollEvent } from 'ngx-scroll-event';
import { CoreService } from '../../../core/services/core.service';
import { Router } from '@angular/router';
import { InsidersConstants } from '../../../core/insiders-constants';

@Component({
  selector: 'app-list-referents',
  templateUrl: './list-referents.component.html',
  styleUrls: ['./list-referents.component.scss']
})
export class ListReferentsComponent implements OnInit {

  dataReferents: User[] = [];
  data: User[] = [];
  loading = false;
  rows = [];
  enabledSelect =false ;
  constructor(private _referentsService: ReferentsService,private _coreService: CoreService,private router: Router) { }

  totalRecords: number;
  rowsNumber: number;
  showInfinitScroll: boolean;


  ngOnInit() {
    this._coreService.setcurrentPos('MAJ Listes');
    this._coreService.setCurrentClass('listes');
    
    this.getAllReferents();
  }

  handleScroll(event) {
    if (event.isReachingBottom) {
      this.loadMore();
      event.isReachingBottom = false;
    }
  }

  loadMore() {
    this.data =  this.dataReferents.slice(0,  this.data.length + 20);
    if  ((this.dataReferents.length - this.data.length) < 20 ) {
      this.rowsNumber =  this.dataReferents.length - this.data.length;
    if  ((this.dataReferents.length - this.data.length) === 0) {
      this.showInfinitScroll =  false;
    } else {
      this.showInfinitScroll =  true;
    }
    } else {
      this.rowsNumber =  20;
      this.showInfinitScroll =  true;
    }
  }
  public singleCheckConsult(row){
    if(row.etat){
      return true
    }else{
      return false
    }

  }
  public getAllReferents() {
    this._referentsService.getReferents()
    .subscribe(data => {
      this.dataReferents = this.dataReferents.concat(data.crspt);
      this.dataReferents = this.dataReferents.concat(data.pilote);
    });
  }

  public versionsDocument(row: any) {
    // console.log(row);
  }
  public consulterInit(idRef,nom,profil){
    // à vérifier
    this._referentsService.idRef=idRef;
    this._referentsService.nomInit=nom;
    if(profil.toLowerCase()==="pilote"){
      this.router.navigate([InsidersConstants.ROUTE_REFERENTS+'/'+InsidersConstants.ROUTE_listeinities]);
    }else
      if(profil.toLowerCase()==="correspondant"){
        this.router.navigate([InsidersConstants.ROUTE_REFERENTS+'/'+InsidersConstants.ROUTE_listeDis]);
       }
    
      
  }
  public checkDisabled(event){
    if(event.data.etat===true && this.rows.length===1){
      this.enabledSelect=true;
    }else{
      this.enabledSelect=false;
    }
  }
}
