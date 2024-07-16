import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse|any){
    let errMsg: string

    if(error.error instanceof ErrorEvent){
      // cela signifie qu'il s'agit d'une erreur côté client, par exemple une erreur de réseau
      errMsg = error.error.message;
    }else{
      // cela signifie que l'erreur provient du serveur
      errMsg = `Server Error : ${error.status} - ${error.statusText || ''} ${error.error}`
    }
    return throwError(errMsg)
  }
}
