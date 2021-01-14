import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../users.service';
import { CoreService } from '../../core/services/core.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../core/interface/user.model';
import { DatePipe } from '@angular/common';
import { NewUser } from '../interfaces/new-user.model';

import { SendmailService } from '../../shared/sendmail/sendmail.service';
import { InsidersConstants } from '../../core/insiders-constants';
import { Initiepermanent } from '../interfaces/initiepermanent.model';

@Component({
  selector: 'app-complete-initie-permanent',
  templateUrl: './complete-initie-permanent.component.html',
  styleUrls: ['./complete-initie-permanent.component.scss']
})

export class CompleteInitiePermanentComponent implements OnInit {

  
  mail: string;
  str: string;
  nomEnt: string;
  nomNaiss: string;
 //  adresseMail: string;
  addUserDisplayDialog= false;
  // InitiePermanentModified: Initiepermanent;
  form: FormGroup;
  idInitiePermanent=  this.route.snapshot.paramMap.get('id');
  checkedForm = false;
  // initiePerm: Initiepermanent;
  dateNaissance: Date;
  

  fr:any;
  constructor(private route:  ActivatedRoute,private formBuilder: FormBuilder,
    private _http: HttpClient,
    private _userService: UserService,
    private _coreService: CoreService,
    private _router: Router,
    private _SendmailService:SendmailService) { }

