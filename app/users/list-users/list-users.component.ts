import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../users.service';
import { User } from '../../core/interface/user.model';
import { ScrollEvent } from 'ngx-scroll-event';
import { SelectItem } from 'primeng/components/common/api';
import { forEach } from '@angular/router/src/utils/collection';
import { CoreService } from '../../core/services/core.service';
import {ConfirmationService} from 'primeng/primeng';
import {Router} from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { InsidersConstants } from '../../core/insiders-constants';
import { UserSecurityService } from '../user-security.service';
import { GroupInputs } from '../../shared/forms/models/group-inputs';
import { MultiSelectInput } from '../../shared/forms/models/multi-select-input';
import { TextBoxInput } from '../../shared/forms/models/text-box-input';
import { SelectBoxInput } from '../../shared/forms/models/select-box-input';
import { InputBase } from '../../shared/forms/models/input-base';
import { NewUser } from '../interfaces/new-user.model';
import { DateBoxInput } from '../../shared/forms/models/date-box-input';
import { DynamicFormComponent } from '../../shared/forms/components/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],

})
export class ListUsersComponent implements OnInit {
  @ViewChild(DynamicFormComponent)
      myFormApp: DynamicFormComponent;
  msgs= [];
  dataUsers: any[] = [];
  data: User[] = [];
  loading = false;
  selectedRowsArr = [];
  sortF = 'nom';
  etat: SelectItem[];
  condition: SelectItem[];
  statutSignature: SelectItem[];
  profil: SelectItem[];
  message: string;
  messageDisplayDialog = false;
  totalRecords:number;
  listGroupInputs: GroupInputs[] = [];
  user: any;
  showProfil = false;
  disabled = false;
  modify = false;
  updateUserDisplay = false;
  updateMessageHeader = '';
  updateSucces;
  items = [
    {label: 'En attente d’inscription'},
    {label: 'En attente de signature'},
    {label: 'Finalisé'}
  ];
  activeIndex = 1;
  displayWorkflow = false;
  deleteDialog = false;
  notDeletedUsers = [];
  listNotDeletedUsers = '';
  addProjectDisplayDialog=false;  
  creationProjetError:string;
  projetName:string;
  projetInexistant=false;
  deleteInProgressUsers = false;
  deleteUsersMsg: string;
  oldProjects = [];
  newProjects = [];
  newPrj=false;
  

  constructor( private _router: Router,
    private _UserService: UserService, 
    private _coreService: CoreService,
     private _confirmationService: ConfirmationService,
     private  userSecurityService: UserSecurityService) { }

  selectedRowsArrNumber: number;
  showInfinitScroll: boolean;
  selectedselectedRowsArrArr= [];

  ngOnInit() {
    const role = this.userSecurityService.getUser().role;
    this._coreService.setCurrentClass('utilisateurs');
    
    if(role === InsidersConstants.ROLE_INITIEPERMANENT || 
      role === InsidersConstants.ROLE_DIS || 
      role === InsidersConstants.ROLE_INITIEOCCASIONNEL ){;
        this._router.navigate([InsidersConstants.ROUTE_HOME]);
      }  
    this._coreService.setcurrentPos('Utilisateurs');
    this.getAllUsers();
    this.etat = [];
    this.etat.push({label: 'Selectionner', value: null});
    this.etat.push({label: 'Actif', value: true});
    this.etat.push({label: 'Inactif', value: false});


    this.condition = [];
    this.condition.push({label: 'Selectionner', value: null});
    this.condition.push({label: '--', value: '--' });
    this.condition.push({label: 'Interne', value: 'Interne'});
    this.condition.push({label: 'Externe', value: 'Externe'});

    this.statutSignature = [];
    this.statutSignature.push({label: 'Selectionner', value: null});
    this.statutSignature.push({label: '--', value: '--' });
    this.statutSignature.push({label: "En attente d'inscription", value: "En attente d'inscription"});
    this.statutSignature.push({label: 'En attente signature', value: 'En attente signature'});
    this.statutSignature.push({label: 'Finalisé', value: 'Finalisé'});

    this.profil = [];
    this.profil.push({label: 'Selectionner', value: null});
    this.profil.push({label: 'Administrateur', value: 'Administrateur'});
    this.profil.push({label: 'Initié permanent', value: 'Initié permanent'});
    this.profil.push({label: 'Initié occasionnel', value: 'Initié occasionnel'});
    this.profil.push({label: 'DIS', value: 'DIS'});
    this.profil.push({label: 'Pilote', value: 'Pilote'});
    this.profil.push({label: 'Correspondant', value: 'Correspondant'});

  }
  handleScroll(event) {

        if (event.isReachingBottom) {
          this.loadMore();
          event.isReachingBottom = false;
        }
      }

