import { Component, OnInit,ViewChild } from '@angular/core';
import { SelectItem, ConfirmationService,ConfirmDialogModule } from 'primeng/primeng';

import { ReferentsService } from '../../Services/referents.service';
import { User } from '../../Interfaces/user.model';
import { ScrollEvent } from 'ngx-scroll-event';
import { CoreService } from '../../../core/services/core.service';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';
import { Row } from 'primeng/primeng';
import { UserService } from '../../../users/users.service';
 
import { GroupInputs } from '../../../shared/forms/models/group-inputs';
import { SelectBoxInput } from '../../../shared/forms/models/select-box-input';
import { TextBoxInput } from '../../../shared/forms/models/text-box-input';
import { DynamicFormComponent } from '../../../shared/forms/components/dynamic-form/dynamic-form.component';
 
import { UserSecurityService } from '../../../users/user-security.service';
import { InsidersConstants } from '../../../core/insiders-constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ListInitie } from '../../Interfaces/list-Initie.model';






@Component({
  selector: 'app-list-dis',
  templateUrl: './list-dis.component.html',
  styleUrls: ['./list-dis.component.scss']
})
export class ListDisComponent implements OnInit {
  

  @ViewChild(DynamicFormComponent)
  myFormApp: DynamicFormComponent;

  tabChanges: any[];
  allModifications:any[];
  dateChange: any;
  idModification:number;
  oldDataTable: any[];
  data: any[];
    dataDIS = [];
    dataSourceDIS = [];
    dataFromModification:ListInitie;
    selectedRows = [];

    loading = false;
    rows = [];
    overlayPanelContent:Row;
    display = false;


    constructor(private _router: Router,private route: ActivatedRoute,private _referentsService: ReferentsService,
      private _coreService: CoreService,private _UserService: UserService,
      private  _userSecurityService: UserSecurityService) { }
  
    totalRecords: number;
    rowsNumber: number;
    showInfinitScroll: boolean;
    selectedRowsArrNumber: number;
    selectedRowsArr = [];
    sortF = 'nom';
    etats: SelectItem[] = [];
    etat: SelectItem[];
    condition: SelectItem[];
    statutsSignature: SelectItem[] = [];
    user: any;
    showProfil = false;
    showInfoGlob=false;
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
    profil: SelectItem[];
    message: string;
    idParam:number;
    profilParam:string;
    nomInitie:string;
    oldValues=[];
    oldValue: any;
    notifMessage:string;
    listGroupInputs: GroupInputs[] = [];
    dataUsers=[];
    

    confirmationDialog = false;
    confirmationSubmit = false;
 
