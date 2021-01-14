import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputBase } from '../models/input-base';


@Injectable()
export class FormService {
  constructor() { }

  toFormGroup(inputs: InputBase<any>[] ) {
    let group: any = {};

    inputs.forEach(input => {
      switch (input.key) {
        case 'nom': case 'prenom': case'condition':  case 'entite' :
          group[input.key] =  new FormControl(input.value || '', Validators.required);
          input.errMessage = 'Ce champs doit contenir au moin un caractère';
        break;
        case 'adresseMail' :
          group[input.key] =  new FormControl(input.value || '', Validators.compose([
            Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]));
          input.errMessage = 'Le format de l\'email n\'est pas valide';
        break;
        case 'numeroMobile' :
          group[input.key] =  new FormControl(input.value || '', [
            Validators.required,
            Validators.pattern('^(\\+33)+[0-9]{9}$')
          ]);
          input.errMessage = 'Le numéro de Tél doit commencer par +33 et doit contenir 11 chiffres';
        break;
        // case 'fonction' :
        //   group[input.key] =  new FormControl(input.value || '', Validators.compose([Validators.required, Validators.minLength(4)]));
        //   input.errMessage = 'La fonction doit contenir au moin 4 caractères';
        // break;
        default:
          group[input.key] =  new FormControl(input.value || '');
        break;
      }
    });
    return new FormGroup(group);
  }
}
