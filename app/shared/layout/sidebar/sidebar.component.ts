import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { UserSecurityService } from '../../../users/user-security.service';
import { InsidersConstants } from '../../../core/insiders-constants';
import { CoreService } from '../../../core/services/core.service';

declare var loadMenuIe: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  f(){
    new loadMenuIe();
  }
  constructor(private  userSecurityService: UserSecurityService,public _CoreService:CoreService) {}

  ngOnInit() {

  }
  ngAfterContentInit(){
    loadMenuIe();
   
  }
   getUserName(): string  {
  //   alert(' getUserName()'+this.userSecurityService);
  //   alert(' getUser()'+this.userSecurityService.getUser());
     const user =  this.userSecurityService.getUser();
      if(user === null) {
         return '';
      } else {
          return user.prenom;
      }


  }

   getProfile(): string  {
    const user =  this.userSecurityService.getUser();
    if(user === null) {
       return '';
    } else {
        return this.userSecurityService.getProfile(user.role);
    }
}

 checkUtilisateurs(): boolean {
  return true;
  }

  checkPeriodes(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (InsidersConstants.ROLE_DIS !== role);
 }

  checkReferents(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (InsidersConstants.ROLE_ADMIN === role );
  }

  checkModels(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (InsidersConstants.ROLE_ADMIN === role );
  }

  checkCorrespondant(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (role === 'CORRESPONDANT');
  }

  checkPilote(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (role === 'PILOTE');
  }
  

}
