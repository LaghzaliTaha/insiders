import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SignatureService } from '../../signature.service';
import { CoreService } from '../../../../core/services/core.service';
import { UserService } from '../../../../users/users.service';
import { UserSecurityService } from '../../../../users/user-security.service';

@Component({
  selector: 'app-autpermanent',
  templateUrl: './autpermanent.component.html',
  styleUrls: ['./autpermanent.component.scss']
})
export class AutpermanentComponent implements OnInit {
  classMsg="";
   id = +this.route.snapshot.paramMap.get('id');  
   nom = this.route.snapshot.paramMap.get('nomPerm');
   prenom = this.route.snapshot.paramMap.get('prenomPerm');
   mail = this.route.snapshot.paramMap.get('emailPerm');
   tel = this.route.snapshot.paramMap.get('telPerm');
   raisonDesignation= this.route.snapshot.paramMap.get('raisonPerm');
   role= this.route.snapshot.paramMap.get('role');
   urlFill:string;
  constructor(private  userSecurityService: UserSecurityService,private route: ActivatedRoute,  private location: Location,private _SignatureService:SignatureService, private _UserService:UserService) { }

  ngOnInit() {
    //const user =  this.userSecurityService.getUser();
    //if(this.mail === user.email) {
        this.urlFill = this._UserService.getUrlAdd();
        this._SignatureService.getUrlAuthPerm(this.id, this.nom, this.prenom, this.mail, this.tel, this.raisonDesignation,this.role,this.urlFill)
        .subscribe(data => {
          window.location.href=data.response;
        });
     //} else {
     //   this.classMsg="classhidden";
    // }   

  }

}
