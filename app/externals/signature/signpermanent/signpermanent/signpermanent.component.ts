import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SignatureService } from '../../signature.service';
import { CoreService } from '../../../../core/services/core.service';
import { UserService } from '../../../../users/users.service';

@Component({
  selector: 'app-signpermanent',
  templateUrl: './signpermanent.component.html',
  styleUrls: ['./signpermanent.component.scss']
})
export class SignpermanentComponent implements OnInit {

   id = this.route.snapshot.paramMap.get('idPermanent');  
   nom = this.route.snapshot.paramMap.get('nomPermanent');
   prenom = this.route.snapshot.paramMap.get('prenomPermanent');
   mail = this.route.snapshot.paramMap.get('emailPermanent');
   tel = this.route.snapshot.paramMap.get('telPermanent');
   role= this.route.snapshot.paramMap.get('role');
   urlFill:string;
  constructor(private route: ActivatedRoute,  private location: Location,private _SignatureService:SignatureService, private _UserService:UserService) { }

  ngOnInit() {

      this.urlFill = this._UserService.getUrlAdd();
 
      this._SignatureService.getUrlSignPerm(this.id, this.nom, this.prenom, this.mail, this.tel, this.role, this.urlFill)
      .subscribe(data => {
         window.location.href=data.response;
      });

  }

}
