export class InsidersConstants {

    public static readonly PARAM_URL_PATH = 'path';


    
    // public static readonly apiUrlReferents = '/INSIDERS/rest/Referent/all';
    // public static readonly apiUrlReferents = 'http://localhost:8888/ref.json';
    // public static readonly apiUrlUsers = 'http://localhost:8080/INSIDERS/rest/Users/all';
    // public static readonly apiUrlPeriode = 'http://localhost:8080/INSIDERS/rest/periode/all';
    // public static readonly apiUrlReferents = 'http://localhost:8080/INSIDERS/rest/Referent/all';
    // public static readonly apiUrlUsers = 'http://10.68.124.25:8080/INSIDERS/rest/Users/all';
    // public static readonly apiUrlPeriode = 'http://10.68.124.25:8080/INSIDERS/rest/periode/all';
    // public static readonly apiUrlReferents = 'http://10.68.124.25:8080/INSIDERS/rest/Referent/all';


  

    // backend url server
    public static readonly APP_URI = '/INSIDERS/rest/';
    //public static readonly APP_URI = 'http://localhost:8080/INSIDERS/rest/';
    // public static readonly APP_URI = '/INSIDERS/rest/';
    // public static readonly APP_URI = 'http://localhost:8080/INSIDERS/rest/';
    public static readonly apiUrlUsers = InsidersConstants.APP_URI + 'Users/all';
    //public static readonly apiUrlModification=InsidersConstants.APP_URI +'modification';
    
    // public static readonly apiUrlUsers ='http://localhost:8888/all.json';
    public static readonly apiUrlPeriode = InsidersConstants.APP_URI +'periode/all';
    public static readonly apiShowPeriod = InsidersConstants.APP_URI + 'periode/getPeriode'
    public static readonly apigetNotifiedUsPeriod = InsidersConstants.APP_URI + 'periode/notifiedUsers'
    public static readonly apiUrlConfProfile = InsidersConstants.APP_URI + 'setting/confProfile'
    public static readonly apiUrlReferents = InsidersConstants.APP_URI +'Referent/all';
    public static readonly apiUrlInitByPilote=InsidersConstants.APP_URI+"initieOccasionnel/getInitieOccaByPilote";
    public static readonly apiUrlDisByCoresp=InsidersConstants.APP_URI+"dis/getDisByCorrespondant";
   

    
    // projet
    public static readonly apiUrlProject = InsidersConstants.APP_URI + 'projet/';
    public static readonly apiUrlAllProjects = InsidersConstants.apiUrlProject + 'getAll';
    public static readonly apiUrlAllProjectsNotLinked = InsidersConstants.apiUrlProject + 'getAllNotLinked';
    public static readonly apiUrlAllProjectsByPilote = InsidersConstants.apiUrlProject + 'getProjetByPilot';
    public static readonly apiUrlAddPiloteToProject = InsidersConstants.apiUrlProject + 'addProjetsToPilote';
    public static readonly apiUrlAddProjectsToInitOcca = InsidersConstants.apiUrlProject + 'addProjetsToInitOcca';
    public static readonly apiUrlAllProjectsByOccas = InsidersConstants.apiUrlProject + 'getProjetByInitOcca';
    public static readonly apiUrlLinkProjectsToPilote = InsidersConstants.apiUrlProject + 'linkProjetsToPilote';
    public static readonly apiUrlAllProjectsByIC = InsidersConstants.apiUrlProject + 'getListProjectsByIC';
    // Initié Permanent
    public static readonly apiUrlInitiePermanent = InsidersConstants.APP_URI + 'initiePermanent/';
    public static readonly apiUrlAllInitiePermanent = InsidersConstants.apiUrlInitiePermanent + 'all';
    public static readonly apiUrlAddInitiePermanent = InsidersConstants.apiUrlInitiePermanent + 'add';
    public static readonly apiUrlGetInitiePermanentById = InsidersConstants.apiUrlInitiePermanent + 'getInitie';
    public static readonly apriUrlGetInitiePermanentByMail = InsidersConstants.apiUrlInitiePermanent + 'getInitieByMail';
    public static readonly apiUrlUpdateInitiePermanent = InsidersConstants.apiUrlInitiePermanent + 'update';
    public static readonly apriUrlGetInitiePermanent = InsidersConstants.apiUrlInitiePermanent +'getInitie';
    public static readonly apriUrlUpdateInitiePermanent = InsidersConstants.apiUrlInitiePermanent +'updateInitie/';
    public static readonly apriUrlDeleteInitiePermanent = InsidersConstants.apiUrlInitiePermanent +'deleteInitie';
    
   
   
   


