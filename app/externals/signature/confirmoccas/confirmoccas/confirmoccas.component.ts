import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignatureService } from '../../signature.service';
import { Location } from '@angular/common';
import { CoreService } from '../../../../core/services/core.service';
import { SendmailService } from '../../../../shared/sendmail/sendmail.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { UserService } from '../../../../users/users.service';

@Component({
  selector: 'app-confirmoccas',
  templateUrl: './confirmoccas.component.html',
  styleUrls: ['./confirmoccas.component.scss']
})
export class ConfirmoccasComponent implements OnInit {

   id = this.route.snapshot.paramMap.get('id');  
   nom = this.route.snapshot.paramMap.get('nomOccas');
   prenom = this.route.snapshot.paramMap.get('prenomOccas');
   mail = this.route.snapshot.paramMap.get('emailOccas');
   tel = this.route.snapshot.paramMap.get('telOccas');
   nameFile:string;
   urlFill:string;
   urlViewDoc:string;
   urlConsultDoc:string;
   urlDownloadDoc:string;
   pr:string;
  constructor(private route: ActivatedRoute,  private location: Location,private _SignatureService:SignatureService,private _SendmailService:SendmailService, private _UserService:UserService) { }

  ngOnInit() {

      this._SignatureService.getUrlConfirmOccas(this.id, this.nom, this.prenom, this.mail, this.tel)
      .subscribe(data => {
         this.nameFile = data.response;
        this.urlViewDoc=this._UserService.getUrlAdd();
        this.urlConsultDoc = this.urlViewDoc+"/INSIDERS/docSignes/"+this.nameFile;
        this.urlDownloadDoc = this.urlViewDoc+"/INSIDERS/rest/initieOccasionnel/downloadDoc/"+this.id;

         let name=this.nom.replace("aba"," ");
         name=name.replace("bb","b");
         name=name.replace("aa","a");

         let firstname=this.prenom.replace("aba"," ");
         firstname=firstname.replace("bb","b");
         firstname=firstname.replace("aa","a");

         this.pr = firstname.charAt(0).toUpperCase() + firstname.slice(1);
         let MailTo = this.mail;
         let mailModele={
          mailDestinataire :  MailTo,
          objet : "Notification de Signature - INSIDERS",
          corps : " <style> \
          table { \
              font-family: arial, sans-serif; border-collapse: collapse; width: 100%; \
              margin : 10px;   } \
          th {\
              text-align: center; font-size: 130%; background-color: #000000; \
              color: #fff; } \
            div{\
                text-align: center; font-size: 110%;  width: 150px; background-color: #000000; \
                color: #fff; height : 50px;} \
          td, th { \
              border: 1px solid #dddddd; padding: 8px;} \
           input{\
             font-weight: bold;\
              color: #fff;\
              background-color: #ffa500;\
              padding: 6px 12px;\
              margin-bottom: 10px;\
              font-size: 110%;\
              font-weight: 400;\
              line-height: 1.42857143;\
              text-align: center;\
              border: 1px solid transparent;\
              width: 100%;\
          } \
          </style>\
          <table> \
            <tr> \
              <th>Orange</th> \
            </tr> \
            <tr>\
              <td style='font-size: 130%;'>e-signature</td>\
            </tr>\
            <tr>\
              <td > Bonjour "+  name.toUpperCase()+ " "+ this.pr +", <br> <br> \
              Merci d'avoir sign&eacute; votre avis d'inscription. <br> <br>\
              Vous pouvez temporairement acc&eacute;der &agrave; votre lettre sign&eacute;e : <br> <br>\
              </td>\
            </tr>\
            <tr>\
              <td>\
              <table width='100%'><tr><td style='width:30%;background:#fff;'></td><td style='width:30%;background:#000;'> <div> <a style='text-decoration:none; color:#FFFFFF;' href='"+this.urlViewDoc+"/INSIDERS/rest/initieOccasionnel/downloadDoc/"+this.id+"'> Consulter le document </a></div> </td><td  style='width:30%;background:#fff;'></td></tr></table>\
              </td> \
            </tr> \
          </table> \
          <table> \
            <tr> \
                <td style='font-size: 130%; text-align:center;'>Ne pas partager ce mail </td> \
              </tr> \
              <tr> \
              <td> Cet email est destin&eacute; personnellement et ne doit &ecirc;tre ni partag&eacute; ni redirig&eacute;. <br> <br> </td> \
              </tr> \
          </table> "
        };
        this._SendmailService.sendMail(mailModele).subscribe (
          res => {
          },
          err => {
          }
  
        );
      });

  }

}
        