import { Injectable } from '@angular/core';

@Injectable()
export class CrypturlparamsService {

  result:string;
  constructor() { }

  cryptUrlParams(param:string):string
  {
    this.result=param.replace("a","aa");
    this.result=this.result.replace("b","bb");
    this.result=this.result.replace(" ","aba");

    return this.result;
  }

}
