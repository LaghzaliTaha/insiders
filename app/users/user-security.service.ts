import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../core/services/localstorage.service';
import { InsidersConstants } from '../core/insiders-constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserSecurityService {

  constructor(private  _http: HttpClient, private _LocalStorageService: LocalstorageService) { }

   public getUser(): any {
    //console.log('getUser');
    //console.log(this._LocalStorageService.getLocalStorage(InsidersConstants.KEY_USER));
 if (!this._LocalStorageService.checkLocalStorage(InsidersConstants.KEY_USER)) {
          return null;
   }else {
     
   return  JSON.parse(this._LocalStorageService.getLocalStorage(InsidersConstants.KEY_USER));   }

  // return {prenom:"chaimaa",role:"PILOTE"} 
  }

   



// public getUser(): any {
//     const user = {
//         id:7,
//     Num: 1,
//        Nom: 'ADMIN',
//        prenom: 'ADMIN',
//        email: 'mrtahalz@gmail.com',
//        roles: ['ADMIN', 'PILOTE','CORRESPONDANT','DIS','INITIE PERMANENT'],
//        role: 'ADMIN'
//     };
//     return user;
// } 


/*public async getUser() {
  if (!this._LocalStorageService.checkLocalStorage(InsidersConstants.KEY_USER)) {
         const user =  await this.loadUser().toPromise();
      //   this._LocalStorageService.setLocalStorage(InsidersConstants.KEY_USER, JSON.stringify(user));
           this._LocalStorageService.setLocalStorage(InsidersConstants.KEY_USER, JSON.stringify(user));
         return user;
 } else {
      return  JSON.parse(this._LocalStorageService.getLocalStorage(InsidersConstants.KEY_USER));
  }
}

 public loadUser (): Observable<any> {
   return  this._http.get(InsidersConstants.apiUrlConnectedUser);

} */


 public setRole(role: string): void {
    const user =this.getUser();
    user.role =role;
    this._LocalStorageService.setLocalStorage(InsidersConstants.KEY_USER,JSON.stringify(user));
 }

 public getProfile(role: string): string {
  
  switch (role) {
    case 'ADMIN':
        return  'Administrateur';     
    case 'INITIEPERMANENT':
        return 'Initié Permanent';
    case 'INITIEOCCASIONNEL':
        return 'Initié Occasionnel';
    case 'CORRESPONDANT':
        return 'Correspondant';
    case 'PILOTE':
        return 'Pilote';
    case 'DIS':
      return  'DIS';
    default:
        return '';
}
 } 


}
