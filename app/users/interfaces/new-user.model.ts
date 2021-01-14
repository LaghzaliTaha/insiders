export interface NewUser {
    id?:number;
    profil: string;
    nom: string;
    prenom: string;
    adresseMail: string;
    numeroMobile: string;
    condition?: string;
    isCorrespondant?: boolean;
    etat?: boolean;
    pilote?: NewUser;
    fonction?: string;
    numProPortable?: string;
    referent?: NewUser;
    designePar?: NewUser;
    raison?: string;
    entite?: string;
    comex?: NewUser;
    projets?: any[];
    urlFill?: string;
    urlFillOccas?: string;
    urlFillDis?: string;
    nomEntreprise:string;
    villeEnt:string;
    statutSignature?:string;
    projetpilote?: any[];
}
