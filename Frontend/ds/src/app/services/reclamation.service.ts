import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs';
import { Reclamation } from 'src/shared/Reclamations';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient, 
    private processHttpmsgService: ProcessHttpmsgService,
    @Inject('BaseURL') private baseUrl:String) { }


  public sendReclamation(reclamation: Reclamation):Observable<Reclamation>{
    return this.http.post<Reclamation>(this.baseUrl+"reclamations", reclamation);
  }
}