    // /INSIDERS/rest/initiePermanent/updateInitie/
   //  /INSIDERS/rest/initiePermanent/getInitie?id=
    // Initié Occasionnel
    public static readonly apiUrlInitieOccasionnel = InsidersConstants.APP_URI + 'initieOccasionnel/';
    public static readonly apiUrlAddInitieOccasionnel = InsidersConstants.apiUrlInitieOccasionnel + 'add';
    public static readonly apiUrlGetInitieOccasionnelById = InsidersConstants.apiUrlInitieOccasionnel + 'getInitieOccasionnel';
    public static readonly apiUrlUpdateInitieOccasionnel = InsidersConstants.apiUrlInitieOccasionnel + 'update';
    public static readonly apriUrlGetInitieOccasionnel = InsidersConstants.apiUrlInitieOccasionnel +'getInitieOccasionnel';
    public static readonly apriUrlGetInitieOccasionnelByMail = InsidersConstants.apiUrlInitieOccasionnel +'getInitieOccasionnelByMail';
    
    public static readonly apriUrlUpdateInitieOccasionnel = InsidersConstants.apiUrlInitieOccasionnel +'updateInitieOccasionnel/';
    public static readonly apriUrlDeleteInitieOccasionnel = InsidersConstants.apiUrlInitieOccasionnel +'deleteInitie';
    public static readonly apiUrlGetInitieOccaByPilote= InsidersConstants.apiUrlInitieOccasionnel + 'getInitieOccaByPilote';
   
    // Administrateur
    public static readonly apiUrlAdministrateur = InsidersConstants.APP_URI + 'administrateur/';
    public static readonly apiUrlAddAdministrateur = InsidersConstants.apiUrlAdministrateur + 'add';
    public static readonly apiUrlGetAdministrateurById = InsidersConstants.apiUrlAdministrateur + 'getAdminById';
    public static readonly apiUrlUpdateAdministrateur = InsidersConstants.apiUrlAdministrateur + 'update';
    // Correspondant
    public static readonly apiUrlCorrespondant = InsidersConstants.APP_URI + 'correspondant/';
    public static readonly apiUrlAllCorrespondant = InsidersConstants.apiUrlCorrespondant + 'allCorrespondant';
    public static readonly apiUrlAddCorrespondant = InsidersConstants.apiUrlCorrespondant + 'add';
    public static readonly apiUrlGetCorrespondantById = InsidersConstants.apiUrlCorrespondant + 'getcorresp';
    public static readonly apiUrlUpdateCorrespondant = InsidersConstants.apiUrlCorrespondant + 'update';
    public static readonly apiUrlGetCorrespondantByEmail = InsidersConstants.apiUrlCorrespondant + 'getCorrespondantByEmail';
    // Pilote
    public static readonly apiUrlPilote = InsidersConstants.APP_URI + 'pilote/';
    public static readonly apiUrlAllPilote = InsidersConstants.apiUrlPilote + 'allPilote';
    public static readonly apiUrlAddPilote = InsidersConstants.apiUrlPilote + 'add';
    public static readonly apiUrlGetPiloteById = InsidersConstants.apiUrlPilote + 'getPiloteById';
    public static readonly apiUrlUpdatePilote = InsidersConstants.apiUrlPilote + 'update';
    public static readonly apiUrlGetPiloteBymail = InsidersConstants.apiUrlPilote + 'getPiloteByEMail';
    public static readonly apiUrlActivatePilote = InsidersConstants.apiUrlPilote + 'activate';
    public static readonly apiUrlDeactivatePilote = InsidersConstants.apiUrlPilote + 'deactivate';
    // DIS
    public static readonly apiUrlDIS = InsidersConstants.APP_URI + 'dis/';
    public static readonly apiUrlAddDIS = InsidersConstants.apiUrlDIS + 'add';
    public static readonly apiUrlGetDISById = InsidersConstants.apiUrlDIS + 'getdis';
    public static readonly apiUrlUpdateDIS = InsidersConstants.apiUrlDIS + 'update';
    public static readonly apiUrlGetDISByConnectedCorresp = InsidersConstants.apiUrlDIS + 'getDisByConnectedCorresp';
    public static readonly apiUrlActivateDIS = InsidersConstants.apiUrlDIS + 'activate';
    public static readonly apiUrlDeactivateDIS = InsidersConstants.apiUrlDIS + 'deactivate';
    public static readonly apriUrlGetDISByMail= InsidersConstants.apiUrlDIS +'getDISByMail';

