import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../Interfaces/user.model';
import { Observable } from 'rxjs/Observable';
import { InsidersConstants } from '../../core/insiders-constants';
import { ListReferents } from '../Interfaces/list-referents.model';
import { ListInitie } from '../Interfaces/list-Initie.model';

@Injectable()
export class ReferentsService {
 
  nomInit:string;
  idRef:number;
  idInit;
  constructor(private _http: HttpClient) { }

  public getReferents (): Observable<ListReferents> {

      return this._http.get<ListReferents>(InsidersConstants.apiUrlReferents);

  }
        // load initOcas by referent

  public getInitOcassByIdRef(id:number):Observable<any[]> {
    const params = new HttpParams().set( 'id' ,id.toString());   
      return this._http.get<any[]>(InsidersConstants.apiUrlInitByPilote, {params: params});
  }
  public getDisByCorrespondant(id:number):Observable<any[]> {
    const params = new HttpParams().set( 'id' ,id.toString());   
      return this._http.get<any[]>(InsidersConstants.apiUrlDisByCoresp, {params: params});
  }
  // apply to all type of profil ( initie & dis)
  public getModificationsByReferentInitie(idReferent:number,idInitie:number):Observable<ListInitie>{
    // tslint:disable-next-line:prefer-const
    let params = new HttpParams().set( 'idReferent' ,idReferent.toString()); 
    params.append('idInitie',idInitie.toString());   
    
    return this._http.get<ListInitie>(InsidersConstants.getModificationsByReferentInitie+'?idReferent='+idReferent+'&idInitie='+idInitie);

  }


public validateSinglColumn(id:number): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json; charset=utf-8'});
  return this._http.put(InsidersConstants.setValidateSingleByColumn, id,{headers: headers})
    .map(response => response as any);
}

public ignoreSinglColumn(id:number): Observable<any> {
  
  const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json; charset=utf-8'});
  return this._http.put(InsidersConstants.ignoreSingleByColumn, id,{headers: headers})
    .map(response => response as any);
}
  
}
