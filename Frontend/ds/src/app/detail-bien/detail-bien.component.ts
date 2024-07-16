import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiensService } from '../services/biens.service';
import { Maison } from 'src/shared/Maison';
import { Terrain } from 'src/shared/Terrain';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-detail-bien',
  templateUrl: './detail-bien.component.html',
  styleUrls: ['./detail-bien.component.css']
})
export class DetailBienComponent implements OnInit {

  maisons: Maison[] = [];
  terrains: Terrain[] = [];
  biens = [];
  bien = null;
  
  isWaiting:boolean = true;
  errMsg: string;

  constructor(private route: ActivatedRoute, 
    private biensService: BiensService, 
    @Inject('BaseURL') public baseUrl: String,
  private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(this.biens);
      const idBien = params.get('id');
      if(idBien.includes('maison')){
        this.biensService.getMaisonById(idBien).subscribe(
          (maison) => {
            console.log(maison);
            
            this.fileUploadService.download(maison.id, "maisons").subscribe(
              (response) => { 
                console.log(response);
                maison.images = response;
                this.bien = maison;
                this.isWaiting = false
              },
                (error) => {
                    console.log("Erreur lors du téléchargement des images pour le terrain avec l'ID", maison.id);
                }
            );
          }, (error) => {
            this.errMsg = <any> error;
          }
        );
      }else{
        this.biensService.getTerrainById(idBien).subscribe(
          (terrain) => {
            console.log(terrain);
            
            this.fileUploadService.download(terrain.id, "terrains").subscribe(
              (response) => { 
                console.log(response);
                terrain.images = response;
                this.bien = terrain;
                this.isWaiting = false
              },
                (error) => {
                    console.log("Erreur lors du téléchargement des images pour le terrain avec l'ID", terrain.id);
                }
            );
          }, (error) => {
            this.errMsg = <any> error;
          }
        );
      }
    },
    (error) => this.errMsg = <any> error
    );
    console.log('---------');
    console.log(this.errMsg);
  }
}
