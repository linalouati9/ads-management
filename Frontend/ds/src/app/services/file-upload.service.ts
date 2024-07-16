import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor(private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string) { }
   
  upload(files: File[],id:string, bienType: String): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    // Ajoutez d'autres champs si nécessaire
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.baseUrl}${bienType}/upload/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  download(id: string, bienType: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}${bienType}/download/${id}`);
  }
  
  
}
