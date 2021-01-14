import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from '../../models/input-base';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss']
})
export class DynamicFormInputComponent implements OnInit {

  @Output() selectChanged: EventEmitter<any> = new EventEmitter();
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  @Input()  addProjectDisplayDialog=false;
  fr: any;


  constructor() { }

  ngOnInit() {
    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["Di","Lu","Ma","Me","Je","Ve","Sa"],
      monthNames: [ "Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre" ],
      monthNamesShort: [ "Jan", "Fév", "Mar", "Avr", "Mai", "Jui","Jul", "Aoû", "Sep", "Oct", "Nov", "Déc" ],
      today: 'Aujourd\'hui',
      clear: 'Effacer'
  };
  }

  @Input() input: InputBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.input.key].valid; }

  isMultipleSelected(opt: any, values: any[]) {
    return values.find(val => val.id === opt.key.id);
  }

  isSelected(opt: any, value: any) {
    return (value === opt.id? value : undefined);
  }

  onChange(event, inputKey) {
    if (inputKey === 'pilote') {
      this.selectChanged.emit(event);
    }
  }

  onclick(event){
    this.clickEvent.emit(event);
    
  }

  isError(champ: string) {
    return this.form.get(champ).invalid && this.form.get(champ).touched;
  }

  setPlaceHolder(inputKey) {
    let placeHolderMessage = '';
    if (inputKey === 'dateSignature' || inputKey === 'dateFinInscription') {
      placeHolderMessage = 'Ce champs est renseigné automatiquement ';
    }
    if (inputKey === 'fonction') {
      placeHolderMessage = 'Entreprise ou division/ Poste occupé';
    }
    if (inputKey === 'dateNaissance') {
      placeHolderMessage = 'jj-mm-aaaa';
    }
    if (inputKey === 'numProFixe' || inputKey === 'numPriveFixe' || inputKey === 'numPriveMobile' || inputKey ==='numeroMobile') {
      placeHolderMessage = '+33XXXXXXXXX';
    }

    return placeHolderMessage;
  }

}