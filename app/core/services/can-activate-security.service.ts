import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserSecurityService } from '../../users/user-security.service';
import { InsidersConstants } from '../insiders-constants';

@Injectable()
export class CanActivateSecurityService implements CanActivate {


  constructor(private  userSecurityService: UserSecurityService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const url =  state.url;
    const role = this.userSecurityService.getUser().role;
    if(url === InsidersConstants.ROUTE_USERS) {
            return true;
    } else if(url === InsidersConstants.ROUTE_FULLADDUSER ) {
        if(role === InsidersConstants.ROLE_ADMIN) {
          return true;
        } else {
          return false;
        }
    }
    else if(url === InsidersConstants.ROUTE_PERIODES ) {
      if(role !== InsidersConstants.ROLE_DIS  ) {
        return true;
      } else {
        return false;
      }
  }
  else if(url === InsidersConstants.ROUTE_REFERENTS ) {
    if(role === InsidersConstants.ROLE_ADMIN ) {
      return true;
    } else {
      return false;
    }
  }  

 /* else if(url === InsidersConstants.ROUTE_ ) {
    if(role === InsidersConstants.ROLE_INITIEPERMANENT ) {
      return true;
    } else {
      return false;
    }
  } 
*/
    return true;
  }

}
