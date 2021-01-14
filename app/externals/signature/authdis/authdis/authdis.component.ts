import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SignatureService } from '../../signature.service';
import { CoreService } from '../../../../core/services/core.service';
import { UserService } from '../../../../users/users.service';

@Component({
  selector: 'app-authdis',
  templateUrl: './authdis.component.html',
  styleUrls: ['./authdis.component.scss']
})
export class AuthdisComponent implements OnInit {

   id =  +this.route.snapshot.paramMap.get('id');
   nom =  this.route.snapshot.paramMap.get('nomDis');
   prenom =  this.route.snapshot.paramMap.get('prenomDis');
   mail =  this.route.snapshot.paramMap.get('emailDis');
   tel =  this.route.snapshot.paramMap.get('telDis');
   fonction=  this.route.snapshot.paramMap.get('fonctionDis');
   societe=  this.route.snapshot.paramMap.get('societeDis');
   adresse=  this.route.snapshot.paramMap.get('adresseDis');
   role=  this.route.snapshot.paramMap.get('role');
   urlFill: string;
  constructor(private route:  ActivatedRoute,   private location:  Location, private _SignatureService: SignatureService, private _UserService:UserService) { }

  ngOnInit() {
      this.urlFill = this._UserService.getUrlAdd();
      this._SignatureService.getUrlAuthDis(
        this.id, this.nom, this.prenom, this.mail, this.tel,
        this.fonction, this.societe, this.adresse, this.role, this.urlFill)
      .subscribe(data => {
         window.location.href = data.response;
      });

  }
}
