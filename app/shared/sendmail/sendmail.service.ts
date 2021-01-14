import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Mail } from './interface/mail.model';
import { InsidersConstants } from '../../core/insiders-constants';

@Injectable()
export class SendmailService {
  urlServ= 'http://localhost:8080/INSIDERS/rest/mail/sendmail';
  constructor(private _http: HttpClient) { }


  public sendMail (mail: Mail) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };


    return this._http.post(InsidersConstants.apiUrlSendMail, mail, httpOptions);

}

}
