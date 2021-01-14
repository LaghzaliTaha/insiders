import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Periode } from '../../Interface/periode.model';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CoreService } from '../../../core/services/core.service';
import { PeriodeService } from '../../Service/periode.service';
import { Route, Routes, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InsidersConstants } from '../../../core/insiders-constants';

@Component({
  selector: 'app-add-period',
  templateUrl: './add-period.component.html',
  styleUrls: ['./add-period.component.scss']
})
export class AddPeriodComponent implements OnInit {
  fr:any;
  periode:Periode;
  periodAddForm:FormGroup;
  typePeriodeList= ["","Intéressement/Participation","Trimestre 1","Trimestre 2","Trimestre 3","Trimestre 4"]
  
  addPeriodDisplayDialog= false;
  messageDisplayDialog = false;
  showErrorMessage = false;
  errorMessage: string;
  message: string;
  created = false;

  constructor(private formBuilder: FormBuilder, private _coreService: CoreService,
      private _periodeService: PeriodeService,
    private _router:Router
   
    ) { 
      
    }

  ngOnInit() {
    this._coreService.setcurrentPos('Périodes d\'abstention / Créer une période');
    this._coreService.setCurrentClass('periodes');
    this.periodAddForm = this.formBuilder.group({
      'nomPeriode': ['', Validators.required ],
      'typePeriode': ['', Validators.required ],
      'dateDebut': ['', [Validators.compose([Validators.required]), this.allowedDateDebutValidator] ],
      'dateFin': ['', [Validators.compose([Validators.required])] ],
      'dateDebutPlac': ['', [Validators.compose([Validators.required]), this.allowedDateDebutValidator] ],
      'dateFinPlac': ['', Validators.compose([Validators.required]) ]
    })
    

        this.fr = {
      firstDayOfWeek: 0,
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["Di","Lu","Ma","Me","Je","Ve","Sa"],
      monthNames: [ "Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre" ],
      monthNamesShort: [ "Jan", "Février", "Mar", "Apr", "Mai", "Jun","Jul", "Aut", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Aujourdhui',
      clear: 'Clear'
  };
  }

  addPeriod(){
    this.periode = { 
      nomPeriode: this.periodAddForm.get('nomPeriode').value,
      typePeriode: this.periodAddForm.get('typePeriode').value,
      dateDebut: this.periodAddForm.get('dateDebut').value,
      dateFin: this.periodAddForm.get('dateFin').value,
      dateDebutPlacement:this.periodAddForm.get('dateDebutPlac').value,
      dateFinPlacement:this.periodAddForm.get('dateFinPlac').value
    };
    this.addPeriodDisplayDialog = true;
  }

  send(){
    this.addPeriodDisplayDialog = false;
    this._periodeService.addPeriode(this.periode)
    .catch((res)=>{
          this.message = ' Une erreur est survenue lors de la création de la période';
          this.messageDisplayDialog = true;
          this.created = false;
          this.errorMessage =  res.error.toString();
          const exist =  this.errorMessage.indexOf('Object existe déjà');
          if(exist !== -1) {
            this.message = 'Periode existe déjà';
          }
          this.showErrorMessage = true;
      return this._coreService.handleError(res);})
    .subscribe(datas =>{
      this.created = true;
      this._router.navigate(['/angular/periodes']);
    } );
    
  }

  cancel(){
    this.addPeriodDisplayDialog = false;
  }

  addFormControl(){
    return this.periodAddForm.get('nomPeriode').invalid ||
    this.periodAddForm.get('typePeriode').invalid ||
    this.periodAddForm.get('dateDebut').invalid ||
    this.periodAddForm.get('dateFin').invalid ||
    this.allowedDateFin() ||
    this.allowedDateFinPlac() ||
    this.periodAddForm.get('dateDebutPlac').invalid ||
    this.periodAddForm.get('dateFinPlac').invalid;
  }

  allowedDateDebutValidator(control: FormControl){
    const today = new Date();
    const dateGetted = new Date(control.value);
    return (dateGetted < today) ? {'message' : "Date de début ne doit être antérieure à la date du jour"}: null;
  }

  allowedDateFin(){
    if(!this.periodAddForm.get('dateFin').untouched){
      const dateFin = new Date(this.periodAddForm.get('dateFin').value);
    const dateDeb = new Date(this.periodAddForm.get('dateDebut').value);
    
    return (dateFin > dateDeb)? false : true; 
    }
  }

  allowedDateFinPlac(){
    if(!this.periodAddForm.get('dateFinPlac').untouched){
      const dateFin = new Date(this.periodAddForm.get('dateFinPlac').value);
      const dateDeb = new Date(this.periodAddForm.get('dateDebutPlac').value);
    return (dateFin > dateDeb)? false : true; 
    }
  }

  closePopUp() {
    if(this.created) {
      this._router.navigate(['/'+InsidersConstants.ROUTE_PERIODES]);
    }
    this.messageDisplayDialog = false
    this.showErrorMessage = false
  }
}