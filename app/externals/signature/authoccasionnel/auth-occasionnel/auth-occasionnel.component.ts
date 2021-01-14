import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignatureService } from '../../signature.service';
import { Location } from '@angular/common';
import { CoreService } from '../../../../core/services/core.service';
import { UserService } from '../../../../users/users.service';

@Component({
  selector: 'app-auth-occasionnel',
  templateUrl: './auth-occasionnel.component.html',
  styleUrls: ['./auth-occasionnel.component.scss']
})
export class AuthOccasionnelComponent implements OnInit {

  id = +this.route.snapshot.paramMap.get('id');  
   nom = this.route.snapshot.paramMap.get('nomOccas');
   prenom = this.route.snapshot.paramMap.get('prenomOccas');
   mail = this.route.snapshot.paramMap.get('emailOccas');
   tel = this.route.snapshot.paramMap.get('telOccas');
   role= this.route.snapshot.paramMap.get('role');
   projet= this.route.snapshot.paramMap.get('projet');
   urlFill:string;
  constructor(private route: ActivatedRoute,  private location: Location,private _SignatureService:SignatureService, private _UserService:UserService) { }

  ngOnInit() {
      this.urlFill = this._UserService.getUrlAdd();
 
      this._SignatureService.getUrlAuthOccas(this.id, this.nom, this.prenom, this.mail, this.tel, this.role, this.projet,this.urlFill)
      .subscribe(data => {
         window.location.href=data.response;
      });

  }


}
