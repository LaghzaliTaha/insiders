import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Periode } from '../Interface/periode.model';
import { InsidersConstants } from '../../core/insiders-constants';
import { NotifiedUsers } from '../Interface/notifiedUsers.model';

@Injectable()
export class PeriodeService {

  constructor(private _http: HttpClient) { }


    public getPeriode (): Observable<Periode[]> {
        return this._http.get<Periode[]>(InsidersConstants.apiUrlPeriode);
    }

    public notify(periode:any): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded'
            })};
    
        let url: string;
        let typePeriodURL:string;
        let checkVariable=[];
        
        if(periode.length===undefined){
            checkVariable.push(periode);
        }else{
            checkVariable=periode;
            
        }
        switch(checkVariable[0].typePeriode){
            case "Intéressement/Participation":
                typePeriodURL="notifPeriodeIP/";
                break;
            case "Trimestre 1":
                typePeriodURL="notifPeriodeTrim1/";
                break;
            case "Trimestre 2":
                typePeriodURL="notifPeriodeTrimX/";
                break;
            case "Trimestre 3":
                typePeriodURL="notifPeriodeTrimX/";
                break;
            case "Trimestre 4":
                typePeriodURL="notifPeriodeTrimX/";
                break;
        }
        url = InsidersConstants.APP_URI + "periode/" + typePeriodURL + checkVariable[0].id;
        return this._http.put(url,{},httpOptions);
    }

    addPeriode(periode:Periode){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post(InsidersConstants.APP_URI+'periode/add', periode, {headers: headers});
    }

    getOnePeriode(id){
        return this._http.get<Periode>(InsidersConstants.apiShowPeriod+'?id='+id)
    }

    updateOnePeriode(p:Periode){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })};
        let url: string;
        url = InsidersConstants.APP_URI + 'periode/update';
        return this._http.put<Periode>(url, p, httpOptions);
    }

    getListNotifiedUsers(idp:string): Observable<any[]>{
        return this._http.get<any[]>(InsidersConstants.apigetNotifiedUsPeriod+'/'+idp);
    }
}
