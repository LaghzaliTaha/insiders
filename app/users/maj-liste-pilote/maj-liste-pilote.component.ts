import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../users.service';
import { CoreService } from '../../core/services/core.service';
import { SendmailService } from '../../shared/sendmail/sendmail.service';
import { Initieoccasionnel } from '../interfaces/initieoccasionnel.model';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { UserSecurityService } from '../user-security.service';
import { SelectItem,ConfirmationService } from 'primeng/primeng';
import { ScrollEvent } from 'ngx-scroll-event';
import { GroupInputs } from '../../shared/forms/models/group-inputs';
import { InsidersConstants } from '../../core/insiders-constants';
import { SelectBoxInput } from '../../shared/forms/models/select-box-input';
import { TextBoxInput } from '../../shared/forms/models/text-box-input';
import { DynamicFormComponent } from '../../shared/forms/components/dynamic-form/dynamic-form.component';
import { NewUser } from '../interfaces/new-user.model';
import { DateBoxInput } from '../../shared/forms/models/date-box-input';
import { MultiSelectInput } from '../../shared/forms/models/multi-select-input';

@Component({
  selector: 'app-maj-liste-pilote',
  templateUrl: './maj-liste-pilote.component.html',
  styleUrls: ['./maj-liste-pilote.component.scss']
})
export class MajListePiloteComponent implements OnInit {

  data: Initieoccasionnel[] = [];
  dataInitiOccaByPilote: Initieoccasionnel[] = [];
  totalRecords:number;
  loading= false;
  @ViewChild(DynamicFormComponent)
      myFormApp: DynamicFormComponent;

  selectedRows = [];
  statutsSignature: SelectItem[] = [];
  etats: SelectItem[] = [];
  showInfinitScroll: boolean;
  selectedRowsArrNumber: number;
  selectedRowsArr= [];
  listGroupInputs: GroupInputs[] = [];
  user: any;
  showProfil = false;
  disabled = false;
  modify = false;
  oldProjects=[];
  newProjects=[];
  preDISList = [];
  rowsColumnsColores: {
    row: any,
    columns: {
      nom: string,
      prenom: string,
      fonction: string,
      referent: string,
      adresseMail: string,
      numeroMobile: string,
      numPriveMobile: string,
      profil:string,
      condition:string,
      projets:string,
      raison:string,
      dateInscription:string,
      dateSignature:string,
      dateFinInscription:string,
      nomRuePr:string,
      numRuePr:string,
      complementAdressePr:string,
      villePr:string,
      codePostalPr:string,
      paysPr:string,
      nomEntreprise:string,
      nomRueEnt :string,
      complementAdresseEnt:string,
      villeEnt:string,
      codePostalEnt:string,
      paysEnt:string
   }
  }[];
  modificationList = [];
  oldValue: any;
  confirmationDialog = false;
  message: string;
  confirmationSubmit = false;
   
  

  constructor(private route:  ActivatedRoute,
    private _http: HttpClient,
    private _userService: UserService,
    private _coreService: CoreService,
    private _router: Router,
    private _SendmailService:SendmailService,
    private _userSecurityService: UserSecurityService,
    private _confirmationService: ConfirmationService) { }

  ngOnInit() {
    this._coreService.setcurrentPos('Utilisateurs / Mettre à jour la liste des initiés occasionnels');
    this._coreService.setCurrentClass('listes');
    
    this.getInitieOccaByPilote()
    this.etats.push({label: 'Selectionner', value: null});
    this.etats.push({label: 'Actif', value: true});
    this.etats.push({label: 'Inactif', value: false});

    this.statutsSignature.push({label: 'Selectionner', value: null});
    this.statutsSignature.push({label: 'En attente inscription', value: 'En attente inscription'});
    this.statutsSignature.push({label: 'En attente signature', value: 'En attente signature'});
    this.statutsSignature.push({label: 'Finalisé', value: 'Finalisé'});
  }

  handleScroll(event) {

    if (event.isReachingBottom) {
      this.loadMore();
      event.isReachingBottom = false;
    }
  }