    ngOnInit() {
   
 
      this.loading = true;
      
      this.getDataDIS();

      this.etats.push({label: 'Selectionner', value: null});
      this.etats.push({label: 'Actif', value: true});
      this.etats.push({label: 'Inactif', value: false});

      this.statutsSignature.push({label: 'Selectionner', value: null});
      this.statutsSignature.push({label: 'En attente inscription', value: 'En attente inscription'});
      this.statutsSignature.push({label: 'En attente signature', value: 'En attente signature'});
      this.statutsSignature.push({label: 'Finalisé', value: 'Finalisé'});

      this._coreService.setcurrentPos('Liste des DIS - '+this._referentsService.nomInit);
      this._coreService.setCurrentClass('listes');
      
      if(this._referentsService.idRef){
        this.getAllusersByRef(this._referentsService.idRef);
      }else{
        this._router.navigate([InsidersConstants.ROUTE_REFERENTS]);
      }
      this._referentsService.getDisByCorrespondant(this._referentsService.idRef).subscribe(listUsers => {
        this.oldDataTable= listUsers;
      })
    }
  getDataDIS() {
    const connectedCorresp = this._userSecurityService.getUser();
    this._referentsService.getDisByCorrespondant(this._referentsService.idRef).subscribe(listDIS => {
      this.dataSourceDIS = listDIS;

      this.fillRowsColors(this.dataSourceDIS);
      this._UserService.getCorrespByEmail(this._userSecurityService.getUser().email)
        .subscribe(currentCorrep => {

          this._UserService.getModificationsByReferent(currentCorrep)
            .subscribe(listModfifications => {
              this.allModifications=listModfifications;
                listModfifications.forEach(modification => {
                  const rowDIS = this.dataSourceDIS.find(dis => dis.id === modification.initie.id);
                  rowDIS[modification.attributModified] = modification.newValue;
                  const rowColumnsColors = this.rowsColumnsColores.find(rowColumns => rowColumns.row.id === rowDIS.id);
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
                this.tabChanges=listModfifications;
 
            },()=>{},()=>{
              this.loading = false;
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

  findIdChangedVal(row:any, column: string){
    
    for (let index = 0; index < this.tabChanges.length; index++) {
      if(row.id === this.tabChanges[index].initie.id && this.tabChanges[index].attributModified===column){
        return this.tabChanges[index].id;
      }
    }
    
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
            const groupInputs =  new GroupInputs();
            groupInputs.label = group.group_label;
  
            group.inputs.forEach(input => {
               if (input.key === 'referent') {
                const referentsOptions: {key: any, value: string}[] = [{key: user.referent.id, value: user.referent.nom + ' ' + user.referent.prenom}];
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
                  const referentsOptions: {key: any, value: string}[] = [{key: user.designePar.id, value: user.designePar.nom + ' ' + user.designePar.prenom}];
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
    this._UserService.getPiloteByEMail(this._userSecurityService.getUser().email)
      .subscribe(corresp => {
        let ids=[];
        for(let i=0 ; i<this.allModifications.length ; i++){
          ids.push(this.allModifications[i].id);
        }
        this._UserService.validateAll(corresp,ids)
          .subscribe(modifications => {
            this.confirmationDialog = true;
            this.message = "La mise à jour a été sousmis à l'administrateur";
            this.confirmationSubmit = true;
            this.getDataDIS();
          })
      });
  }

  public confirmModification() {
    this.confirmationDialog = true;
    this.message = "Voulez-vous soumettre la mise à jour à l'administrateur ?";
    this.confirmationSubmit = false;
  }



  updateUser(user: any){
    let users = [...this.dataDIS];
    this.dataDIS = users;
  }
  public getAllusersByRef(id) {

    // this._referentsService.getDisByCorrespondant(id)
    // .subscribe(data => {

    //   this.dataUsers = this.dataUsers.concat(data);

    //   this.totalRecords = this.dataUsers.length;
    //   this.data = this.dataUsers.slice(0, (this.data.length === 0 ? 20 :  this.data.length)) ;
    //   if ((this.dataUsers.length - this.data.length) < 20 ) {
    //     if ((this.dataUsers.length - this.data.length) === 0) {
    //       this.showInfinitScroll = false;
    //     } else {
    //       this.showInfinitScroll = true;
    //     }
    //     this.selectedRowsArrNumber = this.dataUsers.length - this.data.length;
    //   } else {
    //     this.selectedRowsArrNumber = 20;
    //     this.showInfinitScroll = true;
    //   }
    //   this.loadChanges(this.data);
      
  
    
      
    // },()=>{},()=>{
    // })

  }

  public showInfo(row: any) {
  }

  public showOverlay(event,fieldValue,dateChange,color,idModification, overlaypanel: OverlayPanel) {
      if(color==='red'){
        this.overlayPanelContent=fieldValue;
        this.oldValues=fieldValue;
        this.dateChange=dateChange;
        this.idModification=idModification;
        overlaypanel.show(event);           
      }
  }

  getOldVal(id){
    for (let index = 0; index < this.oldDataTable.length; index++) {
      if(this.oldDataTable[index].id===id){
        return this.oldDataTable[index];
      }
      
    }
  }

    
  public validateColumn(idModif){
    this.loading = true;
    
    this._referentsService.validateSinglColumn(idModif).subscribe(()=> {
      
    },()=>{},()=>{
      // this.showInfoGlob = true;
      // this.message = "La valeur validée";
      this.getDataDIS();
      this.display = true;
      this.showDialogSaveColumn();
    })
  }    
  public ignoreColumn(idModif){
    this.loading = true;
    
    this._referentsService.ignoreSinglColumn(idModif).subscribe(()=> {
    },()=>{},()=>{
      // this.showInfoGlob = true;
      // this.message = "La valeur validée";
      this.getDataDIS();
      this.display = true;
      
    })
    this.showDialogForgetColumn();
     
  }
 
  public validateRow(row){
    this.loading = true;
    for (let index = 0; index < this.tabChanges.length; index++) {
      if(row.id === this.tabChanges[index].initie.id){
        this._referentsService.validateSinglColumn(this.tabChanges[index].id).subscribe(()=> {

        }) 
      }

      // check if is the last item in array
      if (index === this.tabChanges.length-1 ) {
        this.getDataDIS();
      }
    }
    this.display = true;
    
  }
      
  public forgetRow(row){
    this.loading = true;
 
    for (let index = 0; index < this.tabChanges.length; index++) {
      if(row.id === this.tabChanges[index].initie.id){
        this._referentsService.ignoreSinglColumn(this.tabChanges[index].id).subscribe(()=> {
        }) 
      }
      if(index=== this.tabChanges.length-1) { 
        this.getDataDIS();
      }
    }
    this.display = true;
    
  }

  public showDialogSaveRow(row) {
      this.display = true;
      this.validateRow(row);
  }
  
  public showDialogForgetRow(row) {
    this.display = true;
    this.forgetRow(row);
  }

  public showDialogSaveColumn(){
    this.display = true;
    
  }
  public showDialogForgetColumn(){
    this.display = true;
    
  }
 

  public sendNotif(){
    // this.notifMessage;
  }
}
