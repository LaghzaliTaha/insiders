import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CoreService {
  private currentPos: string;
  private currnetClass: string;

  constructor() { }

  public getcurrentPos(): string {
    return this.currentPos;
  }
  public setcurrentPos(current: string) {
    this.currentPos = current;
  }
  //for active class in sidebar
  public getCurrentClass(): string {
    return this.currnetClass;
  }
  public setCurrentClass(currentC: string) {
    this.currnetClass = currentC;
  }

  public 

  public handleError(err: HttpErrorResponse): Observable<any> {
    // if (err.error instanceof Error) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   // console.log('An error occurred:', err.error.message);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   // console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    // }
 
    return Observable.throw(err);
  }
 
  public encodeText(text: string): string {
    var map = {
      "à": "&agrave;",  "á": "&aacute;",  "â": "&acirc;", "ä": "&auml;",
      "ã": "&atilde;",  "å": "&aring;", "Á": "&Aacute;",  "À": "&Agrave;",
      "Â": "&Acirc;", "Ä": "&Auml;",  "Ã": "&Atilde;",
      "Å": "&Aring;", "ç": "&ccedil;",  "Ç": "&Ccedil;",  "é": "&eacute;", 
      "è": "&egrave;",  "ê": "&ecirc;", "ë": "&euml;",  "É": "&Eacute;", 
      "È": "&Egrave;",  "Ê": "&Ecirc;", "Ë": "&Euml;",  "í": "&iacute;",
      "ì": "&igrave;",  "î": "&icirc;", "ï": "&iuml;",  "Í": "&Iacute;",
      "Ì": "&Igrave;",  "Î": "&Icirc;", "Ï": "&Iuml;",  "ñ": "&ntilde;",
      "Ñ": "&Ntilde;",  "ó": "&oacute;",  "ò": "&ograve;",  "ô": "&ocirc;",
      "ö": "&ouml;",  "õ": "&otilde;",  "Ó": "&Oacute;",  "Ò": "&Ograve;",
      "Ô": "&Ocirc;", "Ö": "&Ouml;",  "Õ": "&Otilde;",  "ú": "&uacute;",
      "ù": "&ugrave;",  "û": "&ucirc;", "ü": "&uuml;",  "Ú": "&Uacute;",
      "Ù": "&Ugrave;",  "Û": "&Ucirc;", "Ü": "&Uuml;",  "ý": "&yacute;",
      "ÿ": "&yuml;",  "Ý": "&Yacute;"
  };
  return text.replace(/[àáâäãåÁÀÂÄÃÅçÇéèêëÉÈÊËíìîïÍÌÎÏñÑóòôöõÓÒÔÖÕúùûüÚÙÛÜýÿÝ]/g, function(m) { return map[m]; });
  
  } 

}
