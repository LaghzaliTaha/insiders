import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CoreService } from '../../../core/services/core.service';
import { PeriodeService } from '../../Service/periode.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Periode } from '../../Interface/periode.model';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { NotifiedUsers } from '../../Interface/notifiedUsers.model';

@Component({
  selector: 'app-show-period',
  templateUrl: './show-period.component.html',
  styleUrls: ['./show-period.component.scss']
})
export class ShowPeriodComponent implements OnInit {
  // static var 
  typePeriodeList= ["", "Intéressement/Participation","Trimestre 1","Trimestre 2","Trimestre 3","Trimestre 4"]
  statusListStep = [
    {"label" : "Periode définie" },
    {"label" : "Periode notifiée" },
    {"label" : "Periode relancée" },
    {"label" : "Periode terminée" },
]
  notifiedUsersList: NotifiedUsers[];
  
  // manipulation var
  disabledForm:boolean; // activation et desactivation de modification
  btnNameBack:string;
  selectedId:string;
  
  //component var
  periode:Periode;
  periodMAJForm:FormGroup;

  // popup var : 
  majPeriodDisplayDialog:boolean;
  messageDisplayDialog:boolean;
  message:string;
  errorMessage:string;
  showErrorMessage:boolean;
  updated:boolean;
   
  constructor(private formBuilder: FormBuilder, private _coreService: CoreService,
    private _periodeService: PeriodeService,
  private _router:Router,private route: ActivatedRoute ) { }

  ngOnInit() {
    //***** Initialisation : 
    this.disabledForm = true; // activation et desactivation de modification
    this.btnNameBack="Retour";
    this.updated= false;
    this.notifiedUsersList = [];
    this._coreService.setCurrentClass('periodes');

    this.periode = {
      id: "",
      nomPeriode: "",
      typePeriode: "",
      status: "",
      dateDebut: new Date(),
      dateFin: new Date(),
      dateNotif: new Date(),
      dateDebutPlacement: new Date(),
      dateFinPlacement: new Date()
    }
    
    this.periodMAJForm = this.formBuilder.group({
      'nomPeriode': ['', Validators.required ],
      'typePeriode': ['', Validators.required ],
      'dateDebut': ['', [Validators.compose([Validators.required]), this.allowedDateDebutValidator] ],
      'dateFin': ['', [Validators.compose([Validators.required])] ],
      'dateDebutPlac': ['', [Validators.compose([Validators.required]), this.allowedDateDebutValidator] ],
      'dateFinPlac': ['', Validators.compose([Validators.required]) ]
    })
    this.selectedId  = this.route.snapshot.paramMap.get('id');
    this.getPeriodeFromService(); // Récupération des données
    //***** FIN Initialisation
  }

  toUpdatePeriod(){
    this.majPeriodDisplayDialog = true;
  }

  activateModification(){
    this.disabledForm = false;
    this.periodMAJForm.controls['nomPeriode'].enable();
    this.periodMAJForm.controls['typePeriode'].enable();
    this.periodMAJForm.controls['dateDebut'].enable();
    this.periodMAJForm.controls['dateFin'].enable();
    this.periodMAJForm.controls['dateDebutPlac'].enable();
    this.periodMAJForm.controls['dateFinPlac'].enable();
    this.btnNameBack = "Annuler";
  }

  send(){
    this.majPeriodDisplayDialog = false;
    this._periodeService.updateOnePeriode(this.periode)
    .catch((res)=>{
          this.message = ' Une erreur est survenue lors de la modification de la période';
          this.messageDisplayDialog = true;
          this.updated = false;
          this.errorMessage =  res.error.toString();
          this.showErrorMessage = true;
      return this._coreService.handleError(res);})
    .subscribe(res => {
      this.updated = true;
      this.disabledForm = true;
      this.btnNameBack = "Retour";
      this.getPeriodeFromService();
    });
  }

  cancel(){
    this.majPeriodDisplayDialog = false;
  }