    // Mail /mail/sendmail
    public static readonly apiUrlMail = InsidersConstants.APP_URI + 'mail/';
    public static readonly apiUrlSendMail = InsidersConstants.apiUrlMail + 'sendmail'; 
    public static readonly apiUrlSendSimpleMail = InsidersConstants.apiUrlMail + 'sendSimplemail';
    
    

     // Mail /mail/sendmail
     public static readonly apiUrlConnectedUser = InsidersConstants.APP_URI + 'utilisateur/connecteduser';
     

    // Route
    public static readonly ROUTE_USERS = 'angular/utilisateurs';
    public static readonly ROUTE_HOME = 'angular/home';
    public static readonly ROUTE_PERIODES = 'angular/periodes';
    public static readonly ROUTE_REFERENTS = 'angular/referents';
    public static readonly ROUTE_DIS='INSIDERS/app/index.html';
  
    public static readonly ROUTE_ADDUSER = 'addUser';
    public static readonly ROUTE_MAJLISTDIS = 'listMAJDIS';
    public static readonly ROUTE_ADDPERIOD = 'addPeriod';
    public static readonly ROUTE_INITIEPERMANENT="formInitiePermanent";
    public static readonly ROUTE_INITIEPERMANENT_REDIRECT=InsidersConstants.ROUTE_USERS + '/' + InsidersConstants.ROUTE_INITIEPERMANENT;
    public static readonly ROUTE_FULLADDUSER = InsidersConstants.ROUTE_USERS + '/' + InsidersConstants.ROUTE_ADDUSER;
    public static readonly ROUTE_FULLMAJLISTDIS = InsidersConstants.ROUTE_USERS + '/' + InsidersConstants.ROUTE_MAJLISTDIS;
    public static readonly ROUTE_INITIEOCCASIONNEL="formInitieOccasionnel";
    public static readonly ROUTE_INITIEOCCASIONNEL_REDIRECT=InsidersConstants.ROUTE_USERS + '/' + InsidersConstants.ROUTE_INITIEOCCASIONNEL;
    public static readonly ROUTE_PILOTE_INITIEOCCA= InsidersConstants.ROUTE_USERS+ '/referent/majInitieOccasionnel';
    //public static readonly ROUTE_FULLADDINITIOCCA = InsidersConstants.ROUTE_USERS + '/' + InsidersConstants.ROUTE_ADDUSER;
    public static readonly ROUTE_SHOWPERIOD = 'showPeriod';
    
    public static readonly ROUTE_listeinities = 'listeinities';
    public static readonly ROUTE_listeDis = 'listeDis';
    

    
      // LOCAL  AND SESSION STORAGE KIES
    public static readonly KEY_USER = 'user';


    // ROLES
    public static readonly ROLE_ADMIN = 'ADMIN';
    public static readonly ROLE_INITIEPERMANENT = 'INITIE PERMANENT';
    public static readonly ROLE_INITIEOCCASIONNEL = 'INITIE OCCASIONNEL';
    public static readonly ROLE_DIS = 'DIS';
    public static readonly ROLE_CORRESPANDANT = 'CORRESPANDANT';
    public static readonly ROLE_PILOTE = 'PILOTE';

    // temp data to remove By marouane.
    public static readonly apiUrlInitePerma = 'http://localhost:8888/InitiePerm.json';
    public static readonly apiUrlIniteOcas = 'http://localhost:8888/InitieOccas.json';
    public static readonly apriUrlGetInitiePermanentByRef = 'http://localhost:8888/InitieOccas.json';

    // Modification
    public static readonly apiUrlModification = InsidersConstants.APP_URI + 'modification/';
    public static readonly apiUrlSetModification = InsidersConstants.apiUrlModification + 'setModification';
    public static readonly apiUrlGetModificationsByReferent = InsidersConstants.apiUrlModification + 'getModificationsByReferent'; 
    public static readonly apiUrlGetPiloteByEmail = InsidersConstants.apiUrlPilote + 'getPiloteByMail';
    public static readonly getModificationsByReferentInitie =InsidersConstants.apiUrlModification+'getModificationsByReferentInitie';
    public static readonly setValidateSingleByColumn =InsidersConstants.apiUrlModification+'validate';
    public static readonly ignoreSingleByColumn =InsidersConstants.apiUrlModification+'invalidate';
    public static readonly validateAll=InsidersConstants.apiUrlModification+'validateModifications';
    public static readonly rejectAll=InsidersConstants.apiUrlModification+'RejectModifications';
    

}