      loadMore() {

        this.data =  this.dataUsers.slice(0,  this.data.length + 20);
        if  ((this.dataUsers.length - this.data.length) < 20 ) {
        this.selectedRowsArrNumber =  this.dataUsers.length - this.data.length;
        if  ((this.dataUsers.length - this.data.length) === 0) {
        this.showInfinitScroll =  false;
        } else {
        this.showInfinitScroll =  true;
        }
        } else {
        this.selectedRowsArrNumber =  20;
        this.showInfinitScroll =  true;
        }
    }

  public getAllUsers() {
  switch(this.userSecurityService.getUser().role){
  case 'PILOTE' :
  let userEmail = this.userSecurityService.getUser().email ;

  this._UserService.getInitieOccaByPiloteMail(userEmail).subscribe(
    data =>{
      const admins =[];
      const crspts =  [];
      const pilote=[];
      this.dataUsers.concat(admins);
      this.dataUsers.concat(crspts);
      this.dataUsers.concat(pilote);
      this.dataUsers = this.dataUsers.concat(data);
      this.totalRecords = this.dataUsers.length;
      this.data = this.dataUsers.slice(0, (this.data.length === 0 ? 20 :  this.data.length)) ;
      if ((this.dataUsers.length - this.data.length) < 20 ) {
        if ((this.dataUsers.length - this.data.length) === 0) {
          this.showInfinitScroll = false;
        } else {
          this.showInfinitScroll = true;
        }
        this.selectedRowsArrNumber = this.dataUsers.length - this.data.length;
      } else {
        this.selectedRowsArrNumber = 20;
        this.showInfinitScroll = true;
      }

    }
  );
  break;
  case 'CORRESPONDANT' :
  this._UserService.getDisByConnectedCorresp(this.userSecurityService.getUser()).subscribe(
    data =>{
      const admins =[];
      const crspts =  [];
      const pilote=[];
      this.dataUsers.concat(admins);
      this.dataUsers.concat(crspts);
      this.dataUsers.concat(pilote);
      this.dataUsers = this.dataUsers.concat(data);
      this.dataUsers.forEach(dataUser => {
        dataUser.referent = dataUser.referent.nom ;
      });
      this.totalRecords = this.dataUsers.length;
      this.data = this.dataUsers.slice(0, (this.data.length === 0 ? 20 :  this.data.length)) ;
      if ((this.dataUsers.length - this.data.length) < 20 ) {
        if ((this.dataUsers.length - this.data.length) === 0) {
          this.showInfinitScroll = false;
        } else {
          this.showInfinitScroll = true;
        }
        this.selectedRowsArrNumber = this.dataUsers.length - this.data.length;
      } else {
        this.selectedRowsArrNumber = 20;
        this.showInfinitScroll = true;
      }

    }
  );
  break;
  case 'ADMIN' : 
  this._UserService.getUsers()
    .subscribe(data => {
      const admins =  data.admin;
      admins.forEach(admin => {
        admin.condition = '--' ;
        admin.statutSignature='--';
      });
      const crspts =  data.crspt;
      crspts.forEach(crspt => {
        crspt.condition = '--' ;
        crspt.statutSignature='--';
      });
      const pilotes =  data.pilote;
      pilotes.forEach(pilote => {
        pilote.condition = '--' ;
        pilote.statutSignature='--';
      });
        this.dataUsers = this.dataUsers.concat(admins);
        this.dataUsers = this.dataUsers.concat(data.initiePer);
        this.dataUsers = this.dataUsers.concat(crspts);
        this.dataUsers = this.dataUsers.concat(data.dis);
        this.dataUsers = this.dataUsers.concat(data.initieOcca);
        this.dataUsers = this.dataUsers.concat(pilotes);
          this.totalRecords = this.dataUsers.length;
          this.data = this.dataUsers.slice(0, (this.data.length === 0 ? 20 :  this.data.length)) ;
          if ((this.dataUsers.length - this.data.length) < 20 ) {
            if ((this.dataUsers.length - this.data.length) === 0) {
              this.showInfinitScroll = false;
            } else {
              this.showInfinitScroll = true;
            }
            this.selectedRowsArrNumber = this.dataUsers.length - this.data.length;
          } else {
            this.selectedRowsArrNumber = 20;
            this.showInfinitScroll = true;
          }
      });
      break;
      default:
}

  }
  
