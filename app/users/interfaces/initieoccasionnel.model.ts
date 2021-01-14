import { Pilote } from "./pilote.model";

export interface Initieoccasionnel {

    id: string;
    nom: string;
    prenom: string;
    fonction: string;
    profil: string;
    statutSignature: string;
    //referent: string;
    etat: boolean;
    condition: string;
    adresseMail: string;
    nomNaissance: string;
    raison: string;
    dateInscription: Date;
    dateSignature: Date;
    dateFinInscription: Date;
    dateNaissance: Date;
    numIdentifNational: string;
    nomEntreprise: string;
    nomRueEnt: string;
    numRueEnt:string;
    complementAdresseEnt:string;
    villeEnt:string;
    codePostalEnt: string;
    paysEnt: string;
    numProFixe: string;
    numeroMobile: string;
    numPriveFixe:string;
    numPriveMobile: string;
    nomRuePr:string;
    numRuePr:string;
    complementAdressePr:string;
    villePr:string;
    codePostalPr:string;
    paysPr:string;
    projets?: any[];
    pilote:Pilote;


}