  loadMore() {

    this.data =  this.dataInitiOccaByPilote.slice(0,  this.data.length + 20);
    if  ((this.dataInitiOccaByPilote.length - this.data.length) < 20 ) {
    this.selectedRowsArrNumber =  this.dataInitiOccaByPilote.length - this.data.length;
    if  ((this.dataInitiOccaByPilote.length - this.data.length) === 0) {
    this.showInfinitScroll =  false;
    } else {
    this.showInfinitScroll =  true;
    }
    } else {
    this.selectedRowsArrNumber =  20;
    this.showInfinitScroll =  true;
    }
}

public getInitieOccaByPilote() {
  this.loading = true;
  let user=this._userSecurityService.getUser();
    this._userService.getInitieOccaByPiloteMail(user.email)
    .subscribe(data => {
    this.dataInitiOccaByPilote = data;
    this.totalRecords = this.dataInitiOccaByPilote.length;
    this.fillRowsColors(this.dataInitiOccaByPilote);
    this._userService.getPiloteByEMail(this._userSecurityService.getUser().email)
      .subscribe(currentCorrep => {

        this._userService.getModificationsByReferent(currentCorrep)
          .subscribe(listModfifications => {

              listModfifications.forEach(modification => {
                const rowDIS = this.dataInitiOccaByPilote.find(dis => dis.id === modification.initie.id);
                rowDIS[modification.attributModified] = modification.newValue;
                let rowColumnsColors = this.rowsColumnsColores.find(rowColumns => rowColumns.row.id === rowDIS.id);
                rowColumnsColors.row = rowDIS;
                rowColumnsColors.columns[modification.attributModified] = (modification.validated? 'limeGreen' : 'red');
              });
    this.data = this.dataInitiOccaByPilote.slice(0, (this.data.length === 0 ? 20 :  this.data.length)) ;
    if ((this.dataInitiOccaByPilote.length - this.data.length) < 20 ) {
      if ((this.dataInitiOccaByPilote.length - this.data.length) === 0) {
        this.showInfinitScroll = false;
      } else {
        this.showInfinitScroll = true;
      }
      this.selectedRowsArrNumber = this.dataInitiOccaByPilote.length - this.data.length;
    } else {
      this.selectedRowsArrNumber = 20;
      this.showInfinitScroll = true;
    }
  });

    this.loading = false;
   });
  });

}

fillRowsColors(dataInitiOccaByPilote: any[]) {
  this.rowsColumnsColores = [];
  dataInitiOccaByPilote.forEach(row => {
      this.rowsColumnsColores.push({
        row: row,
        columns: {
            nom: 'black',
            prenom: 'black',
            fonction: 'black',
            referent: 'black',
            adresseMail: 'black',
            numeroMobile: 'black',
            numPriveMobile: 'black',
profil:'black',
condition:'black',
projets:'black',
raison:'black',
dateInscription:'black',
dateSignature:'black',
dateFinInscription:'black',
nomRuePr:'black',
numRuePr:'black',
complementAdressePr:'black',
villePr:'black',
codePostalPr:'black',
paysPr:'black',
nomEntreprise:'black',
nomRueEnt :'black',
complementAdresseEnt:'black',
villeEnt:'black',
codePostalEnt:'black',
paysEnt:'black'
        }
      });
  });
}
public consultPilote(user: any) {
  this.listGroupInputs = [];
  this.user = user;
  this._userService.getConfProfile("InitieOccasionnel").subscribe(groups =>{
        this.oldValue = Object.assign({}, user);
        this.oldValue = user;
        groups.forEach(group => {
          let groupInputs =  new GroupInputs();
          groupInputs.label = group.group_label;
          group.inputs.forEach(input => {
            switch (input.key) {
              case 'projet':
                  let options: {key: any, value: string}[] = [];
                  let projects: any[] = []
                  groupInputs.inputs.push(new MultiSelectInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: projects,
                  options: options,
                  editable: true
                  }));
                  this._userService.getProjetsInitieOccasionnel(user).subscribe(
                    projectsList => {
                      projectsList.forEach(project => {
                            options.push({
                              key: project,
                              value: project.nom
                            });
                            projects.push(project);
                          }); 

                          this.oldProjects = projectsList;
                  });
                  break;
                  case 'dateInscription': case 'dateSignature': case'dateFinInscription':  case 'dateNaissance':
                  let dateUser:Date;
                  if (user[input.key] !== null) {
                    dateUser = new Date(Number(user[input.key]));
                  }
                  if (input.key === 'dateNaissance') {
                    groupInputs.inputs.push(new DateBoxInput({
                      key: input.key,
                      label: input.label,
                      type: 'date',
                      order: input.order,
                      value: dateUser,
                      editable: true
                    }));
                  } else {
                    groupInputs.inputs.push(new TextBoxInput({
                      key: input.key,
                      label: input.label,
                      type: 'text',
                      order: input.order,
                      value: (dateUser?dateUser.toLocaleDateString(): null),
                      editable: true
                    }));
                  }
                  break;
              case 'condition':
                  let conditionOptions: {key: any, value: string}[] = [{key: 'Interne', value: 'Interne'}, {key: 'Externe', value: 'Externe'}];
                  groupInputs.inputs.push(new SelectBoxInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: user[input.key],
                  options: conditionOptions,
                  editable: true
                  }));
                  break;
              case 'pilote':
                  let pilotesOptions: {key: any, value: string}[] = [{key: user.pilote.id, value: user.pilote.nom + ' ' + user.pilote.prenom}];
                  groupInputs.inputs.push(new SelectBoxInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: user.pilote.id,
                  options: pilotesOptions,
                  editable: true
                  }));
                  break;
              case 'raison':
                  let raisonOptions: {key: any, value: string}[] = [
                  {key: 'Membre du Conseil d\'administration', value: 'Membre du Conseil d\'administration'}, 
                  {key: 'Membre du Comité exécutif', value: 'Membre du Comité exécutif'},
                  {key: 'PMO Comité exécutif', value: 'PMO Comité exécutif'},
                  {key: 'Commissaire aux comptes', value: 'Commissaire aux comptes'},
                  {key: 'Directeur', value: 'Directeur'}
                  ];
                  groupInputs.inputs.push(new SelectBoxInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: user.raison,
                  options: raisonOptions,
                  editable: true
                  }));
                  break;
              default:
                  groupInputs.inputs.push(new TextBoxInput({
                    key: input.key,
                    label: input.label,
                    type: 'text',
                    order: input.order,
                    value: user[input.key],
                    editable: true
                  }));
                  break;
          }
          });
          this.listGroupInputs.push(groupInputs);
          
        });

    
          this.showProfil = true;

          this.editPilote();

          setTimeout(()=>{   
            this.modify = true;
            this.myFormApp.disabled = true;           
          }, 300);
         
          
    
  });
}