  public  deleteUser() {

    for (let i = 0 ; i < this.selectedRowsArr.length ; i++) {
      this._UserService.deleteUser( this.selectedRowsArr[i].id , this.selectedRowsArr[i].profil).subscribe(response => {
        this.dataUsers =  [];
        this.getAllUsers();
        
        if(!response){
          this.messageDisplayDialog = true;
        }
      });
    }
  }
  // for delete single user
  public singleDelete(row){
    this._UserService.deleteUser( row.id , row.profil).subscribe(response => {
      this.dataUsers =  [];
      this.getAllUsers();
      
      if(!response){
        this.messageDisplayDialog = true;
      }
    });
  }
  confirmSimpleDelete(row) {
    this._confirmationService.confirm({
        message: 'Souhaitez-vous supprimer cet élément sélectionné?',
        icon: 'fa fa-trash',
        header: 'Confirmation de suppression',
        accept: () => {
          this.singleDelete(row);
  
         this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        },
        reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
          }
  
    });
  }
  // end single user process 
  confirmDelete() {
    this._confirmationService.confirm({
        message: 'Souhaitez-vous supprimer l(es) élément(s) sélectionné(s)?',
        icon: 'fa fa-trash',
        header: 'Confirmation de suppression',
        accept: () => {
          this.deleteUser();
  
         this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        },
        reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
          }
  
    });
  }

  // for desactivate single user
  public deactivateSingleUser(row) {

      this._UserService.deactivateUser( row.id , row.profil, row)
          .subscribe(response => {
            this.dataUsers =  [];
            this.getAllUsers();
          });   
          this._UserService.sendDesactivationMail(row).subscribe()  ;
  }
  
  confirmSingleDeactivate(row) {
    this._confirmationService.confirm({
        message: 'Souhaitez-vous désactiver cet élément?',
        icon: 'fa fa-square-o',
        header: 'Confirmation de désactivation',
        accept: () => {
          this.deactivateSingleUser(row);
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        },
        reject: () => {
          this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
        }

    });
  }
  // end single user process
  public deactivateUser() {

    for (let i = 0 ; i < this.selectedRowsArr.length ; i++) {
      this._UserService.deactivateUser( this.selectedRowsArr[i].id , this.selectedRowsArr[i].profil, this.selectedRowsArr)
          .subscribe(response => {
            this.dataUsers =  [];
            this.getAllUsers();
          });
          this._UserService.sendDesactivationMail(this.selectedRowsArr[i]).subscribe()  ;
    }
  }
  



confirmDeactivate() {
  this._confirmationService.confirm({
      message: 'Souhaitez-vous désactiver l(es) élément(s) sélectionné(s)?',
      icon: 'fa fa-square-o',
      header: 'Confirmation de désactivation',
      accept: () => {
        this.deactivateUser();
       this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
       }

  });
}


  confirmDeleteError() {
    this.message= 'Impossible de supprimer ce(s) utilisateur(s), veuillez vérifier svp : \n' +
                '- Il(s) est/sont  désactivé(s) \n' +
                '- La date de désactivation dépasse les 5 ans \n' +
                '- Il(s) est/sont réferent(s) \n';
    this.messageDisplayDialog = true;
  }

  exportAMFFunction(){   
    if(this.selectedRowsArr.length==0){
      this._UserService.sendDataToExportAMF(this.dataUsers)
      .subscribe(data => this.downloadFile(data)); 
    }
    else{
    this._UserService.sendDataToExportAMF(this.selectedRowsArr)
    .subscribe(data => this.downloadFile(data)); 
  }
  }

  downloadFile(data: Response){
    const s = data.toString().split(';');
    if(s[0]==='0'){
      let ct = s[2];
      ct = ct.replace(/^[^,]+,/, '');
      ct = ct.replace(/\s/g, '');
      const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const sliceSize = 512;
      const byteCharacters = window.atob(ct);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, {type: contentType});
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      
    } 
  }
  checkCreation(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (InsidersConstants.ROLE_ADMIN === role);

  }

  checkDelete(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (InsidersConstants.ROLE_ADMIN === role);

  }

  checkExporter(): boolean {
    const role = this.userSecurityService.getUser().role;
    return (InsidersConstants.ROLE_ADMIN === role);

  }

  SelectedRowIsActif():boolean {
    for(let sel= 0 ; sel < this.selectedRowsArr.length ; sel++ ){
      if(this.selectedRowsArr[sel].etat === false){
        return false;
        
      }
    }
    return true;
  }
  SelectedRowIsInactif():boolean{
    for(let sel= 0 ; sel < this.selectedRowsArr.length ; sel++ ){
      if(this.selectedRowsArr[sel].etat !== false){
        return false;
      }
    }
    return true;
  }

  filtrage($event) {
    const bx =document.getElementById('infinit-scroll');
    if(bx){
      bx.click();  
    }
  }

  public consultProfile(user: any) {
    this.displayWorkflow = false;
    switch (user.profil) {
      case 'Administrateur':
          this.consultAdministrateur(user);
          break;
      case 'Initié Permanent':
          this.consultInitPermanent(user);
          this.displayWorkflow = true;
          break;
      case 'Initié Occasionnel':
          this.consultInitOcca(user);
          this.displayWorkflow = true;
          break;
      case 'Correspondant':
          this.consultCorrespondant(user);
          break;
      case 'Pilote':
          this.consultPilote(user);
          break;
      case 'DIS':
          this.consultDIS(user);
          this.displayWorkflow = true;
          break;
      default:
  }

}

