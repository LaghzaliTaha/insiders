import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { InsidersConstants } from '../core/insiders-constants';
import { Observable } from 'rxjs/Observable';
import { ListUsers } from '../core/interface/list-users.model';
import { Listbox } from 'primeng/primeng';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NewUser } from './interfaces/new-user.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CoreService } from '../core/services/core.service';
import { GroupOfInputs } from './interfaces/group-of-inputs.model';
import { Initiepermanent } from './interfaces/initiepermanent.model';
import { User } from '../listes/Interfaces/user.model';
import { Mail } from '../shared/sendmail/interface/mail';
import { Initieoccasionnel } from './interfaces/initieoccasionnel.model';




@Injectable()

export class UserService {
    url: string;

     constructor(private _http: HttpClient, private _coreService: CoreService) { }

     public getUsers (): Observable<ListUsers> {
        return this._http.get<ListUsers>(InsidersConstants.apiUrlUsers);
    }
 
    public deleteUser(tabUsr: string, profil: string): Observable<ListUsers> {

        let urlPath: string;
        switch (profil) {
        case 'Administrateur':
            urlPath = 'administrateur';
            break;
        case 'Initié Permanent':
            urlPath = 'initiePermanent';
            break;
        case 'Initié Occasionnel':
            urlPath = 'initieOccasionnel';
            break;
        case 'Correspondant':
            urlPath = 'correspondant';
            break;
        case 'Pilote':
            urlPath = 'pilote';
            break;
        case 'DIS':
            urlPath = 'dis';
            break;
        default:
    }

    let url: string;
    url = InsidersConstants.APP_URI + urlPath + '/delete?id=' + tabUsr;
    return this._http.delete<ListUsers>(url);
}

public deactivateUser(tabUsr: string, profil: string, listUsers: User[]) {

            let urlPath: string;
            switch (profil) {
            case 'Administrateur':
                urlPath = 'administrateur';
                break;
            case 'Initié Permanent':
                urlPath = 'initiePermanent';
                break;
            case 'Initié Occasionnel':
                urlPath = 'initieOccasionnel';
                break;
            case 'Correspondant':
                urlPath = 'correspondant';
                break;
            case 'Pilote':
                urlPath = 'pilote';
                break;
            case 'DIS':
                urlPath = 'dis';
                break;
            default:
        }
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };

