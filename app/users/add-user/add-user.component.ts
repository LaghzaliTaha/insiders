import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NewUser } from '../interfaces/new-user.model';
import { FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../users.service';
import { InsidersConstants } from '../../core/insiders-constants';
import { CoreService } from '../../core/services/core.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;
  profils = ['Initié Permanent', 'Initié Occasionnel', 'Administrateur', 'Correspondant', 'Pilote', 'DIS'];
  conditions = ['Interne', 'Externe'];
  raisons = ['Membre du Conseil d\'administration', 'Membre du Comité exécutif', 'PMO Comité exécutif',
            'Commissaire aux comptes', 'Directeur'];
  pilotes = [];
  projets: any[];
  comexs = [];
  referents = [];
  designeParList = [];
  newUser: NewUser;
  creationProjetError:string;
  addUserDisplayDialog = false;
  messageDisplayDialog = false;
  addProjectDisplayDialog=false;
  projetInexistant=false;
  message: string;
  projetName:string;
  created = false;
  errorMessage: string;
  showErrorMessage = false;
  show = false;
  currentProjet=null;



  constructor(private formBuilder: FormBuilder,
              private _http: HttpClient,
              private _userService: UserService,
              private _coreService: CoreService,
              private _router: Router) { }

  ngOnInit() {
    this._coreService.setcurrentPos('Utilisateurs / Créer un utilisateur');
    this._coreService.setCurrentClass('utilisateurs');
    this.createForm();
    }

  createForm(): void {
    this.form = this.formBuilder.group({
      profil: ['', Validators.required],
      nom: ['', Validators.compose([Validators.required])
      ],
      prenom: ['', Validators.compose([Validators.required])
      ],
      adresseMail: ['', Validators.compose([
        Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      ],
      numeroMobile: ['', [
        Validators.required,
        Validators.pattern('^(\\+33)+[0-9]{9}$')
      ]
      ],
      condition: ['', Validators.required],
      raison: ['', Validators.required],
      pilote: ['', Validators.required],
      fonction: ['', Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      comex: ['', Validators.required],
      entite: ['', Validators.compose([Validators.required])
      ],
      referent: ['', Validators.required],
      designePar: ['', Validators.required],
      projet: ['', Validators.required]
    });
  }

  isError(champ: string) {
    return this.form.get(champ).invalid && this.form.get(champ).touched;
  }

  isErrorInputNumber(champ: string) {
    return  this.form.get(champ).dirty && this.form.get(champ).hasError('minlength');
  }

  addUser() {
    const control = <FormArray>this.form.controls['addresses'];
    this.newUser = {
      profil: this.form.get('profil').value,
      nom: this.form.get('nom').value,
      prenom: this.form.get('prenom').value,
      adresseMail: this.form.get('adresseMail').value,
      numeroMobile: this.form.get('numeroMobile').value,
      nomEntreprise: "",
      villeEnt: "",
    };

    if (this.form.get('profil').value === 'Initié Permanent'
        || this.form.get('profil').value === 'Initié Occasionnel') {
          this.newUser.condition = this.form.get('condition').value;
          this.newUser.raison = this.form.get('raison').value;
        }

    if (this.form.get('profil').value === 'Initié Occasionnel') {
        this.newUser.pilote = this.form.get('pilote').value;
    }

    if (this.form.get('profil').value === 'Pilote'
        || this.form.get('profil').value === 'Initié Occasionnel') {
        this.newUser.projets = this.form.get('projet').value;
    }

    if (this.form.get('profil').value === 'Correspondant'
        || this.form.get('profil').value === 'DIS') {
          this.newUser.fonction = this.form.get('fonction').value;
    }

    if (this.form.get('profil').value === 'Correspondant') {
       this.newUser.comex = this.form.get('comex').value;
    }

    if (this.form.get('profil').value === 'Pilote') {
       this.newUser.entite = this.form.get('entite').value;
    }

    if (this.form.get('profil').value === 'DIS') {
      this.newUser.referent = this.form.get('referent').value;
      this.newUser.designePar = this.form.get('designePar').value;
     }

     this.newUser.etat = true;
     this.addUserDisplayDialog = true;

  }

  cancel() {
    this.addUserDisplayDialog = false;
  }

  send () {

    let urlApi: string;
    this.addUserDisplayDialog = false;

    switch (this.newUser.profil) {
      case 'Initié Permanent': {
        this.newUser.urlFill = this._userService.getUrlAdd();
        urlApi = InsidersConstants.apiUrlAddInitiePermanent;
        this.sendUserTobackend(urlApi);
        break;
      }
      case 'Initié Occasionnel': {
        this.newUser.urlFillOccas = this._userService.getUrlAdd();
        urlApi = InsidersConstants.apiUrlAddInitieOccasionnel;
        this.sendInitOccaTobackend(urlApi);
        break;
      }
      case 'Administrateur': {
        urlApi = InsidersConstants.apiUrlAddAdministrateur;
        this.sendUserTobackend(urlApi);
        break;
      }
      case 'Correspondant': {
        urlApi = InsidersConstants.apiUrlAddCorrespondant;
        this.sendUserTobackend(urlApi);
        break;
      }
      case 'Pilote': {
        urlApi = InsidersConstants.apiUrlAddPilote;
        this.sendPiloteTobackend(urlApi);
        break;
      }
      default: {
        this.newUser.urlFillDis = this._userService.getUrlAdd();
        urlApi = InsidersConstants.apiUrlAddDIS;
        this.sendUserTobackend(urlApi);
        break;
      }

   }
   
  }

  sendUserTobackend(urlApi: string) {
    this._userService.addUser(urlApi, this.newUser)
    .catch((res)=>{
          this.message = ' Une erreur est survenue lors de la création de l\'utilisateur';
          this.messageDisplayDialog = true;
          this.created = false;
          this.errorMessage =  res.error.toString();
          const exist =  this.errorMessage.indexOf('Object existe déjà');
          if(exist !== -1) {
            this.message = 'Utilisateur existe déjà';
          }
          this.showErrorMessage = true;
      return this._coreService.handleError(res);})
    .subscribe(
      response => {
          this._userService.sendMail(response).subscribe();
          this.message = 'L\'utilisateur est créé avec succès';
          this.messageDisplayDialog = true;
          this.created = true;
    });
  }

  sendPiloteTobackend(urlApi: string) {
    this._userService.addUser(urlApi, this.newUser)
    .catch((res)=>{
          this.message = ' Une erreur est survenue lors de la création de l\'utilisateur';
          this.messageDisplayDialog = true;
          this.created = false;
          this.errorMessage =  res.error.toString();
          const exist =  this.errorMessage.indexOf('Object existe déjà');
          if(exist !== -1) {
            this.message = 'Utilisateur existe déjà';
          }
          this.showErrorMessage = true;
      return this._coreService.handleError(res);})
    .subscribe(
      response => {
        this._userService.sendMail(response).subscribe();
        this.message = 'L\'utilisateur est créé avec succès';
        this.messageDisplayDialog = true;
        this.created = true;
        const projects = this.newUser.projets;
        for (let i=0; i< projects.length; i++) {
          this._userService.linkPiloteToProject(projects[i], response.id).subscribe(
            resp => {
            },
            err => {
              this.message = ' Une erreur est survenue lors de l\'affectation des projets';
              this.messageDisplayDialog = true;
          });
        }
          
    });
  }

  sendInitOccaTobackend(urlApi: string) {
    this._userService.addUser(urlApi, this.newUser)
    .catch((res)=>{
          this.message = ' Une erreur est survenue lors de la création de l\'utilisateur';
          this.messageDisplayDialog = true;
          this.created = false;
          this.errorMessage =  res.error.toString();
          const exist =  this.errorMessage.indexOf('Object existe déjà');
          if(exist !== -1) {
            this.message = 'Utilisateur existe déjà';
          }
          this.showErrorMessage = true;
      return this._coreService.handleError(res);})
    .subscribe(
      response => {
        this.message = 'L\'utilisateur est créé avec succès';
        this.messageDisplayDialog = true;
        this.created = true;
        const projects = this.newUser.projets;
          this._userService.addProjetsToInitOcca(projects, response).subscribe(
            resp => {
              this._userService.sendMailOccas(response,projects).subscribe();
            },
            err => {
              this.message = ' Une erreur est survenue lors de l\'affectation des projets';
              this.messageDisplayDialog = true;
          });
          
    });

    
  }

  showForms() {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json; charset=utf-8'});
    this._http.post('http://localhost:8080/INSIDERS/rest/administrateur/add', JSON.stringify({
      adresseMail: 'anasdbichi@gmail.com',
      etat: true,
      nom: 'anass',
      numeroMobile: '0615554653',
      prenom: 'dbichi',
      profil: 'Administrateur',
        }), {headers: headers}).subscribe(data => {
    });
   }

   addFormControl() {
        if (this.form.get('profil').value === 'Initié Permanent') {
          return this.form.get('nom').invalid ||
          this.form.get('prenom').invalid ||
          this.form.get('adresseMail').invalid ||
          this.form.get('numeroMobile').invalid ||
          this.form.get('condition').invalid ||
          this.form.get('raison').invalid;
        }

        if (this.form.get('profil').value === 'Initié Occasionnel') {
          return this.form.get('nom').invalid ||
          this.form.get('prenom').invalid ||
          this.form.get('adresseMail').invalid ||
          this.form.get('numeroMobile').invalid ||
          this.form.get('condition').invalid ||
          this.form.get('raison').invalid ||
          this.form.get('pilote').invalid ||
          this.form.get('projet').invalid;
        }

        if (this.form.get('profil').value === 'Administrateur') {
          return this.form.get('nom').invalid ||
          this.form.get('prenom').invalid ||
          this.form.get('adresseMail').invalid ||
          this.form.get('numeroMobile').invalid;
        }

        if (this.form.get('profil').value === 'Correspondant') {
          return this.form.get('nom').invalid ||
          this.form.get('prenom').invalid ||
          this.form.get('adresseMail').invalid ||
          this.form.get('numeroMobile').invalid ||
          this.form.get('fonction').invalid ||
          this.form.get('comex').invalid;
    }

        if (this.form.get('profil').value === 'Pilote') {
              return this.form.get('nom').invalid ||
              this.form.get('prenom').invalid ||
              this.form.get('adresseMail').invalid ||
              this.form.get('numeroMobile').invalid ||
              this.form.get('projet').invalid ||
              this.form.get('entite').invalid;
        }


        if (this.form.get('profil').value === 'DIS') {
          return this.form.get('nom').invalid ||
          this.form.get('prenom').invalid ||
          this.form.get('adresseMail').invalid ||
          this.form.get('numeroMobile').invalid ||
          this.form.get('fonction').invalid ||
          this.form.get('referent').invalid ||
          this.form.get('designePar').invalid;
        }
   }


   profileChanged() {

    this.resetForm();

        if (this.form.get('profil').value === 'Pilote') {
            this._userService.getUnlinkedProjects().subscribe(
              projects => {
                this.projets = projects;
              });
        }

        if (this.form.get('profil').value === 'Initié Occasionnel') {
          this._userService.getAllPilotes().subscribe(
            pilotes => {
              this.pilotes = pilotes;
            });
        }

        if (this.form.get('profil').value === 'Correspondant') {
          this._userService.getAllInitiePermanent().subscribe(
            initiePerms => {
              this.comexs = initiePerms;
            });
        }
        
        if (this.form.get('profil').value === 'DIS') {
          this._userService.getAllInitiePermanent().subscribe(
            initiePerms => {
              this.designeParList = initiePerms;
            });

          this._userService.getAllCorrespondant().subscribe(
            corresps => {
              this.referents = corresps;
            });
        }

   }

   public piloteChanged() {
    this._userService.getProjetByPilote(this.form.get('pilote').value).subscribe(projetcs => {
      this.projets = projetcs;
    });
  }

  sendMail(user: NewUser) {
    this._userService.sendMail(user).subscribe(
      mail => {});
  }

  showProjectDisplayDialog(){
    this.addProjectDisplayDialog=true;;
  }
  addProject(projetName){
    projetName=projetName.toLocaleUpperCase();
    var self=this;
    this.projetInexistant=false;
    if(projetName.length<4 || projetName.length>20){
      this.creationProjetError='Veuillez introduire une chaine de caractère de longeur entre 4 et 22';
      this.projetInexistant=true;
    }
    else{
    this._userService.addProject(projetName) .
    catch((res)=>{
      this.creationProjetError = ' Une erreur est survenue lors de la création de l\'utilisateur';
      this.projetInexistant=true;
  return this._coreService.handleError(res);}).
  subscribe(response=>{
      if(response==null){
        this.creationProjetError='Ce projet existe déjà et est déjà affecté à un pilote';
        this.projetInexistant=true;
      }
      else{
        self.projets.push(response);
        this.currentProjet=response;
        this.projetInexistant=false;
        this.addProjectDisplayDialog=false;
        let currentProjectArray=[];
        currentProjectArray.push(this.currentProjet);
        this.form.get('projet').setValue(currentProjectArray);
      }
      })
    }
    }
  
    projetInexist()
    {
      return this.projetInexistant;
    }
  cancelProjectDisplayDialog(){
    this.addProjectDisplayDialog=false;
  }

  isSelected(objet:any){
   
    if(objet==this.currentProjet){
      return objet;
    }
    else
    return null;
}


  resetForm() {
    this.form.get('nom').reset();
    this.form.get('prenom').reset();
    this.form.get('adresseMail').reset();
    this.form.get('numeroMobile').reset();
    this.form.get('condition').reset();
    this.form.get('condition').setValue('');
    this.form.get('raison').reset();
    this.form.get('raison').setValue('');
    this.form.get('pilote').reset();
    this.form.get('pilote').setValue('');
    this.form.get('fonction').reset();
    this.form.get('comex').reset();
    this.form.get('comex').setValue('');
    this.form.get('entite').reset();
    this.form.get('referent').reset();
    this.form.get('referent').setValue('');
    this.form.get('designePar').reset();
    this.form.get('designePar').setValue('');
    this.form.get('projet').reset();
    this.form.get('projet').setValue('');
  }

  closePopUp() {
    if(this.created) {
      this._router.navigate([InsidersConstants.ROUTE_USERS]);
    }
    this.messageDisplayDialog = false
    this.showErrorMessage = false
  }

  showError() {
    this.showErrorMessage = true
  }

}