public editPilote() {
  let idPilote;
  this.listGroupInputs.forEach(group => {
    group.inputs.forEach(input => {
      if (input.key !== 'profil' && input.key !== 'dateInscription' && input.key !=='projet' && 
      input.key !=='pilote' && input.key !== 'dateSignature' && input.key !== 'dateFinInscription') {
        input.editable = false;
      }
      if (input.key === 'pilote') {
        idPilote = input.value;
        this._userService.getAllPilotes().subscribe(
          pilotes => {
            pilotes.forEach(pil => {
               if (pil.id !== input.value) {
                (<SelectBoxInput>input).options.push({
                  key: pil.id,
                  value: pil.nom + ' ' + pil.prenom
                });
              }
            });
          });
      }
       if (input.key === 'projet') {
         this._userService.getProjetByPilote({id: idPilote}).subscribe(
           projects => {
             projects.forEach(project => {
              if(!input.value.find(val => val.id === project.id)) {
                (<MultiSelectInput>input).options.push({
                  key: project,
                  value: project.nom
                });
              }
             });
           });
       }
    });
  });
}
public onValid(event) {
  this.disabled = event;
}

public onSubmit(event) {
  let user: NewUser;
  if (event.dateInscription === '') {
    event.dateInscription = null;
  } else {
    event.dateInscription = new Date(event.dateInscription).getTime();
  }
  if (event.dateFinInscription === '') {
    event.dateFinInscription = null;
  } else {
    event.dateFinInscription = new Date(event.dateFinInscription).getTime();
  }
  if (!event.dateNaissance) {
    event.dateNaissance = null;
  } else {
    event.dateNaissance = new Date(event.dateNaissance).getTime();
  }
  if (event.dateSignature === '') {
    event.dateSignature = null;
  } else {
    event.dateSignature = new Date(event.dateSignature).getTime();
  }
  this._userService.getUserById(InsidersConstants.apiUrlGetPiloteById, event.pilote)
  .subscribe(pilote => {
    user = <NewUser>event;
  user.pilote = pilote;
  delete event.dateInscription;
  event.pilote = pilote;
  user.id = this.user.id;
  user.projets=event.projet;

  this.newProjects = user.projets.filter(newProjet => {
    return (this.oldProjects.find(oldProjet=> oldProjet.id === newProjet.id)?false:true)
  });
         
          user.id = this.user.id;
          this.preDISList = this.preDISList.filter(preUser => user.id !== preUser.id);
          this.preDISList.push(user);
          this.showProfil = false;
          this.modify = false
          this.updateTable(user);
          //this.rowsColumnsColores[1].columns['nom'] = 'green';
 
  });
}


 
   

public callChild() {
  this.myFormApp.onSubmit();
}

