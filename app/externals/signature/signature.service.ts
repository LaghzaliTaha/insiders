import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { log } from 'util';

@Injectable()
export class SignatureService {

  constructor(private _http: HttpClient) { }

    public getUrlAuthPerm ( id: number, nomPerm: string, prenomPerm: string, emailPerm: string, telPerm: string, raisonPerm: string, role:string, urlFill: string): Observable<any>
    {
       const url = '/INSIDERS/rest/initiePermanent/fillPermanent/' +
       id+'/'+nomPerm+'/'+prenomPerm+'/'+emailPerm+'/'+telPerm+'/'+raisonPerm+'/'+role;
       const params = new HttpParams().set( 'urlFill' , urlFill);   

      return this._http.get(url,{ params: params });
    }
    public getUrlAuthOccas (id: number, nomOccas : string, prenomOccas : string, emailOccas : string, telOccas : string, role:string,projet:string, urlFill : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/initieOccasionnel/fillOccas/'+id+'/'+nomOccas+'/'+prenomOccas+'/'+emailOccas+'/'+telOccas+'/'+role+'/'+projet;
      const params = new HttpParams().set( 'urlFill' , urlFill);

      return this._http.get(url, { params: params } );
    }
    public getUrlAuthDis (id: number, nomDis : string, prenomDis : string, emailDis : string, telDis : string, fonctionDis : string, societeDis : string, adresseDis : string, role:string, urlFill : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/dis/fillDis/'+id+'/'+nomDis+'/'+prenomDis+'/' +emailDis+ '/'+telDis+'/'+fonctionDis+'/'+societeDis+'/'+adresseDis+'/'+role;
      const params = new HttpParams().set( 'urlFill' , urlFill);

      return this._http.get(url, { params: params } );
    }

    public getUrlSignPerm (id:String, nomPerm : string, prenomPerm : string, emailPerm : string, telPerm : string, role : string, urlFill : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/initiePermanent/signPermanent/'+id+ '/'+nomPerm+'/'+prenomPerm+'/'+emailPerm+'/' + telPerm+'/' + role;
      const params = new HttpParams().set( 'urlFill' , urlFill);

      return this._http.get(url, { params: params } );
    }
    public getUrlSignOccas (id:String, nomOccas : string, prenomOccas : string, emailOccas : string, telOccas : string, role:string, urlFill : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/initieOccasionnel/signOccas/'+id+'/'+nomOccas+'/'+prenomOccas+'/'+emailOccas+'/' + telOccas+'/'+role;
      const params = new HttpParams().set( 'urlFill' , urlFill);

      return this._http.get(url, { params: params } );
    }
    public getUrlSignDis (id:String, nomDis : string, prenomDis : string, emailDis : string, telDis : string, role:string, urlFill : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/dis/signDis/'+id+'/'+nomDis+'/'+prenomDis+'/'+emailDis + '/' + telDis +'/'+role;
      const params = new HttpParams().set( 'urlFill' , urlFill);

      return this._http.get(url, { params: params } );
    }
    public getUrlConfirmPerm (id:String, nomPermanent : string, prenomPermanent : string, emailPermanent : string, telPermanent : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/initiePermanent/confirm/'+id+'/'+nomPermanent+'/'+prenomPermanent+'/'+emailPermanent + '/' + telPermanent;

      return this._http.get(url);
    }
    public getUrlConfirmOccas (id:String, nomOccas : string, prenomOccas : string, emailOccas : string, telOccas : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/initieOccasionnel/confirmOccas/'+id+'/'+nomOccas+'/'+prenomOccas+'/'+emailOccas + '/' + telOccas;

      return this._http.get(url);
    }
    public getUrlConfirmDis (id:String, nomDis : string, prenomDis : string, emailDis : string, telDis : string) :Observable<any>
    {
      const url = '/INSIDERS/rest/dis/confirmDis/'+id+'/'+nomDis+'/'+prenomDis+'/'+emailDis + '/' + telDis;

      return this._http.get(url);
    }
    public getUrlDownloadDoc (id:String) :Observable<any>
    {
      const url = '/INSIDERS/rest/initiePermanent/downloadDoc/'+id;

      return this._http.get(url);
    }


}
