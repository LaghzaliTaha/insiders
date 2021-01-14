import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { ScrollEvent } from 'ngx-scroll-event';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { CoreService } from '../../core/services/core.service';
import { UserSecurityService } from '../user-security.service';
import { GroupInputs } from '../../shared/forms/models/group-inputs';
import { InsidersConstants } from '../../core/insiders-constants';
import { SelectBoxInput } from '../../shared/forms/models/select-box-input';
import { TextBoxInput } from '../../shared/forms/models/text-box-input';
import { DynamicFormComponent } from '../../shared/forms/components/dynamic-form/dynamic-form.component';
import { NewUser } from '../interfaces/new-user.model';


@Component({
  selector: 'app-maj-liste-correspondant',
  templateUrl: './maj-liste-correspondant.component.html',
  styleUrls: ['./maj-liste-correspondant.component.scss']
})
export class MajListeCorrespondantComponent implements OnInit {

  @ViewChild(DynamicFormComponent)
      myFormApp: DynamicFormComponent;

  dataDIS = [];
  dataSourceDIS = [];
  selectedRows = [];
  loading = false;
  statutsSignature: SelectItem[] = [];
  etats: SelectItem[] = [];
  showInfinitScroll: boolean;
  selectedRowsArrNumber: number;
  selectedselectedRowsArrArr= [];
  totalRecords:number;
  listGroupInputs: GroupInputs[] = [];
  user: any;
  showProfil = false;
  disabled = false;
  modify = false;
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
      designePar: string
   }
  }[];
  modificationList = [];
  oldValue: any;
  confirmationDialog = false;
  message: string;
  confirmationSubmit = false;
  
  

  constructor(private _router: Router,
            private _UserService: UserService,
            private _coreService: CoreService,
            private  _userSecurityService: UserSecurityService,
            private _confirmationService: ConfirmationService) { }


  ngOnInit() {

    this._coreService.setcurrentPos('Utilisateurs / Mettre à jour la liste de DIS');
    this._coreService.setCurrentClass('listes');

      this.getDataDIS();

      this.etats.push({label: 'Selectionner', value: null});
      this.etats.push({label: 'Actif', value: true});
      this.etats.push({label: 'Inactif', value: false});

      this.statutsSignature.push({label: 'Selectionner', value: null});
      this.statutsSignature.push({label: 'En attente inscription', value: 'En attente inscription'});
      this.statutsSignature.push({label: 'En attente signature', value: 'En attente signature'});
      this.statutsSignature.push({label: 'Finalisé', value: 'Finalisé'});
  }

  getDataDIS() {
    const connectedCorresp = this._userSecurityService.getUser();
    this._UserService.getDisByConnectedCorresp(connectedCorresp).subscribe(listDIS => {

      this.dataSourceDIS = listDIS;
      this.fillRowsColors(this.dataSourceDIS);
      this._UserService.getCorrespByEmail(this._userSecurityService.getUser().email)
        .subscribe(currentCorrep => {

          this._UserService.getModificationsByReferent(currentCorrep)
            .subscribe(listModfifications => {

                listModfifications.forEach(modification => {
                  const rowDIS = this.dataSourceDIS.find(dis => dis.id === modification.initie.id);
                  rowDIS[modification.attributModified] = modification.newValue;
                  let rowColumnsColors = this.rowsColumnsColores.find(rowColumns => rowColumns.row.id === rowDIS.id);
                  rowColumnsColors.row = rowDIS;
                  rowColumnsColors.columns[modification.attributModified] = (modification.validated? 'limeGreen' : 'red');
                });

                
                this.totalRecords = this.dataSourceDIS.length;
                this.dataDIS = this.dataSourceDIS.slice(0, (this.dataDIS.length === 0 ? 20 :  this.dataDIS.length)) ;
        
                if ((this.dataSourceDIS.length - this.dataDIS.length) < 20 ) {
                  if ((this.dataSourceDIS.length - this.dataDIS.length) === 0) {
                    this.showInfinitScroll = false;
                  } else {
                    this.showInfinitScroll = true;
                  }
                  this.selectedRowsArrNumber = this.dataSourceDIS.length - this.dataDIS.length;
                } else {
                  this.selectedRowsArrNumber = 20;
                  this.showInfinitScroll = true;
                }

            });

        });

    });
  }

  fillRowsColors(listDIS: any[]) {
    this.rowsColumnsColores = [];
    listDIS.forEach(row => {
        this.rowsColumnsColores.push({
          row: row,
          columns: {
              nom: 'black',
              prenom: 'black',
              fonction: 'black',
              referent: 'black',
              adresseMail: 'black',
              numeroMobile: 'black',
              designePar: 'black'
          }
        });
    });
  }

  getRowColumnColor(row:any, column: string) {
     return this.rowsColumnsColores.find(rowColumns => rowColumns.row.id === row.id).columns[column];
  }

  loadMore() {

    this.dataDIS=  this.dataSourceDIS.slice(0,  this.dataDIS.length + 20);
    if  ((this.dataSourceDIS.length - this.dataDIS.length) < 20 ) {
    this.selectedRowsArrNumber =  this.dataSourceDIS.length - this.dataDIS.length;
    if  ((this.dataSourceDIS.length - this.dataDIS.length) === 0) {
    this.showInfinitScroll =  false;
    } else {
    this.showInfinitScroll =  true;
    }
    } else {
    this.selectedRowsArrNumber =  20;
    this.showInfinitScroll =  true;
    }
  }

  handleScroll(event) {

    if (event.isReachingBottom) {
      this.loadMore();
      event.isReachingBottom = false;
    }
  }

  public consultDIS(user: any) {
    this.listGroupInputs = [];
    this.user = user;
    this._UserService.getConfProfile(user.profil).subscribe(groups =>{
          this.oldValue = Object.assign({}, user);
          groups.forEach(group => {
            let groupInputs =  new GroupInputs();
            groupInputs.label = group.group_label;
  
            group.inputs.forEach(input => {
               if (input.key === 'referent') {
                let referentsOptions: {key: any, value: string}[] = [{key: user.referent.id, value: user.referent.nom + ' ' + user.referent.prenom}];
                    groupInputs.inputs.push(new SelectBoxInput({
                    key: input.key,
                    label: input.label,
                    order: input.order,
                    value: user.referent.id,
                    options: referentsOptions,
                    editable: true
                    }));
              } else {
                if (input.key === 'designePar') {
                  let referentsOptions: {key: any, value: string}[] = [{key: user.designePar.id, value: user.designePar.nom + ' ' + user.designePar.prenom}];
                      groupInputs.inputs.push(new SelectBoxInput({
                      key: input.key,
                      label: input.label,
                      order: input.order,
                      value: user.designePar.id,
                      options: referentsOptions,
                      editable: true
                      }));
                } else {
                  groupInputs.inputs.push(new TextBoxInput({
                    key: input.key,
                    label: input.label,
                    type: 'text',
                    order: input.order,
                    value: user[input.key],
                    editable: true
                  })); 
                }
              }
            });
            this.listGroupInputs.push(groupInputs);
            
          });
            this.showProfil = true;

            this.editDIS();

            setTimeout(()=>{   
              this.modify = true;
              this.myFormApp.disabled = true;           
            }, 300);
           
            
    });
  }
  
  public editDIS() {
    this.listGroupInputs.forEach(group => {
      group.inputs.forEach(input => {
        if (input.key !== 'profil' && input.key !== 'referent') {
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

  public onValid(event) {
    this.disabled = event;
  }

  public onSubmit(event) {
    const user = event;
    this._UserService.getUserById(InsidersConstants.apiUrlGetCorrespondantById, user.referent)
    .subscribe(referent => {
        user.referent = referent;
        this._UserService.getUserById(InsidersConstants.apiUrlGetInitiePermanentById, user.designePar)
        .subscribe(designePar => {
            user.designePar = designePar;
            user.id = this.user.id;
            this.preDISList = this.preDISList.filter(preUser => user.id !== preUser.id);
            this.preDISList.push(user);
            this.showProfil = false;
            this.modify = false
            this.updateTable(user);
            //this.rowsColumnsColores[1].columns['nom'] = 'green';
        });
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

  updateTable(row: any) {
    const listOfInputs = this.getUpdatedInputs();
    const currentRow = this.rowsColumnsColores.find(rowColumns => rowColumns.row.id === row.id);
    let users = [...this.dataDIS];
    const currentUser = users[this.dataDIS.indexOf(this.user)];
    
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
          modification.typeAttribut = 'Correspondant';
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
          modification.lastValue = this.oldValue[input.input].toString();
          modification.newValue = row[input.input].toString();
          break;
      }

      this.modificationList.push(modification);

    });
    
    this.dataDIS = users;
  }

  public submitModifications() {
    this.confirmationDialog = false;
    this.confirmationSubmit = false;
    this._UserService.getCorrespByEmail(this._userSecurityService.getUser().email)
      .subscribe(corresp => {
        this._UserService.setModification(corresp, this.modificationList)
          .subscribe(modifications => {
            this.modificationList = [];
            this.confirmationDialog = true;
            this.message = "La mise à jour a été sousmis à l'administrateur";
            this.confirmationSubmit = true; 
          });
      });
  }

  public confirmModification() {
    this.confirmationDialog = true;
    this.message = "Voulez-vous soumettre la mise à jour à l'administrateur ?";
    this.confirmationSubmit = false;
  }

  deactivateListDIS() {
      this._confirmationService.confirm({
        message: 'Souhaitez-vous désactiver l(es) utilisateur(s) sélectionné(s)?',
        icon: 'fa fa-ban',
        header: 'Confirmation de suppression',
        accept: () => {
          this._UserService.deactivateDIS(this.selectedRows).subscribe(response =>{
            let users = this.selectedRows;
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

  activateListDIS() {
    this._confirmationService.confirm({
      message: 'Souhaitez-vous activer l(es) utilisateur(s) sélectionné(s)?',
      icon: 'fa fa-ban',
      header: 'Confirmation de suppression',
      accept: () => {
        this._UserService.activateDIS(this.selectedRows).subscribe(response =>{
            let users = this.selectedRows;
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

  activateOneDIS(user: any) {
    const users = [];
    users.push(user);
  
    this._confirmationService.confirm({
      message: 'Souhaitez-vous activer cet utilisateur?',
      icon: 'fa fa-ban',
      header: 'Confirmation de la désactivation',
      accept: () => {
        this._UserService.activateDIS(users).subscribe(response =>{
          user.etat = true;
          this.updateUser(user);
        });
      },
      reject: () => {

        },

  });
  }

  deactivateOneDIS(user: any) {  
    const users = [];
    users.push(user);
    
    this._confirmationService.confirm({
      message: 'Souhaitez-vous désactiver cet utilisateur?',
      icon: 'fa fa-ban',
      header: 'Confirmation de la désactivation',
      accept: () => {
        this._UserService.deactivateDIS(users).subscribe(response =>{
          user.etat = false;
          this.updateUser(user);
        });
      },
      reject: () => {

      },

  });
  }

  updateUser(user: any){
    let users = [...this.dataDIS];
    let currentUser = users[this.dataDIS.indexOf(this.user)];

    currentUser = user;
    this.dataDIS = users;
  }

}