getUpdatedInputs() {
  const listOfInputs = this.myFormApp.changedInputs;
 
   return listOfInputs.filter(function duplicate(input, index, list) {
    return index === list.findIndex(elem => elem.input ===  input.input);
  });
}

getRowColumnColor(row:any, column: string) {
  return this.rowsColumnsColores.find(rowColumns => rowColumns.row.id === row.id).columns[column];
}


updateTable(row: any) {
  const listOfInputs = this.getUpdatedInputs();
  const currentRow = this.rowsColumnsColores.find(rowColumns => rowColumns.row.id === row.id);
  let users = [...this.dataInitiOccaByPilote];
  const currentUser = users[this.dataInitiOccaByPilote.indexOf(this.user)];
  
  listOfInputs.forEach(input => {
    currentUser[input.input] = row[input.input];
    currentRow.columns[input.input] = 'red';
    let modification = {
      attributModified: input.input,
      typeAttribut: 'String',
      lastValue: this.oldValue[input.input],
      newValue: row[input.input],
      validated: false,
      initie: this.user
    };
    switch (input.input) {
      case 'referent' :
        modification.typeAttribut = 'Pilote';
        modification.lastValue = this.oldValue[input.input].id.toString();
        modification.newValue = row[input.input].id.toString();
        break;
      case 'designePar' :
        modification.typeAttribut = 'InitiePermanent';
        modification.lastValue = this.oldValue[input.input].id.toString();
        modification.newValue = row[input.input].id.toString();
        break;
      default:
        modification.typeAttribut = 'String';
        if(this.oldValue[input.input]){
        modification.lastValue = this.oldValue[input.input].toString();
      }
      else{
        modification.lastValue="";
      }
      if(row[input.input]){
        modification.newValue = row[input.input].toString();
      }
      else
      modification.newValue="";
        break;
    }

     this.modificationList.push(modification);

  });
  
  this.dataInitiOccaByPilote = users
  
}

public submitModifications() {
  this._userService.getPiloteByEMail(this._userSecurityService.getUser().email)
    .subscribe(corresp => {
      this._userService.setModification(corresp, this.modificationList)
        .subscribe(modifications => {
          this.confirmationDialog = true;
          this.message = "La mise à jour a été sousmis à l'administrateur";
          this.confirmationSubmit = true;
        })
    });
}

public confirmModification() {
  this.confirmationDialog = true;
  this.message = "Voulez-vous soumettre la mise à jour à l'administrateur ?";
  this.confirmationSubmit = false;
}

deactivateListPilote() {
  this._confirmationService.confirm({
    message: 'Souhaitez-vous désactiver l(es) utilisateur(s) sélectionné(s)?',
    icon: 'fa fa-ban',
    header: 'Confirmation de suppression',
    accept: () => {
      this._userService.desactivatePilote(this.selectedRowsArr).subscribe(response =>{
        let users = this.selectedRowsArr;
        users.forEach(user => {
          user.etat = false; 
          this.updateUser(user);
        });
      });
    },
    reject: () => {

      }

});
}

activateListPilote() {
this._confirmationService.confirm({
  message: 'Souhaitez-vous Activer l(es) utilisateur(s) sélectionné(s)?',
  icon: 'fa fa-ban',
  header: 'Confirmation de suppression',
  accept: () => {
    this._userService.activatePilote(this.selectedRowsArr).subscribe(response =>{
        let users = this.selectedRowsArr;
        users.forEach(user => {
          user.etat = true; 
          this.updateUser(user);
        });
    });
  },
  reject: () => {

    }

});
}

activateOnePilote(user: any) {
const users = [];
users.push(user);

this._confirmationService.confirm({
  message: 'Souhaitez-vous activer cet utilisateur?',
  icon: 'fa fa-ban',
  header: 'Confirmation de la désactivation',
  accept: () => {
    this._userService.activatePilote(users).subscribe(response =>{
      user.etat = true;
      this.updateUser(user);
    });
  },
  reject: () => {

    },

});
}

deactivateOnePilote(user: any) {  
const users = [];
users.push(user);

this._confirmationService.confirm({
  message: 'Souhaitez-vous désactiver cet utilisateur?',
  icon: 'fa fa-ban',
  header: 'Confirmation de la désactivation',
  accept: () => {
    this._userService.desactivatePilote(users).subscribe(response =>{
      user.etat = false;
      this.updateUser(user);
    });
  },
  reject: () => {

  },

});
}

updateUser(user: any){
let users = [...this.dataInitiOccaByPilote];
let currentUser = users[this.dataInitiOccaByPilote.indexOf(this.user)];

currentUser = user;
this.dataInitiOccaByPilote = users;
}


}
