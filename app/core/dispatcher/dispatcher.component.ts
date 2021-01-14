import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsidersConstants } from '../insiders-constants';
import { UserSecurityService } from '../../users/user-security.service';
import { UserService } from '../../users/users.service';


@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.scss']
})
export class DispatcherComponent implements OnInit {

    showRolesSelect = false;
    roles = []; 
  

  

  constructor(private activatedRoute: ActivatedRoute,
              private _router: Router,
              private _UserSecurityService: UserSecurityService,
            private userService :UserService) { }

  ngOnInit() {
    const role = this._UserSecurityService.getUser().role;
    const mail = this._UserSecurityService.getUser().email;
    let currentUser;
    if(role==InsidersConstants.ROLE_INITIEOCCASIONNEL){
      this.userService.getinitieOccasionnelByMail(mail).subscribe(
        data =>{
          currentUser=data;
          this._router.navigate([InsidersConstants.ROUTE_INITIEOCCASIONNEL_REDIRECT+"/"+currentUser.id]);
        
        }
      );
    }
    else if(role == InsidersConstants.ROLE_INITIEPERMANENT){
      this.userService.getinitiepermanentByMail(mail).subscribe(
        data =>{
          currentUser=data;
          this._router.navigate([InsidersConstants.ROUTE_INITIEPERMANENT_REDIRECT+"/"+currentUser.id]);
        
        }
      );
  }
    else if(role == InsidersConstants.ROLE_DIS){
      this.userService.getDISByMail(mail).subscribe(
        data =>{
          currentUser=data;
          this._router.navigate([InsidersConstants.ROUTE_DIS+"/?path=redirectToAuthentificationDis/"+currentUser.id+
          "/nomDis="+currentUser.nom
          +"/prenomDis="+currentUser.prenom+"/emailDis="+currentUser.adresseMail+"/telDis="+currentUser.numeroMobile+"/fonctionDis="
          +currentUser.fonction+"/societeDis="+currentUser.nomEntreprise+"/adresseDis="+currentUser.complementAdressePr+"/role=DIS"]);
        
        }
      );
    }
    else if(role == InsidersConstants.ROLE_ADMIN){
      this._router.navigate([InsidersConstants.ROUTE_USERS]);
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if (role !=='') {
        const path = params[InsidersConstants.PARAM_URL_PATH];
        if (path === 'redirectToSignDis') {
          const id = params['id'];
          const nomDis = params['nomDis'];
          const prenomDis = params['prenomDis'];
          const emailDis = params['emailDis'];
          const telDis = params['telDis'];
          const role = params['role'];
          const url = '/angular/utilisateurs/formInitieOccasionnel/10';
          this._router.navigate([url]);

        } else if(path === 'redirectToAuthentification'){
          const id = params['id'];
          const nomPerm = params['nomPerm'];
          const prenomPerm = params['prenomPerm'];
          const emailPerm = params['emailPerm'];
          const telPerm = params['telPerm'];
          const raisonPerm = params['raisonPerm'];
          const role = params['role'];
          const url = '/angular/redirectToAuthentification/' + id + '/' + nomPerm + '/' + prenomPerm + '/' + emailPerm + '/' + telPerm+ '/'+raisonPerm+'/'+role;
          this._router.navigate([url]);
        } 
        else if(path === 'redirectToAuthentificationDis'){
          const id = params['id'];
          const nomDis = params['nomDis'];
          const prenomDis = params['prenomDis'];
          const emailDis = params['emailDis'];
          const telDis = params['telDis'];
          const fonctionDis = params['fonctionDis'];
          const societeDis = params['societeDis'];
          const adresseDis = params['adresseDis'];
          const role = params['role'];
          const url = '/angular/redirectToAuthentificationDis/' + id + '/' + nomDis + '/' + prenomDis + '/' + emailDis + '/' + telDis+ '/'+fonctionDis+ '/'+societeDis+ '/'+adresseDis+'/'+role;
          this._router.navigate([url]);
        }else if (path === 'redirectToAuthentificationOccas') {
          const id = params['id'];
          const nomOccas = params['nomOccas'];
          const prenomOccas = params['prenomOccas'];
          const emailOccas = params['emailOccas'];
          const telOccas = params['telOccas'];
          const role = params['role'];
          const projet = params['projet'];
          const url = '/angular/redirectToAuthentificationOccas/' + id + '/' + nomOccas + '/' + prenomOccas + '/' + emailOccas + '/' + telOccas+'/'+role+'/'+projet;
          this._router.navigate([url]);

        } 
        else if (path === 'redirectToSignPermanent') {
          const idPermanent = params['idPermanent'];
          const nomPermanent = params['nomPermanent'];
          const prenomPermanent = params['prenomPermanent'];
          const emailPermanent = params['emailPermanent'];
          const telPermanent = params['telPermanent'];
          const role = params['role'];
          const url = '/angular/rsp/' + idPermanent + '/' + nomPermanent + '/' + prenomPermanent + '/' + emailPermanent + '/' + telPermanent+'/'+role;
          this._router.navigate([url]);

        } 
        else if (path === 'redirectToSignOccas') {
          const id = params['id'];
          const nomOccas = params['nomOccas'];
          const prenomOccas = params['prenomOccas'];
          const emailOccas = params['emailOccas'];
          const telOccas = params['telOccas'];
          const role = params['role'];
          const url = '/angular/redirectToSignOccas/' + id + '/' + nomOccas + '/' + prenomOccas + '/' + emailOccas + '/' + telOccas + '/' + role;
          this._router.navigate([url]);

        } 
        else if (path === 'redirectToConfirm') {
          const id = params['idPermanent'];
          const nomPermanent = params['nomPermanent'];
          const prenomPermanent = params['prenomPermanent'];
          const emailPermanent = params['emailPermanent'];
          const telPermanent = params['telPermanent'];
          const url = '/angular/redirectToConfirm/' + id + '/' + nomPermanent + '/' + prenomPermanent + '/' + emailPermanent + '/' + telPermanent;
          this._router.navigate([url]);

        } 
        else if (path === 'redirectToConfirmOccas') {
          const id = params['id'];
          const nomPermanent = params['nomOccas'];
          const prenomPermanent = params['prenomOccas'];
          const emailPermanent = params['emailOccas'];
          const telPermanent = params['telOccas'];
          const url = '/angular/redirectToConfirmOccas/' + id + '/' + nomPermanent + '/' + prenomPermanent + '/' + emailPermanent + '/' + telPermanent;
          this._router.navigate([url]);

        }
        else if (path === 'redirectToConfirmDis') {
          const id = params['id'];
          const nomDis = params['nomDis'];
          const prenomDis = params['prenomDis'];
          const emailDis = params['emailDis'];
          const telDis = params['telDis'];
          const url = '/angular/redirectToConfirmDis/' + id + '/' + nomDis + '/' + prenomDis + '/' + emailDis + '/' + telDis;
          this._router.navigate([url]);

        }        
        else if (path === 'referent/majInitieOccasionnel') {
          const url = 'angular/utilisateurs/referent/majInitieOccasionnel/';
          this._router.navigate([url]);

        } 
        else if(path === 'formInitiePermanent'){
          const id = params['id'];
          const url = 'angular/utilisateurs/formInitiePermanent/' + id;
          this._router.navigate([url]);

        }
        else if(path === 'formInitieOccasionnel'){
          const id = params['id'];
          const url = 'angular/utilisateurs/formInitieOccasionnel/' + id;
          this._router.navigate([url]);

        }
        else if(path === 'addUser') {
          this._router.navigate([InsidersConstants.ROUTE_FULLADDUSER]);
        }else if(path === 'listMAJDIS') {
          this._router.navigate([InsidersConstants.ROUTE_FULLMAJLISTDIS]);
        } else if(path === 'periodes') {
            this._router.navigate([InsidersConstants.ROUTE_PERIODES]);   
        }else if(path === 'frontreferents') {
              this._router.navigate([InsidersConstants.ROUTE_REFERENTS]);       
        }  else if(path === 'home') {
          this._router.navigate([InsidersConstants.ROUTE_HOME]);
        }
      } else {
        this.showRolesSelect = true;
        this.roles = this._UserSecurityService.getUser().roles;
      }
      });
  }

 

  validRole(role: any) {
    this._UserSecurityService.setRole(role);
  //  this.redirectRoleTo();
 // const role = this._UserSecurityService.getUser().role;
  if(role === InsidersConstants.ROLE_INITIEPERMANENT || 
    role === InsidersConstants.ROLE_DIS || 
    role === InsidersConstants.ROLE_INITIEOCCASIONNEL ){;
      this._router.navigate([InsidersConstants.ROUTE_HOME]);
  } else {
        this._router.navigate([InsidersConstants.ROUTE_USERS]);
  }


  }

}
