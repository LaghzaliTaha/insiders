import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SignatureService } from '../../signature.service';
import { CoreService } from '../../../../core/services/core.service';
import { UserService } from '../../../../users/users.service';

@Component({
  selector: 'app-signoccasionnel',
  templateUrl: './signoccasionnel.component.html',
  styleUrls: ['./signoccasionnel.component.scss']
})
export class SignoccasionnelComponent implements OnInit {

   id = this.route.snapshot.paramMap.get('id');  
   nom = this.route.snapshot.paramMap.get('nomOccas');
   prenom = this.route.snapshot.paramMap.get('prenomOccas');
   mail = this.route.snapshot.paramMap.get('emailOccas');
   tel = this.route.snapshot.paramMap.get('telOccas');
   role= this.route.snapshot.paramMap.get('role');
   urlFill:string;

  constructor(private route: ActivatedRoute,  private location: Location,private _SignatureService:SignatureService, private _UserService:UserService) { }

  ngOnInit() {

      this.urlFill = this._UserService.getUrlAdd();
 
      this._SignatureService.getUrlSignOccas(this.id, this.nom, this.prenom, this.mail, this.tel, this.role, this.urlFill)
      .subscribe(data => {
         window.location.href=data.response;
      });
  }

}