  majFormControl(){
    return this.periodMAJForm.get('nomPeriode').invalid ||
      this.periodMAJForm.get('typePeriode').invalid ||
      this.periodMAJForm.get('dateDebut').invalid ||
      this.periodMAJForm.get('dateFin').invalid ||
      this.allowedDateFin() ||
      this.allowedDateFinPlac() ||
      this.periodMAJForm.get('dateDebutPlac').invalid ||
      this.periodMAJForm.get('dateFinPlac').invalid
  }

  backAction(){
    if(this.disabledForm){
      this._router.navigate(['/angular/periodes']);
    }else{
      this.disabledForm = true;
      this.btnNameBack = "Retour";
      // Réinitialisation des données : 
      this.getPeriodeFromService();
    }
  }

  allowedDateDebutValidator(control: FormControl){
    const today = new Date();
    const dateGetted = new Date(control.value);
    return (dateGetted < today) ? {'message' : "Date de début ne doit être antérieure à la date du jour"}: null;
  }

  allowedDateFin(){
    if(!this.periodMAJForm.get('dateFin').untouched){
      const dateFin = new Date(this.periodMAJForm.get('dateFin').value);
    const dateDeb = new Date(this.periodMAJForm.get('dateDebut').value);
    
    return (dateFin > dateDeb)? false : true; 
    }
  }

  allowedDateFinPlac(){
    if(!this.periodMAJForm.get('dateFinPlac').untouched){
      const dateFin = new Date(this.periodMAJForm.get('dateFinPlac').value);
    const dateDeb = new Date(this.periodMAJForm.get('dateDebutPlac').value);
    return (dateFin > dateDeb)? false : true; 
    }
  }

  getPeriodeFromService(){  
    if(this.selectedId){
      this._periodeService.getOnePeriode(this.selectedId)
      .catch((res)=>{
            this.message = ' Une erreur est survenue lors de la consultation de la période';
            this.messageDisplayDialog = true;
            this.errorMessage =  res.error.toString();
            this.showErrorMessage = true;
        return this._coreService.handleError(res);})
      .subscribe(res => {
        this.periode = {
          id : res.id,
          nomPeriode: res.nomPeriode,
          typePeriode: res.typePeriode,
          status: res.status,
          dateDebut: new Date(res.dateDebut),
          dateFin: new Date(res.dateFin),
          dateNotif: new Date(res.dateNotif),
          dateDebutPlacement: new Date(res.dateDebutPlacement),
          dateFinPlacement: new Date(res.dateFinPlacement)
        }
    this._coreService.setcurrentPos('Périodes d\'abstention / '+ this.periode.nomPeriode);
    // Désactivation initiale des champs
      this.periodMAJForm.controls['nomPeriode'].disable();
      this.periodMAJForm.controls['typePeriode'].disable();
      this.periodMAJForm.controls['dateDebut'].disable();
      this.periodMAJForm.controls['dateFin'].disable();
      this.periodMAJForm.controls['dateDebutPlac'].disable();
      this.periodMAJForm.controls['dateFinPlac'].disable();
      })
      
    } 
  }

  // Récupérer la liste des personnes notifiées
  getNotifiedUsers(){
    const listNot: NotifiedUsers[] = [];
    this._periodeService.getListNotifiedUsers(this.selectedId)
    .catch((res) => {
      this.message = ' Une erreur est survenue lors de l\'affichge des personnes notifiées';
      this.messageDisplayDialog = true;
      this.errorMessage =  res.error.toString();
      this.showErrorMessage = true;
      return this._coreService.handleError(res);})
    .subscribe(res => {
      if(res && res.length>0){
        for(let t = 0 ; t<res.length ; t++){
          listNot.push({'adressMail' : res[t]});
        }       
        
      }
      else{
        listNot.push({'adressMail' : "Aucun Enregistrement Trouvé"});
      }
      this.notifiedUsersList = listNot;
    });
  }

  closePopUp() {
    this.messageDisplayDialog = false
    this.showErrorMessage = false
  }

  getActiveIndex(){
    if(this.periode.status === "Periode definie"){
      return 0;
    }
    else if(this.periode.status === "Periode notifiee"){
      return 1;
    }
    else if(this.periode.status === "Periode relancee"){
      return 2;
    }else{
      return 3;
    }
  }
}