public editProfile() {
    switch (this.user.profil) {
      case 'Administrateur':
          this.editAdministrateur();
          break;
      case 'Initié Permanent':
        this.editInitiePermanent();
          break;
      case 'Initié Occasionnel':
          this.editInitieOcca();
          break;
      case 'Correspondant':
          this.editCorrespondant();
          break;
      case 'Pilote':
          this.editPilote();
          break;
      case 'DIS':
          this.editDIS();
          break;
      default:
  }
  this.myFormApp.disabled = true;
  this.modify = true;

}

public consultPilote(user: any) {
  this.listGroupInputs = [];
  this.user = user;
  this._UserService.getConfProfile(user.profil).subscribe(groups =>{
    this._UserService.getUserById(InsidersConstants.apiUrlGetPiloteById, user.id)
      .subscribe(userData => {
        groups.forEach(group => {
          let groupInputs =  new GroupInputs();
          groupInputs.label = group.group_label;

          group.inputs.forEach(input => {
             if (input.key === 'projet') {
               let options: {key: any, value: string}[] = [];
               let projects: any[] = []
              groupInputs.inputs.push(new MultiSelectInput({
                key: input.key+"pilote",
                label: input.label,
                order: input.order,
                value: projects,
                options: options,
                editable: true
              }));
              this._UserService.getProjetByPilote(userData).subscribe(
                 projectsList => {
                  projectsList.forEach(project => {
                       options.push({
                         key: project,
                         value: project.nom
                       });
                       projects.push(project);
                     });
                });
            } else {
              groupInputs.inputs.push(new TextBoxInput({
                key: input.key,
                label: input.label,
                type: 'text',
                order: input.order,
                value: userData[input.key],
                editable: true
              }));  
              
            }
          });
          this.listGroupInputs.push(groupInputs);
          
        });
          this.showProfil = true;
      });
  });
}

public editPilote() {
  this.listGroupInputs.forEach(group => {
    group.inputs.forEach(input => {
      if (input.key !== 'profil') {
        input.editable = false;
      }
      if (input.key === 'projetpilote') {
        this._UserService.getUnlinkedProjects().subscribe(
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
  this.addProjectDisplayDialog=this.myFormApp.myInputForm.addProjectDisplayDialog;
}

public consultInitPermanent(user: any) {
  this.listGroupInputs = [];
  this.user = user;
  this._UserService.getConfProfile('InitiePermanent').subscribe(groups =>{
    this._UserService.getUserById(InsidersConstants.apiUrlGetInitiePermanentById, user.id)
      .subscribe(userData => {
        groups.forEach(group => {
          let groupInputs =  new GroupInputs();
          groupInputs.label = group.group_label;
          group.inputs.forEach(input => {
            switch (input.key) {
              case 'condition':
                  let conditionOptions: {key: any, value: string}[] = [{key: 'Interne', value: 'Interne'}, {key: 'Externe', value: 'Externe'}];
                  groupInputs.inputs.push(new SelectBoxInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: userData[input.key],
                  options: conditionOptions,
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
                  value: userData[input.key],
                  options: raisonOptions,
                  editable: true
                  }));
                  break;
              case 'dateInscription': case 'dateSignature': case'dateFinInscription':  case 'dateNaissance':
                  let date:Date;
                  if (userData[input.key] !== null) {
                    date = new Date(userData[input.key]);
                  }
                  if (input.key === 'dateNaissance') {
                    groupInputs.inputs.push(new DateBoxInput({
                      key: input.key,
                      label: input.label,
                      type: 'date',
                      order: input.order,
                      value: date,
                      editable: true
                    }));
                  } else {
                    groupInputs.inputs.push(new TextBoxInput({
                      key: input.key,
                      label: input.label,
                      type: 'text',
                      order: input.order,
                      value: (date?date.toLocaleDateString(): null),
                      editable: true
                    }));
                  }
                  break;
              default:
                  groupInputs.inputs.push(new TextBoxInput({
                    key: input.key,
                    label: input.label,
                    type: 'text',
                    order: input.order,
                    value: userData[input.key],
                    editable: true
                  }));
                  break;
          }
          });
          this.listGroupInputs.push(groupInputs);
          
        });

        switch (userData.statutSignature) {
          case 'En attente d\'inscription' :
          this.activeIndex = 0;
          break;
          case 'En attente signature' :
          this.activeIndex = 1;
          break;
          default:
          this.activeIndex = 2;
          break;
           }
          this.showProfil = true;
      });
  });
}

public editInitiePermanent() {
  this.listGroupInputs.forEach(group => {
    group.inputs.forEach(input => {
      if (input.key !== 'profil' && input.key !== 'dateInscription'
      && input.key !== 'dateSignature' && input.key !== 'dateFinInscription') {
       input.editable = false;
     }
    });
  });
}


public consultInitOcca(user: any) {
  this.listGroupInputs = [];
  this.user = user;
  this._UserService.getConfProfile('InitieOccasionnel').subscribe(groups =>{
    this._UserService.getUserById(InsidersConstants.apiUrlGetInitieOccasionnelById, user.id)
      .subscribe(userData => {

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
                  this._UserService.getProjetsInitieOccasionnel(userData).subscribe(
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
              case 'condition':
                  let conditionOptions: {key: any, value: string}[] = [{key: 'Interne', value: 'Interne'}, {key: 'Externe', value: 'Externe'}];
                  groupInputs.inputs.push(new SelectBoxInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: userData[input.key],
                  options: conditionOptions,
                  editable: true
                  }));
                  break;
              case 'pilote':
                  let pilotesOptions: {key: any, value: string}[] = [{key: userData.pilote.id, value: userData.pilote.nom + ' ' + userData.pilote.prenom}];
                  groupInputs.inputs.push(new SelectBoxInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: userData.pilote.id,
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
                  value: userData.raison,
                  options: raisonOptions,
                  editable: true
                  }));
                  break;
              case 'dateInscription': case 'dateSignature': case'dateFinInscription':  case 'dateNaissance':
                  let date:Date;
                  if (userData[input.key] !== null) {
                    date = new Date(userData[input.key]);
                  }
                  if (input.key === 'dateNaissance') {
                    groupInputs.inputs.push(new DateBoxInput({
                      key: input.key,
                      label: input.label,
                      type: 'date',
                      order: input.order,
                      value: date,
                      editable: true
                    }));
                  } else {
                    groupInputs.inputs.push(new TextBoxInput({
                      key: input.key,
                      label: input.label,
                      type: 'text',
                      order: input.order,
                      value: (date?date.toLocaleDateString(): null),
                      editable: true
                    }));
                  }
                  break;
              default:
                  groupInputs.inputs.push(new TextBoxInput({
                    key: input.key,
                    label: input.label,
                    type: 'text',
                    order: input.order,
                    value: userData[input.key],
                    editable: true
                  }));
                  break;
          }
          });
          this.listGroupInputs.push(groupInputs);
          
        });
        switch (userData.statutSignature) {
            case 'En attente d\'inscription' :
            this.activeIndex = 0;
            break;
            case 'En attente signature' :
            this.activeIndex = 1;
            break;
            default:
            this.activeIndex = 2;
            break;
        }
          this.showProfil = true;
      });
  });
}

