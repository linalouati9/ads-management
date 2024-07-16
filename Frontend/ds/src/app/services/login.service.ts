import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { Admin } from 'src/shared/Admin';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, 
    private processHttpmsgService: ProcessHttpmsgService,
    @Inject('BaseURL') private baseUrl:String) { }

    isAdmin(admin: Admin): Observable<boolean> {
      return this.http.post<boolean>(this.baseUrl+"admins/login", admin);
    }
    
}
