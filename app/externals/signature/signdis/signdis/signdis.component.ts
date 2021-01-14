import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignatureService } from '../../signature.service';
import { Location } from '@angular/common';
import { CoreService } from '../../../../core/services/core.service';
import { UserService } from '../../../../users/users.service';

@Component({
  selector: 'app-signdis',
  templateUrl: './signdis.component.html',
  styleUrls: ['./signdis.component.scss']
})
export class SigndisComponent implements OnInit {

   id = this.route.snapshot.paramMap.get('id');  
   nom = this.route.snapshot.paramMap.get('nomDis');
   prenom = this.route.snapshot.paramMap.get('prenomDis');
   mail = this.route.snapshot.paramMap.get('emailDis');
   tel = this.route.snapshot.paramMap.get('telDis');
   role= this.route.snapshot.paramMap.get('role');
   urlFill:string;
  constructor(private route: ActivatedRoute,  private location: Location,private _SignatureService:SignatureService, private _UserService:UserService) { }

  ngOnInit() {

      this.urlFill = this._UserService.getUrlAdd();
 
      this._SignatureService.getUrlSignDis(this.id, this.nom, this.prenom, this.mail, this.tel, this.role, this.urlFill)
      .subscribe(data => {
         window.location.href=data.response;
      });

  }

}