public editInitieOcca() {
  let idPilote;
  this.listGroupInputs.forEach(group => {
    group.inputs.forEach(input => {
      if (input.key !== 'profil' && input.key !== 'dateInscription'
       && input.key !== 'dateSignature' && input.key !== 'dateFinInscription') {
        input.editable = false;
      }
      if (input.key === 'pilote') {
        idPilote = input.value;
        this._UserService.getAllPilotes().subscribe(
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
         this._UserService.getProjetByPilote({id: idPilote}).subscribe(
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

public consultDIS(user: any) {
  this.listGroupInputs = [];
  this.user = user;
  this._UserService.getConfProfile(user.profil).subscribe(groups =>{
    this._UserService.getUserById(InsidersConstants.apiUrlGetDISById, user.id)
      .subscribe(userData => {
        groups.forEach(group => {
          let groupInputs =  new GroupInputs();
          groupInputs.label = group.group_label;

          group.inputs.forEach(input => {
             if (input.key === 'referent') {
              let referentsOptions: {key: any, value: string}[] = [{key: userData.referent.id, value: userData.referent.nom + ' ' + userData.referent.prenom}];
                  groupInputs.inputs.push(new SelectBoxInput({
                  key: input.key,
                  label: input.label,
                  order: input.order,
                  value: userData.referent.id,
                  options: referentsOptions,
                  editable: true
                  }));
            } else {
              if (input.key === 'designePar') {
                let referentsOptions: {key: any, value: string}[] = [{key: userData.designePar.id, value: userData.designePar.nom + ' ' + userData.designePar.prenom}];
                    groupInputs.inputs.push(new SelectBoxInput({
                    key: input.key,
                    label: input.label,
                    order: input.order,
                    value: userData.designePar.id,
                    options: referentsOptions,
                    editable: true
                    }));
              } else {
                groupInputs.inputs.push(new TextBoxInput({
                  key: input.key,
                  label: input.label,
                  type: 'text',
                  order: input.order,
                  value: userData[input.key],
                  editable: true
                })); 
              }
            }
          });
          this.listGroupInputs.push(groupInputs);
          
        });
            switch (userData.statutSignature) {
              case 'En attente d\'inscription' :
              this.activeIndex = 0;
              break;
              case 'En attente signature' :
              this.activeIndex = 1;
              break;
              default:
              this.activeIndex = 2;
              break;
          }
          this.showProfil = true;
      });
  });
}

public editDIS() {
  this.listGroupInputs.forEach(group => {
    group.inputs.forEach(input => {
      if (input.key !== 'profil') {
        input.editable = false;
      }
      if (input.key === 'referent') {
        this._UserService.getAllCorrespondant().subscribe(
          referents => {
           referents.forEach(referent => {
               if (referent.id !== input.value) {
                (<SelectBoxInput>input).options.push({
                  key: referent.id,
                  value: referent.nom + ' ' + referent.prenom
                });
              }
            });
          });
      }  
      if (input.key === 'designePar') {
        this._UserService.getAllInitiePermanent().subscribe(
          designePars => {
            designePars.forEach(designePar => {
               if (designePar.id !== input.value) {
                (<SelectBoxInput>input).options.push({
                  key: designePar.id,
                  value: designePar.nom + ' ' + designePar.prenom
                });
              }
            });
          });
      }       
 
    });
  });
}


public consultCorrespondant(user: any) {
  this.listGroupInputs = [];
  this.user = user;
  this._UserService.getConfProfile(user.profil).subscribe(groups =>{
    this._UserService.getUserById(InsidersConstants.apiUrlGetCorrespondantById, user.id)
      .subscribe(userData => {
        groups.forEach(group => {
          let groupInputs =  new GroupInputs();
          groupInputs.label = group.group_label;

          group.inputs.forEach(input => {
              if (input.key === 'comex') {
                let comexOptions: {key: any, value: string}[] = [{key: userData.comex.id, value: userData.comex.nom + ' ' + userData.comex.prenom}];
                    groupInputs.inputs.push(new SelectBoxInput({
                    key: input.key,
                    label: input.label,
                    order: input.order,
                    value: userData.comex.id,
                    options: comexOptions,
                    editable: true
                    }));
              } else {
                groupInputs.inputs.push(new TextBoxInput({
                  key: input.key,
                  label: input.label,
                  type: 'text',
                  order: input.order,
                  value: userData[input.key],
                  editable: true
                })); 
              }
          });
          this.listGroupInputs.push(groupInputs);
          
        });
          this.showProfil = true;
      });
  });
}

public editCorrespondant() {
  this.listGroupInputs.forEach(group => {
    group.inputs.forEach(input => {
      if (input.key !== 'profil') {
        input.editable = false;
      }
      if (input.key === 'comex') {
        this._UserService.getAllInitiePermanent().subscribe(
          comexs => {
            comexs.forEach(comex => {
               if (comex.id !== input.value) {
                (<SelectBoxInput>input).options.push({
                  key: comex.id,
                  value: comex.nom + ' ' + comex.prenom
                });
              }
            });
          });
      }  
    });
  });
}

public consultAdministrateur(user: any) {
  this.listGroupInputs = [];
  this.user = user;
  this._UserService.getConfProfile(user.profil).subscribe(groups =>{
    this._UserService.getUserById(InsidersConstants.apiUrlGetAdministrateurById, user.id)
      .subscribe(userData => {
        groups.forEach(group => {
          let groupInputs =  new GroupInputs();
          groupInputs.label = group.group_label;

          group.inputs.forEach(input => {
                groupInputs.inputs.push(new TextBoxInput({
                  key: input.key,
                  label: input.label,
                  type: 'text',
                  order: input.order,
                  value: userData[input.key],
                  editable: true
                })); 
          });
          this.listGroupInputs.push(groupInputs);
          
        });
          this.showProfil = true;
      });
  });
}

public editAdministrateur() {
  this.listGroupInputs.forEach(group => {
    group.inputs.forEach(input => {
      if (input.key !== 'profil') {
        input.editable = false;
      }
    });
  });
}

public onformChanged(event) {

    let  input: InputBase<any>;
    this.listGroupInputs.forEach(group => {
      if (group.inputs.find(input => input.key === 'projet')) {
        input = group.inputs.find(input => input.key === 'projet');
      }
    });

    this._UserService.getProjetByPilote({id: event.value}).subscribe(
      projects => {
        (<MultiSelectInput>input).options = [];
        (<MultiSelectInput>input).value = [];
        projects.forEach(project => {
          (<MultiSelectInput>input).options.push({
            key: project,
            value: project.nom
          });
        });
      });

  }
  public onShowPopup(event){
   this.addProjectDisplayDialog=true;
  }

  public onSubmit(event) {
    let self=this;
    this._confirmationService.confirm({
      message: 'Souhaitez-vous enregistrer les modifications effectuées ?',
      icon: 'fa fa-pencil ',
      header: 'Confirmation de modifications',
      accept: () => {
        /*************************************************/
    let user: NewUser;
    let urlUpdate: string;

        switch (event.profil) {
          case 'Administrateur':
              user = <NewUser>event;
              user.id = this.user.id;
              urlUpdate = InsidersConstants.apiUrlUpdateAdministrateur;
              this.updateUser(urlUpdate, user);
              break;
          case 'Initié Permanent':
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
              user = <NewUser>event;
              user.id = this.user.id;
              urlUpdate = InsidersConstants.apiUrlUpdateInitiePermanent;
              this.updateUser(urlUpdate, user);
              break;
          case 'Initié Occasionnel':
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
              this._UserService.getUserById(InsidersConstants.apiUrlGetPiloteById, event.pilote)
              .subscribe(pilote => {
                  //delete event.pilote;
                  delete event.dateInscription;
                  // delete event.dateNaissance;
                  // delete event.dateSignature
                  event.pilote = pilote;
                  // delete event.projet;
                  //event.projets = event.projet;
                  //delete event.projet;
                  user = <NewUser>event;
                  user.id = this.user.id;
                  user.projets=event.projet;

                   this.newProjects = user.projets.filter(newProjet => {
                     return (this.oldProjects.find(oldProjet=> oldProjet.id === newProjet.id)?false:true)
                   });

                  urlUpdate = InsidersConstants.apiUrlUpdateInitieOccasionnel;
                  this._UserService.updateUser(urlUpdate, user)
                  .subscribe(updatedUser => {
                    this._UserService.addProjetsToInitOcca(user.projets, updatedUser).subscribe(
                      resp => {
                        if(this.newProjects!==null)
                        {
                          this._UserService.sendMailOccas(user,this.newProjects).subscribe();
                          user.statutSignature="En attente signature";
                        }

                      });
              
                      const mail = {
                        objet:  'Profil modifié',
                        corps:  this.generateUpdateMail(),
                        mailDestinataire: updatedUser.adresseMail
                        };
                        this._UserService.sendSimpleMail(mail).subscribe(
                          mail => {
                            this.showProfil = false;
                            this.updateSucces = true;
                            this.updateUserDisplay = true;
                            this.modify = false;
                          });
                        
                  });
              });
              break;
          case 'Correspondant':
              this._UserService.getUserById(InsidersConstants.apiUrlGetInitiePermanentById, event.comex)
                .subscribe(comex => {
                    event.comex = comex;
                    user = <NewUser>event;
                    user.id = this.user.id;
                    urlUpdate = InsidersConstants.apiUrlUpdateCorrespondant;
                    this.updateUser(urlUpdate, user);
                });
              break;
          case 'Pilote':
                event.projets = event.projet;
                delete event.projet;
                user = <NewUser>event;
                user.projets=self.myFormApp.form.value.projetpilote;
                user.id = this.user.id;
                urlUpdate = InsidersConstants.apiUrlUpdatePilote;
                this._UserService.updateUser(urlUpdate, user)
                .subscribe(updatedUser => {
                    this._UserService.linkProjectsToPilotes(user.projets, user)
                    .subscribe(resp => {
                   });
                   const mail = {
                    objet:  'Profil modifié',
                    corps:  this.generateUpdateMail(),
                    mailDestinataire: updatedUser.adresseMail
                    };
                    this._UserService.sendSimpleMail(mail).subscribe(
                      mail => {
                        this.showProfil = false;
                        this.updateSucces = true;
                        this.updateUserDisplay = true;
                        this.modify = false;
                      });
                });
              break;
          case 'DIS':
                this._UserService.getUserById(InsidersConstants.apiUrlGetCorrespondantById, event.referent)
                .subscribe(referent => {
                    event.referent = referent;
                    this._UserService.getUserById(InsidersConstants.apiUrlGetInitiePermanentById, event.designePar)
                    .subscribe(designePar => {
                        event.designePar = designePar;
                        user = <NewUser>event;
                        user.id = this.user.id;
                        urlUpdate = InsidersConstants.apiUrlUpdateDIS;
                        this.updateUser(urlUpdate, user);
                    });
                });
              break;
          default:
      }
        /************************************************/

      },
      reject: () => {
     
        }

  });   
  this.selectedRowsArr=[]; 
  }

  public updateUser(urlUpdate: string, user: NewUser) {
      this._UserService.updateUser(urlUpdate, user)
      .subscribe(
        updatedUser => {
          const mail = {
                        objet:  'Profil modifié',
                        corps:  this.generateUpdateMail(),
                        mailDestinataire: updatedUser.adresseMail
          };
          this._UserService.sendSimpleMail(mail).subscribe(
            mail => {
              this.showProfil = false;
              this.updateSucces = true;
              this.updateUserDisplay = true;
              this.modify = false;
            });

      },
      err => {
        this.updateSucces = false;
      }
    );
  }

  callChild() {
    this.myFormApp.onSubmit();
  }

  onValid(event) {
    this.disabled = event;
  }
  
  updateTable()  {
    this.updateUserDisplay = false;
    this.data = [];
    this.dataUsers = [];
    this.getAllUsers();
  }

  generateUpdateMail(): string {
    let listOfInputs = this.myFormApp.changedInputs;
    if(listOfInputs[0].input === 'dateNaissance') {
      listOfInputs = listOfInputs.slice(1);
    }
    const listOfInputs2 = listOfInputs.filter(function duplicate(input, index, list) {
      return index === list.findIndex(elem => elem.input ===  input.input);
    });
    let htmlUpdatedInputs = '<ul>';
    listOfInputs2.forEach(input => {
      htmlUpdatedInputs +=  '<li>' + input.label + '</i>';
    });
    htmlUpdatedInputs += '</ul>';
    let mailEncoded = '<div style="font-family: Arial; font-size: 13px;">' +
    'Bonjour,' + 
    '<br/><br/>' +
    'Les données que vous avez communiquées via l\'application INSIDERS ont été modifiées par votre administrateur.' +
    '<br/><br/>' +
    'Les informations modifiées sont :' +
    htmlUpdatedInputs +
    '<br/>Vous avez la possibilité de consulter ces modifications en vous connectant à l\'application INSIDERS.' +
    '<br/><br/>Cordialement.' +
    '<br/><br/>Votre administrateur.' +
    '</div>';

    mailEncoded = this._coreService.encodeText(mailEncoded);

    return mailEncoded;

  }

  cancelUpdate() {
    this.modify = false;
    this.showProfil = false;
    this.consultProfile(this.selectedRowsArr[0]);

  }

  public pushmail() {
    let mailList = [];
    let mailAdresses = '';
    
    this.selectedRowsArr.forEach(user => {
      mailList.push(user.adresseMail);
    });
    
    mailList = mailList.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });

    mailList.forEach(mail => {
      mailAdresses += mail + ';';
    });

    location.href =
    "mailto:" +
    mailAdresses +
    "?subject=" +
    '';
  }

  public checkUserInProgress() {
    let founded = true;
    this.selectedRowsArr.forEach(user => {
      if ((user.statutSignature !== 'En attente d\'inscription' && user.statutSignature !== 'En attente d\'inscription')
          || (user.profil !== 'Initié Occasionnel' && user.profil !== 'Initié Permanent')) {
        founded = false
      }
    });

    return  founded;
  }

  public async deleteUserInProgress(user: any) {
              return await this._UserService.deleteInitie(
                (user.profil === 'Initié Occasionnel' ? 
                InsidersConstants.apriUrlDeleteInitieOccasionnel:InsidersConstants.apriUrlDeleteInitiePermanent), user)
                .toPromise();
  }

  public async deleteUsersInProgress() {
    const users = this.selectedRowsArr;
    const listDeletedUsers = '';
    this.notDeletedUsers = [];
    this.deleteInProgressUsers = false; 
    for (let i=0; i< users.length; i++) {
      const deletedUserResponse = await this.deleteUserInProgress(users[i]);
      if (!deletedUserResponse) {
          this.notDeletedUsers.push(users[i]);
      }
    }

    if(this.notDeletedUsers.length>0) {
      this.listNotDeletedUsers = '<ul>';
      this.notDeletedUsers.forEach(user => {
        this.listNotDeletedUsers += '<li>' + user.nom + ' ' +  user.prenom  + '</li>';
      });
      this.deleteDialog = true;
    }
    this.updateTable();
    this.selectedRowsArr = this.notDeletedUsers;
    
  }

  public confirmDeleteUserInProgress() {

    this.deleteInProgressUsers = true;
    this.deleteUsersMsg =  'Voulez-vous supprimer '+ (this.selectedRowsArr.length>1? 'ces utilisateurs': 'cet utilisateur')+' ?';
           
  }

  showProjectDisplayDialog(){
    this.addProjectDisplayDialog=true;;
  }
  addProject(projetName){
    projetName=projetName.toLocaleUpperCase();
    this.projetInexistant=false;
    if(projetName.length<4 || projetName.length>20){
      this.creationProjetError='Veuillez introduire une chaine de caractère de longeur entre 4 et 22';
      this.projetInexistant=true;
    }
    else{
    this._UserService.addProject(projetName) .
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
        this.listGroupInputs.forEach(group => {
          group.inputs.forEach(input => {
              if(input.key=="projetpilote"){
                let key={id:response.id,nom:response.nom};
                let value=response.nom;
                (<MultiSelectInput>input).options.push({key,value});
                input.value=[key];
              }
          })});
        this.myFormApp.form.value.projetpilote.push({id:response.id,nom:response.nom});
        this.myFormApp.disabled = false;
        this.myFormApp.changedInputs.push({group: "Infos Pilote", input: "projetpilote", label: "Projets"}) ;
        this.projetInexistant=false;
        this.addProjectDisplayDialog=false;
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

}