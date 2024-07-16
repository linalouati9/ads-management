import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Maison } from 'src/shared/Maison';
import { Terrain } from 'src/shared/Terrain';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class BiensService {

  httpOptions = {
    headers: new HttpHeaders({"content-type" : "application/json"})
  };  

  constructor(private http: HttpClient, 
    private processHttpmsgService: ProcessHttpmsgService,
    @Inject('BaseURL') private baseUrl:String) { }

  getMaisons():Observable<Maison[]>{
    console.log(this.http.get<Maison[]>(this.baseUrl+"maisons"));
    return this.http.get<Maison[]>(this.baseUrl+"maisons").pipe(catchError(this.processHttpmsgService.handleError));
  }

  getTerrains():Observable<Terrain[]>{
    return this.http.get<Terrain[]>(this.baseUrl+"terrains").pipe(catchError(this.processHttpmsgService.handleError));
  }

  getMaisonById(id: string): Observable<Maison> {
    return this.http.get<Maison>(this.baseUrl+"maisons/"+id).pipe(catchError(this.processHttpmsgService.handleError));
  }

  getTerrainById(id: string): Observable<Terrain> {
    return this.http.get<Terrain>(this.baseUrl+"terrains/"+id).pipe(catchError(this.processHttpmsgService.handleError));
  }

  addMaison(maison: Maison):Observable<Maison>{
    return this.http.post<Maison>(this.baseUrl+"maisons", maison, this.httpOptions).pipe(catchError(this.processHttpmsgService.handleError));
  }

  addTerrain(terrain: Terrain):Observable<Terrain>{
    return this.http.post<Terrain>(this.baseUrl+"terrains", terrain, this.httpOptions).pipe(catchError(this.processHttpmsgService.handleError));
  }

  updateMaison(maison: Maison): Observable<Maison> {
    if (!maison.id) {
        // Gérer le cas où l'ID est manquant
        console.error("ID de la maison manquant");
        return throwError("ID de la maison manquant");
    }
    return this.http.put<Maison>(`${this.baseUrl}maisons/${maison.id}`, maison, this.httpOptions).pipe(catchError(this.processHttpmsgService.handleError));
  }

  updateTerrain(terrain: Terrain):Observable<Terrain>{
    return this.http.put<Terrain>(this.baseUrl+"terrains/"+terrain.id, terrain, this.httpOptions).pipe(catchError(this.processHttpmsgService.handleError));
  }
  
  deleteMaisonById(id: string): any{
    return this.http.delete<any>(this.baseUrl+"maisons/"+id).pipe(catchError(this.processHttpmsgService.handleError));
  }

  deleteTerrainById(id: string): any{
    return this.http.delete<any>(this.baseUrl+"terrains/"+id).pipe(catchError(this.processHttpmsgService.handleError));
  }
}