        let url: string;
        url = InsidersConstants.APP_URI + urlPath + '/deactivateListUser?ids=' + tabUsr;
        return this._http.put<ListUsers>(url, listUsers, httpOptions);
    }


         public addUser(urlApi: string, user: NewUser): Observable<any> {
    
              const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
             'Accept': 'application/json; charset=utf-8'});
             return this._http.post(urlApi, user, {headers: headers})
                .map(response => response as any);
                
         }


         /********************************Update Initié Permanent****************************************/
         
         public getinitiepermanent(id:string):Observable<Initiepermanent> {
            return this._http.get<Initiepermanent>(InsidersConstants.apriUrlGetInitiePermanent+'?id='+id);
         }
          
         public updateinitiepermanent(id:string, initiePermanent:Initiepermanent): Observable<any> {
             
            const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json'
                })
              };
    
            let url: string;
            url = InsidersConstants.apriUrlUpdateInitiePermanent +id;
            return this._http.put<Initiepermanent>(url, initiePermanent, httpOptions);
             
           }
           public getinitiepermanentByMail(mail:string):Observable<Initiepermanent> {
            return this._http.get<Initiepermanent>(InsidersConstants.apriUrlGetInitiePermanentByMail+'?mail='+mail);
         }

         /**********************************Fin Update Initié Permanent********************************************************/
         /********************************Update Initié Occasionnel*************************************************** */

         public getinitieOccasionnel(id:string):Observable<Initieoccasionnel> {
            return this._http.get<Initieoccasionnel>(InsidersConstants.apriUrlGetInitieOccasionnel+'?id='+id);
         }

         public getinitieOccasionnelByMail(email:String):Observable<Initieoccasionnel> {
            return this._http.get<Initieoccasionnel>(InsidersConstants.apriUrlGetInitieOccasionnelByMail+'?email='+email);
         }

         public getInitieOccaByPiloteMail(email:string):Observable<Initieoccasionnel[]> {
            return this._http.get<Initieoccasionnel[]>(InsidersConstants.apiUrlGetPiloteByEmail+'?email='+email);
         }
         public updateinitieoccasionnel(id:string, initieOccasionnel:Initieoccasionnel): Observable<any> {
             
            const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json'
                })
              };
    
            let url: string;
            url = InsidersConstants.apriUrlUpdateInitieOccasionnel +id;
            return this._http.put<Initieoccasionnel>(url, initieOccasionnel, httpOptions);
             
           }

           public getprojetByInitieOcca(id:string):Observable<Initieoccasionnel>{
            return this._http.get<Initieoccasionnel>(InsidersConstants.apiUrlAllProjectsByOccas+'?id='+id);

           }

        
         /********************************Fin Update Initié Occasionnel********************************************************/

         /******************************Pilote - Mettre à jour sa liste d'initiés occasionnels********************/

         public getInitieOccaByPilote(id:string):Observable<Initieoccasionnel[]> {
            return this._http.get<Initieoccasionnel[]>(InsidersConstants.apiUrlGetInitieOccaByPilote+'?id='+id);
         }

         /******************************************Fin********************************************************/
    
    
         public getUnlinkedProjects (): Observable<any[]> {
    
            return this._http.get<any[]>(InsidersConstants.apiUrlAllProjectsNotLinked);
         }
    
         public linkPiloteToProject(project: any, idUser: number): Observable<any> {
    
              const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
             'Accept': 'application/json; charset=utf-8'});
             return this._http.post(InsidersConstants.apiUrlAddPiloteToProject, {
              idProjet: project.id,
              idPilote: idUser
             }, {headers: headers});
         }
    
         public getAllPilotes (): Observable<any[]> {
          
                  return this._http.get<any[]>(InsidersConstants.apiUrlAllPilote);
          }
    
          public getProjetByPilote (pilote: any): Observable<any[]> {
            const dataParams = new HttpParams().set( 'id' , pilote.id);
                    return this._http.get<any[]>(InsidersConstants.apiUrlAllProjectsByPilote, { params: dataParams });
          }
    
          public addProjetsToInitOcca(projects: any[], initOcca: any): Observable<any> {
                      const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
                     'Accept': 'application/json; charset=utf-8'});
                     return this._http.post(InsidersConstants.apiUrlAddProjectsToInitOcca, {
                      idInitOcca: initOcca.id,
                      listIdProjets: projects.map(project => project.id)
                     }, {headers: headers});
          }
          
    
          public getAllInitiePermanent (): Observable<any[]> {
                    return this._http.get<any[]>(InsidersConstants.apiUrlAllInitiePermanent);
          }
    
          public getAllCorrespondant (): Observable<any[]> {
            return this._http.get<any[]>(InsidersConstants.apiUrlAllCorrespondant);
          }
    
    
          public sendMail(user: NewUser): Observable<any> {
            
            let urlAuthentification = "";

              let completerInscription = "";
              let hrefper="";
              let hrefocca="";
              let debutMail="";

              
              let name=user.nom.replace("a","aa");
              name=name.replace("b","bb");
              name=name.replace(/ /g,"aba");

              let firstName=user.prenom.replace("a","aa");
              firstName=firstName.replace("b","bb");
              firstName=firstName.replace(/ /g,"aba");
              let linkToken="linkTokenInvit";
              let authentifier="Pour s'authentifier, vous pouvez cliquer sur : <br><br>\
              <table width='100%'><tr><td style='width:30%;background:#fff;'></td><td style='width:30%;background:#000;'> <div> <a style='text-decoration:none; color:#FFFFFF;' href= " + linkToken + "> Authentification </a> <br></div> </td><td  style='width:30%;background:#fff;'></td></tr></table>";
             

               if(user.profil === 'Initié Permanent') {

                let raisonDes=user.raison.replace("a","aa");
                raisonDes=raisonDes.replace("b","bb");
                raisonDes=raisonDes.replace(/ /g,"aba");
                debutMail="Dans le cadre des règlements sur les abus de marché, vous venez d'être inscrit sur l'application INSIDERS en tant que <b>INITIE PERMANENT</b>.";
                hrefper= this.getUrlAdd() + "/INSIDERS/app/angular/utilisateurs/formInitiePermanent/" + user.id;
                completerInscription = "Merci de vous authentifier pour  de compl&eacute;ter votre inscription en cliquant sur le lien ci-dessous : <br><br>\
                <table width='100%'><tr><td style='width:30%;background:#fff;'></td><td style='width:30%;background:#000;'> <div> <a style='text-decoration:none; color:#FFFFFF;' href= " + linkToken + ">Vous authentifier et  compl&eacute;ter l'inscription </a> <br></div> </td><td  style='width:30%;background:#fff;'></td></tr></table>";
                urlAuthentification = this.getUrlAdd() +"/INSIDERS/app/angular/redirectToAuthentification/"
              + user.id + "/" + name + "/" + firstName + "/" + user.adresseMail + "/"+ user.numeroMobile + "/" +raisonDes+ "/" +InsidersConstants.ROLE_INITIEPERMANENT;
                
              }
              if(user.profil === 'Initié Occasionnel') {

                this.getprojetByInitieOcca(String(user.id)).subscribe(data => {
                    //console.log("liste des projets : "+ data.nom);
                });

                hrefocca= this.getUrlAdd() + "/INSIDERS/app/angular/utilisateurs/formInitieOccasionnel/" + user.id;
                completerInscription = "Pour compl&eacute;ter l'inscription, vous pouvez cliquer sur : <br><br>\
                <table width='100%'><tr><td style='width:30%;background:#fff;'></td><td style='width:30%;background:#000;'> <div> <a style='text-decoration:none; color:#FFFFFF;' href= " + hrefocca + "> Vous authentifier et Compl&eacute;ter l'inscription </a> <br></div> </td><td  style='width:30%;background:#fff;'></td></tr></table>";
                urlAuthentification = this.getUrlAdd() +"/INSIDERS/app/angular/redirectToAuthentificationOccas/"
                + user.id + "/" + name + "/" + firstName + "/" + user.adresseMail + "/"+ user.numeroMobile+"/"+InsidersConstants.ROLE_INITIEOCCASIONNEL;
              }
              if(user.profil === 'DIS') {

                let fonctionDis=user.fonction.replace("a","aa");
                fonctionDis=fonctionDis.replace("b","bb");
                fonctionDis=fonctionDis.replace(/ /g,"aba"); 
                debutMail="Dans le cadre des règlements sur les abus de marché, vous venez d'être désigné par "+(user.designePar.nom).toLocaleUpperCase()+" "+this.capitalizeFirstLetter(user.designePar.prenom)+" comme <b> Détenteur d'Information Sensible</b>. A ce titre, vous êtes donc inscrit dans l'application INSIDERS en tant que DIS et votre référent est "+(user.referent.nom).toLocaleUpperCase()+" "+this.capitalizeFirstLetter(user.referent.prenom)+".";
                urlAuthentification = this.getUrlAdd() +"/INSIDERS/app/angular/redirectToAuthentificationDis/"
                + user.id + "/" + name + "/" + firstName + "/" + user.adresseMail + "/"+ user.numeroMobile+"/"+user.fonction+"/capgemini/casa/"+InsidersConstants.ROLE_DIS;
              }

              let profil = '';
              switch (user.profil) {
                case 'Administrateur':
                    profil = 'ADMINISTRATEUR';
                    break;
                case 'Initié Permanent':
                    profil = 'INITIE PERMANENT';
                    break;
                case 'Initié Occasionnel':
                    profil = 'INITIE OCCASIONNEL';
                    break;
                case 'Correspondant':
                    profil = 'CORRESPONDANT';
                    break;
                case 'Pilote':
                    profil = 'PILOTE';
                    break;
                case 'DIS':
                    profil = 'DIS';
                    break;
                default:
            }

            const mail = {
              profil:user.profil,
              mailDestinataire :  user.adresseMail,
              objet : "Inscription INSIDERS ", 
              corps : (user.profil === 'Initié Permanent' || 
                       user.profil === 'Initié Occasionnel' ||
                       user.profil === 'DIS' ? 
                       this._coreService.encodeText(" <style> \
                       table { \
                         font-family: Helvetica, sans-serif; border-collapse: collapse; width: 100%; \
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
                         <td style='font-size: 130%;'>Inscription INSIDERS</td>\
                       </tr>\
                       <tr>\
                         <td > Bonjour "+  (user.nom).toLocaleUpperCase()+ " "+ this.capitalizeFirstLetter(user.prenom) +", <br> <br>"+debutMail+"\
                        <br><br>\
                         <br> <br>"+ completerInscription + "</td>\
                       </tr>\
                       <tr>\
                         <td>\
                         Merci de signer votre lettre d'engagement en cliquant sur le lien ci-dessous : <br></br>\
                         <table width='100%'><tr><td style='width:30%;background:#fff;'></td><td style='width:30%;background:#000;'><div> <a  style='text-decoration:none; color:#FFFFFF;' href= " + urlAuthentification + "> Signer votre lettre d'engagement </a> </div></td><td  style='width:30%;background:#fff;'></td></tr></table>\
                         </td> \
                       </tr> \
                     </table> \
                     <table> \
                       <tr> \
                           <td style='font-size: 130%; text-align:center;'>Cet email vous est destin&eacute; personnellement et ne doit &ecirc;tre ni partag&eacute; ni redirig&eacute;.</td> \
                         </tr> \
                     </table>  ")
                       : 
                       this._coreService.encodeText("Bonjour "+(user.nom).toUpperCase() + " " + this.capitalizeFirstLetter(user.prenom)
                        + "</span>,<br></br> Vous &ecirc;tes inscrit sur l'application INSIDERS en tant que "+ this.capitalizeFirstLetter(user.profil) +"<br/><br/>"+authentifier+". <br></br>Cordialement.")
                      )
            };
    
            const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json; charset=utf-8'});
            return this._http.post(InsidersConstants.apiUrlSendMail, mail, {headers: headers});
          }
    
          capitalizeFirstLetter(word: string) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        public sendMailOccas(user: NewUser, projects:any[]): Observable<any> {
            
              let urlAuthentification = "";
              let completerInscription = "";
              let tableCont="";
              let hrefper="";
              let hrefocca="";
              //console.log("liste des projets pour l'IC : ", projects);
              let linkToken="linkTokenInvit";
              let authentifier="Pour s'authentifier, vous pouvez cliquer sur : <br><br>\
              <table width='100%'><tr><td style='width:30%;background:#fff;'></td><td style='width:30%;background:#000;'> <div> <a style='text-decoration:none; color:#FFFFFF;' href= " + linkToken + "> Authentification </a> <br></div> </td><td  style='width:30%;background:#fff;'></td></tr></table>";

              let name=user.nom.replace("a","aa");
              name=name.replace("b","bb");
              name=name.replace(/ /g,"aba");

              let firstName=user.prenom.replace("a","aa");
              firstName=firstName.replace("b","bb");
              firstName=firstName.replace(/ /g,"aba");


              if(user.profil === 'Initié Occasionnel') {

                hrefocca= this.getUrlAdd() + "/INSIDERS/app/angular/utilisateurs/formInitieOccasionnel/" + user.id;
                completerInscription = "Merci de vous authentifier pour  compl&eacute;ter votre inscription en cliquant sur le lien ci-dessous : <br><br>\
                <table width='100%'><tr><td style='width:30%;background:#fff;'></td><td style='width:30%;background:#000;'> <div> <a style='text-decoration:none; color:#FFFFFF;' href= " + linkToken + ">Vous authentifier et compl&eacute;ter l'inscription </a> <br></div> </td><td  style='width:30%;background:#fff;'></td></tr></table>";
                urlAuthentification = this.getUrlAdd() +"/INSIDERS/app/angular/redirectToAuthentificationOccas/"
                + user.id + "/" + name + "/" + firstName + "/" + user.adresseMail + "/"+ user.numeroMobile+"/"+InsidersConstants.ROLE_INITIEOCCASIONNEL;
              }

              projects.forEach(function(i)
              {
                // console.log("urlAuth boucle :",urlAuthentification );
                // console.log("nom : "+i.nom);
                tableCont = tableCont.concat("<table width='100%'><tr><td style='width:30%;background:#fff;'>Lettre  du projet : "+i.nom+"</td><td style='width:30%;background:#000;'><div> <a  style='text-decoration:none; color:#FFFFFF;' href= " + urlAuthentification+"/"+i.nom + "> Signer votre lettre d'engagement </a> </div></td><td  style='width:30%;background:#fff;'></td></tr></table>\
                ");
                //console.log("wst boucle :",tableCont );
            
              })

              let profil = '';
              switch (user.profil) {
                case 'Administrateur':
                    profil = 'ADMINISTRATEUR';
                    break;
                case 'Initié Permanent':
                    profil = 'INITIE PERMANENT';
                    break;
                case 'Initié Occasionnel':
                    profil = 'INITIE OCCASIONNEL';
                    break;
                case 'Correspondant':
                    profil = 'CORRESPONDANT';
                    break;
                case 'Pilote':
                    profil = 'PILOTE';
                    break;
                case 'DIS':
                    profil = 'DIS';
                    break;
                default:
            }

            const mail = {
              profil:user.profil,
              mailDestinataire :  user.adresseMail,
              objet : "Inscription INSIDERS ", 
              corps : (
                       this._coreService.encodeText(" <style> \
                       table { \
                         font-family: Helvetica, sans-serif; border-collapse: collapse; width: 100%; \
                         margin : 10px;   } \
                     th {\
                         text-align: center; font-size: 130%; background-color: #000000;\
                         color: #fff; } \
                      div{\
                           text-align: center; font-size: 110%;  width: 150px; background-color: #000000;\
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
                         <td style='font-size: 130%;'>Inscription INSIDERS</td>\
                       </tr>\
                       <tr>\
                         <td > Bonjour "+  (user.nom).toLocaleUpperCase()+ " "+ this.capitalizeFirstLetter(user.prenom) +", <br> <br> \
                         Dans le cadre des règlements sur les abus de marché, vous venez d'être inscrit sur l'application INSIDERS en tant que <b>"+profil+"</b>. Votre référent est "+(user.pilote.nom).toLocaleUpperCase()+" "+this.capitalizeFirstLetter(user.pilote.prenom)+" . <br> <br>"+ completerInscription + "</td>\
                       </tr>\
                       <tr>\
                         <td>\
                         Merci de signer votre lettre d'engagement en cliquant sur le lien ci-dessous :<br></br>"+tableCont+"\
                         </td> \
                       </tr> \
                     </table> \
                     <table> \
                       <tr> \
                           <td style='font-size: 130%; text-align:center;'>Cet email vous est destin&eacute; personnellement et ne doit &ecirc;tre ni partag&eacute; ni redirig&eacute;. </td> \
                         </tr> \
                     </table>  ")
                            )
            };
    
            const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json; charset=utf-8'});
            return this._http.post(InsidersConstants.apiUrlSendMail, mail, {headers: headers});
          }

          public sendDesactivationMail(user: NewUser): Observable<any> {
            let name=user.nom.replace("a","aa");
            name=name.replace("b","bb");
            name=name.replace(/ /g,"aba");
            let tableCont="";
            let firstName=user.prenom.replace("a","aa");
            firstName=firstName.replace("b","bb");
            firstName=firstName.replace(/ /g,"aba");

            let profil = '';
            switch (user.profil) {
              case 'Administrateur':
                  profil = 'ADMINISTRATEUR';
                  break;
              case 'Initié Permanent':
                  profil = 'INITIE PERMANENT';
                  break;
              case 'Initié Occasionnel':
                  profil = 'INITIE OCCASIONNEL';
                  break;
              case 'Correspondant':
                  profil = 'CORRESPONDANT';
                  break;
              case 'Pilote':
                  profil = 'PILOTE';
                  break;
              case 'DIS':
                  profil = 'DIS';
                  break;
              default:
          }

          let mail = {
            profil:user.profil,
            mailDestinataire :  user.adresseMail,
            objet : "Suppression compte INSIDERS", 
            corps : (
                     this._coreService.encodeText(" <style> \
                     table { \
                       font-family: Helvetica, sans-serif; border-collapse: collapse; width: 100%; \
                       margin : 10px;   } \
                   th {\
                       text-align: center; font-size: 130%; background-color: #000000;\
                       color: #fff; } \
                    div{\
                         text-align: center; font-size: 110%;  width: 150px; background-color: #000000;\
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
                       <td style='font-size: 130%;'>Notification de désactivation du compte</td>\
                     </tr>\
                     <tr>\
                       <td > Bonjour "+  (user.nom).toLocaleUpperCase()+ " "+ this.capitalizeFirstLetter(user.prenom) +", <br> <br> \
                     </td>\
                     </tr>\
                     </tr>Votre compte est désactivé <tr>\
                     <tr>\
                     </tr> \
 ")
                          )
          };

          const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'});
          return this._http.post(InsidersConstants.apiUrlSendSimpleMail, mail, {headers: headers});
        }


        getUrlAdd(): string {
          let urladd='';
          let port = location.port;
          let host = location.host;

          if (location.port === '8080' || location.port === '4200'){
            urladd = 'http://localhost:8080';
          }else {
            urladd = location.protocol + "//" + location.host;
          };
          return urladd;
        }

        sendDataToExportAMF(tabUsr: any) :Observable<any>{
            let exportInPer =[];
            let exportInOcca = [];
            let exportDis = [];
            let modelTosend = {};
            tabUsr.forEach(function(item){
            if(item.profil === "Initié Permanent"){
                exportInPer.push(item.id);
            }
            else if(item.profil === "Initié Occasionnel"){
                exportInOcca.push(item.id);
            }
            else if(item.profil === "DIS"){
                exportDis.push(item.id);
            }
            });
            modelTosend ={
            "exportInPer": exportInPer,
            "exportInOcca": exportInOcca,
            "exportDis" : exportDis
            };
            let url: string;
            url = InsidersConstants.APP_URI + 'utilisateur/export';
            const headers = new HttpHeaders({'Content-Type': 'application/json'});
             
            return this._http.post<Response>(url,modelTosend,{headers: headers,responseType:'text' as 'json'})

        }

        public getConfProfile (profile: string): Observable<GroupOfInputs[]> {
            const dataParams = new HttpParams().set( 'profile' , profile);
                        return this._http.get<GroupOfInputs[]>(InsidersConstants.apiUrlConfProfile, { params: dataParams });
        }
        
        public getUserById (urlApi: string, userId: number): Observable<NewUser> {
            const dataParams = new HttpParams().set( 'id' , userId.toString());
            return this._http.get<NewUser>(urlApi, { params: dataParams });
        }

        public getProjetsInitieOccasionnel (initieOccas: any): Observable<any[]> {
            const dataParams = new HttpParams().set( 'id' , initieOccas.id);
                    return this._http.get<any[]>(InsidersConstants.apiUrlAllProjectsByOccas, { params: dataParams })
                    .map(response => response as any[])
                    .catch((err) => {return Observable.throw(err)});
          }

          public addProject(projetName: any): Observable<any> {
            let url: string;
            url = InsidersConstants.APP_URI + 'projet/addProject';
            const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
           'Accept': 'application/json; charset=utf-8'});
           return this._http.post(url,projetName ,{headers: headers})
              .map(response => response as any);
              
        }

         

       sendSimpleMailUpdate(mail:Mail) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
      
      
          return this._http.post(InsidersConstants.apiUrlSendSimpleMail, mail, httpOptions);
        }
   
    



        public updateUser(urlApi: string, user: NewUser): Observable<any> {
            const dataParams = new HttpParams().set( 'id' , user.id.toString());
            const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
           'Accept': 'application/json; charset=utf-8'});
           return this._http.put(urlApi, JSON.stringify(user), {params: dataParams, headers: headers})
              .map(response => response as any);
              
       }
    
       public linkProjectsToPilotes(projects: any[], pilote: NewUser): Observable<any> {
        const dataParams = new HttpParams().set( 'id' , pilote.id.toString());
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
       'Accept': 'application/json; charset=utf-8'});
    //    console.log('projects : ', projects);
    //    console.log('pilote : ', pilote);
       return this._http.post(InsidersConstants.apiUrlLinkProjectsToPilote, projects, {params: dataParams, headers: headers})
          .map(response => response as any);
          
   }

   sendSimpleMail(mail:any) {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'});
        return this._http.post(InsidersConstants.apiUrlSendSimpleMail, mail, {headers: headers});
   }

   public deleteInitie(deleteUrl: string, user: any) {
       const dataParams = new HttpParams().set( 'id' , user.id.toString());
       return this._http.delete(deleteUrl, {params: dataParams})
            .map(response => response as boolean)
            .catch((res)=>{
                return res;
            });
   }

   public getDisByConnectedCorresp(connectedUser: any): Observable<any[]>{
        const dataParams = new HttpParams().set( 'adresseMail' , connectedUser.email);
        return this._http.get<any[]>(InsidersConstants.apiUrlGetDISByConnectedCorresp, { params: dataParams });
   }
   public getDISByMail(email:String):Observable<Initieoccasionnel> {
    return this._http.get<Initieoccasionnel>(InsidersConstants.apriUrlGetDISByMail+'?mail='+email);
 }

   
   public getCorrespByEmail(email: string): Observable<any>{
        const dataParams = new HttpParams().set( 'email' , email);
        return this._http.get<any>(InsidersConstants.apiUrlGetCorrespondantByEmail, { params: dataParams })
                .map(response => response as any);
   }

   public setModification(referent: any, modifications: any[]): Observable<any[]> {

        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8'});
        const dataParams = new HttpParams().set( 'idReferent' , referent.id.toString());

        return this._http.post(InsidersConstants.apiUrlSetModification, modifications, {headers: headers, params: dataParams})
                .map(response => response as any[]);
       
    }
    public validateAll(referent:any,modificationsIds: any[]): Observable<any[]> {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8'});
        const dataParams = new HttpParams().set( 'idReferent' , referent.id.toString());
        return this._http.put(InsidersConstants.validateAll, modificationsIds, {headers: headers, params: dataParams})
        .map(response => response as any[]);
    }

    public getModificationsByReferent(refrent: any): Observable<any[]>{
        const dataParams = new HttpParams().set( 'id' , refrent.id.toString());
        return this._http.get<any[]>(InsidersConstants.apiUrlGetModificationsByReferent, { params: dataParams })
                .map(response => response as any[]);
   }

   
   public activateDIS(users: any[]): Observable<boolean> {
    const ids = [];
    users.forEach(user => {
        ids.push(user.id);
    });
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json; charset=utf-8'});
    return this._http.put(InsidersConstants.apiUrlActivateDIS, ids, {headers: headers})
      .map(response => response as boolean);
    
  }

    public deactivateDIS(users: any[]): Observable<boolean> {
        const ids = [];
        users.forEach(user => {
            ids.push(user.id);
        });
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8'});
        return this._http.put(InsidersConstants.apiUrlDeactivateDIS, ids, {headers: headers})
          .map(response => response as boolean);
        
      }

      
      public activatePilote(users: any[]): Observable<boolean> {
        const ids = [];
        users.forEach(user => {
            ids.push(user.id);
        });
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8'});
        return this._http.put(InsidersConstants.apiUrlActivatePilote, ids, {headers: headers})
          .map(response => response as boolean);
        
      }
    
        public desactivatePilote(users: any[]): Observable<boolean> {
            const ids = [];
            users.forEach(user => {
                ids.push(user.id);
            });
            const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'});
            return this._http.put(InsidersConstants.apiUrlDeactivatePilote, ids, {headers: headers})
              .map(response => response as boolean);
            
          }   
   public getPiloteByMail(email: string): Observable<any>{
    const dataParams = new HttpParams().set( 'email' , email);
    return this._http.get<any>(InsidersConstants.apiUrlGetPiloteByEmail, { params: dataParams })
            .map(response => response as any);
}

public getPiloteByEMail(email: string): Observable<any>{
    const dataParams = new HttpParams().set( 'email' , email);
    return this._http.get<any>(InsidersConstants.apiUrlGetPiloteBymail, { params: dataParams })
            .map(response => response as any);
}

}
