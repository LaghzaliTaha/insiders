import { Component, OnInit } from '@angular/core';
import { Periode } from '../../Interface/periode.model';
import { PeriodeService } from '../../Service/periode.service';
import { ScrollEvent } from 'ngx-scroll-event';
import { SelectItem } from 'primeng/components/common/api';
import { CoreService } from '../../../core/services/core.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UserSecurityService } from '../../../users/user-security.service';
import { InsidersConstants } from '../../../core/insiders-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-periodes',
  templateUrl: './list-periodes.component.html',
  styleUrls: ['./list-periodes.component.scss']
})
export class ListPeriodesComponent implements OnInit {
  dataPeriodes: Periode[] = [];
  data: Periode[] = [];
  loading = false;
  rows = [];
  typePeriode: SelectItem[];

  currentDate: Date;
  diffDateDebut: Number;
  diffDateFin: Number;

  notificationClicked: boolean;
  message:string;
  errorMessage:string;
  showErrorMessage = true;
  messageNotificationSuccess:string;
  messageDisplayDialog= false;


  constructor(private _periodeService: PeriodeService, private _coreService: CoreService,
    private  userSecurityService: UserSecurityService,
    private _router:Router
  ) { }

  totalRecords: number;
  rowsNumber: number;
  showInfinitScroll: boolean;

  ngOnInit() {
    this._coreService.setcurrentPos('Périodes d\'abstention');
    this._coreService.setCurrentClass('periodes');

    this.getAllPeriodes();
    this.notificationClicked = false;
    this.typePeriode = [];
    this.typePeriode.push({label: 'Selectionner', value: null});
    this.typePeriode.push({label: 'Intéressement/Participation', value: 'Intéressement/Participation'});
    this.typePeriode.push({label: 'Trimestre 1', value: 'Trimestre 1'});
    this.typePeriode.push({label: 'Trimestre 2', value: 'Trimestre 2'});
    this.typePeriode.push({label: 'Trimestre 3', value: 'Trimestre 3'});
    this.typePeriode.push({label: 'Trimestre 4', value: 'Trimestre 4'});



  }

  handleScroll(event) {

            if (event.isReachingBottom) {
              this.loadMore();
              event.isReachingBottom = false;
            }
          }

          loadMore() {

            this.data =  this.dataPeriodes.slice(0,  this.data.length + 20);
            if  ((this.dataPeriodes.length - this.data.length) < 20 ) {
            this.rowsNumber =  this.dataPeriodes.length - this.data.length;
            if  ((this.dataPeriodes.length - this.data.length) === 0) {
            this.showInfinitScroll =  false;
            } else {
            this.showInfinitScroll =  true;
            }
            } else {
            this.rowsNumber =  20;
            this.showInfinitScroll =  true;
            }
        }

  public getAllPeriodes() {
    this._periodeService.getPeriode()
    .subscribe(data => {
      this.dataPeriodes = data;
      this.totalRecords = this.dataPeriodes.length;
      this.data = this.dataPeriodes.slice(0, (this.data.length === 0 ? 20 :  this.data.length)) ;
      if ((this.dataPeriodes.length - this.data.length) < 20 ) {
        if ((this.dataPeriodes.length - this.data.length) === 0) {
          this.showInfinitScroll = false;
        } else {
          this.showInfinitScroll = true;
        }
        this.rowsNumber = this.dataPeriodes.length - this.data.length;
      } else {
        this.rowsNumber = 20;
        this.showInfinitScroll = true;
      }

      });

  }

  public statutperiode(dataFin, dateDebut) {

     
       
      if(Date.now() > dataFin){
        return 'Terminée';
      }else{
        if (Date.now() > dateDebut) {
          return 'En cours';
        } else {
          return 'A venir';
        }
      }
                  
                }

    notify(){
      this._periodeService.notify(this.rows)
      .catch((res)=>{
            this.message = ' Une erreur est survenue lors de la notification de la période';
            this.errorMessage =  res.error.toString();
            this.showErrorMessage = true;
            this.messageDisplayDialog = true;
        return this._coreService.handleError(res);})
      .subscribe(params => {
        this.messageNotificationSuccess = "Les notifications pour "+ this.rows[0].nomPeriode+ " sont envoyées."
        this.notificationClicked = true;
      });
    }
    //single notify
    singleNotify(row){
      this._periodeService.notify(row)
      .catch((res)=>{
            this.message = ' Une erreur est survenue lors de la notification de la période';
            this.errorMessage =  res.error.toString();
            this.showErrorMessage = true;
            this.messageDisplayDialog = true;
        return this._coreService.handleError(res);})
      .subscribe(params => {
        this.messageNotificationSuccess = "Les notifications pour "+ row.nomPeriode+ " sont envoyées."
        this.notificationClicked = true;
      });
    }
    // end single notify

    checkIfAdmin(): boolean {
      const role = this.userSecurityService.getUser().role;
      return (InsidersConstants.ROLE_ADMIN === role);
    }

    showPeriod(){
      this._router.navigate(['/angular/periodes/showPeriod',this.rows[0].id]);      
    }

    cancel(){
      this.notificationClicked = false;
      this.getAllPeriodes();
    }

    closePopUp(){
      this.messageDisplayDialog = false;
    }

    verifyNotification(){
      if(this.rows.length > 0){
        if(this.rows[0].status === "Periode notifiee"){
          return true;
        }else{
          return false;
        }
      }
      
    }
}