  ngOnInit() {
    this._coreService.setcurrentPos('Modification Initié Permanent');
    this._coreService.setCurrentClass('utilisateurs');
    
    this.form = this.formBuilder.group({
      //Infos personnelles Initiés permanents
       
       prenom: ['', Validators.compose([Validators.required])],
       nom: ['', Validators.compose([Validators.required])],
       nomNaissance: ['', Validators.compose([Validators.required])],
       adresseMail: ['', Validators.required],
       dateNaissance:['', [
        Validators.required,
        Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$') 
        //Validators.pattern('/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/')
        
      ]
      ],
      NumIdentifNational:['', Validators.compose([Validators.required])],
      numPriveFixe: ['', [
        Validators.required,
        Validators.pattern('^(\\+33)+[0-9]{9}$')
      ]
      ],
      numPriveMobile:  ['', [
        Validators.required,
        Validators.pattern('^(\\+33)+[0-9]{9}$')
      ]
      ],
      // Adresse privée complète
  
          nomRuePr: ['', Validators.required],
          numRuePr: ['', Validators.required],
          complementAdressePr: [''],
          villePr: ['', Validators.required],
          codePostalPr: ['', Validators.required],
          paysPr: ['', Validators.required],
  
      // Infos Initié
  
       profil:['', Validators.compose([Validators.required])],
      condition:['', Validators.compose([Validators.required])],
      fonction: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      raison: ['', Validators.compose([Validators.required])],
      dateInscription: ['', Validators.required],
      dateSignature:['', Validators.required],
      dateFinInscription:['', Validators.required],
          
         // Infos Entreprise
  
          nomEntreprise: ['', Validators.required],
          //adresse entreprise
          nomRueEnt: ['', Validators.required],
          numRueEnt:['', Validators.required],
          complementAdresseEnt:[''],
          villeEnt:['', Validators.required],
          codePostalEnt: ['', Validators.required],
          paysEnt: ['', Validators.required],
          //adresse perso/ privé 
          numProFixe: ['', [
            Validators.required,
            Validators.pattern('^(\\+33)+[0-9]{9}$')
          ]
          ],
          numeroMobile: ['', [
            Validators.required,
            Validators.pattern('^(\\+33)+[0-9]{9}$')
          ]
          ],
          confirmation: ['', Validators.required]
              
         });
    this.createForm();
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
 


  createForm(): void {

     this._userService.getinitiepermanent(this.idInitiePermanent).subscribe(data => {
      const  dateInscription = new Date(data.dateInscription);
      // const dateSignature= new Date(data.dateSignature);
      // const dateFinInscription= new Date(data.dateFinInscription);
      const dateNaissance= new Date(data.dateNaissance);
      
      if(data.nomNaissance===null){

        this.nomNaiss= data.nom;
      }  else
      {
        this.nomNaiss=data.nomNaissance;
      }
       this.mail = data.adresseMail;
      this.mail=this.mail.substring(this.mail.indexOf("@") + 1); 
      if(this.mail==='orange.com') {
   
       //str.substring(0, str.indexOf(":")); 
       this.mail= 'Orange';
      }else{
            this.mail= data.nomEntreprise;
      }
     
       this.form.patchValue({
        prenom: data.prenom,
        nom: data.nom,
        nomNaissance: this.nomNaiss,
        adresseMail: data.adresseMail,
        //dateNaissance:dateNaissance.toLocaleString(),
        dateNaissance:data.dateNaissance,
       NumIdentifNational:data.numIdentifNational,
       numPriveFixe: data.numPriveFixe,
       numPriveMobile:  data.numPriveMobile,
       // Adresse privée complète
   
           nomRuePr: data.nomRuePr, 
           numRuePr:data.numRuePr, 
           complementAdressePr: data.complementAdressePr,
           villePr: data.villePr,
           codePostalPr: data.codePostalPr,
           paysPr: data.paysPr,
   
       // Infos Initié
      
       profil:data.profil,
       condition:data.condition,
       fonction: data.fonction,
       raison: data.raison,
       dateInscription: dateInscription.toLocaleString(),
       dateSignature: data.dateSignature,
       dateFinInscription: data.dateFinInscription,
           
          // Infos Entreprise
   
           nomEntreprise: this.mail,
           //adresse entreprise
           nomRueEnt: data.nomRueEnt,
           numRueEnt:data.numRueEnt,
           complementAdresseEnt:data.complementAdresseEnt,
           villeEnt:data.villeEnt,
           codePostalEnt: data.codePostalEnt,
           paysEnt: data.paysEnt,
           //adresse perso/ privé 
           numProFixe: data.numProFixe,
           numeroMobile: data.numeroMobile,
          
           
       })
     
      
       this.form.controls['adresseMail'].disable();
       this.form.controls['profil'].disable();
       this.form.controls['condition'].disable();
       this.form.controls['raison'].disable();
       this.form.controls['dateInscription'].disable();
       this.form.controls['dateSignature'].disable();
       this.form.controls['dateFinInscription'].disable();
       this.form.controls['numeroMobile'].disable();

       
       
   });
  }


   public updateUser(){
     

      const user= this.form.value;
       this._userService.updateinitiepermanent(this.idInitiePermanent,user).subscribe(
          resp => {
            //this.initiePerm=resp.data;
      
            const mailInitiePermanent = {
              objet:  'Formulaire remplit',
              corps : 'Bonjour, <br/> <br/> Merci d\'avoir renseign&eacute les informations exig&eacutees par l\'AMF. Vous disposez d\'un acc&egraves &agrave l\'application vous permettant de modifier vos informations &agrave tout moment '+InsidersConstants.APP_URI +InsidersConstants.ROUTE_INITIEPERMANENT_REDIRECT+'/'+this.idInitiePermanent +' <br/> Cordialement',
              mailDestinataire:this.form.get('adresseMail').value
              };

            
      
              // const mailAdmin = {
              //   objet:  'Profile modifié',
              //   corps:  'Bonjour, <br/> <br/> Votre profile est modifi&eacute par l\'administrateur. <br/> <br/> Cordialement',
              //   mailDestinataire: resp.administrateur.adresseMail
              // };
      
              
               this.addUserDisplayDialog=true;
              this._userService.sendSimpleMailUpdate(mailInitiePermanent).subscribe(
                res => { 
                },
                err => {
                });
              // this._userService.sendSimpleMailUpdate(mailAdmin).subscribe( res => { 
              // },
              // err => {
              // });

      // },
      // err => {;
      //     console.log("erreur d'envoie du mail");

      })
     

   }


   isError(champ: string) {
   return this.form.get(champ).invalid && this.form.get(champ).touched;
  }

   isErrorInputNumber(champ: string) {
   return  this.form.get(champ).dirty && this.form.get(champ).hasError('minlength');
  }

  addFormControl() {
console.log(1234);
      return this.form.get('nom').invalid ||
      this.form.get('prenom').invalid ||
      this.form.get('numeroMobile').invalid ||
      this.form.get('dateNaissance').invalid ||
      this.form.get('NumIdentifNational').invalid||
      this.form.get('numPriveFixe').invalid||
      this.form.get('numPriveMobile').invalid||
      this.form.get('numRuePr').invalid||
      this.form.get('complementAdressePr').invalid||
      this.form.get('villePr').invalid||
      this.form.get('codePostalPr').invalid||
      this.form.get('paysPr').invalid||
      this.form.get('fonction').invalid||
      this.form.get('nomEntreprise').invalid||
      this.form.get('numRueEnt').invalid||
      this.form.get('complementAdresseEnt').invalid||
      this.form.get('codePostalEnt').invalid||
      this.form.get('paysEnt').invalid||
      this.form.get('numProFixe').invalid ||
      !this.checkedForm;
  
    
    }

    convertDate(dayToConv:Date){
      const dayToCon =dayToConv.toDateString().split("/");
     
      const newDate = ""+dayToCon[2]+"-"+dayToCon[1]+"-"+dayToCon[0];
      return newDate;
    }

    confirmationFunction(){
      if(this.checkedForm === true){
        this.checkedForm = false;
      }else{
        this.checkedForm = true;
      }
      
    }


    send(){
        
      this._router.navigate(['/angular/home']);

    }

   
  }


  

 