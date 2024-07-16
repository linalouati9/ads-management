import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Terrain } from 'src/shared/Terrain';
import { villesTunisie } from 'src/shared/villeTunisie';
import { BiensService } from '../services/biens.service';
import { NgForm } from '@angular/forms';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-edit-terrain',
  templateUrl: './edit-terrain.component.html',
  styleUrls: ['./edit-terrain.component.css']
})
export class EditTerrainComponent {
  villesTunisie = villesTunisie;
  //photoUrls: string = '';
  terrain: Terrain = {
    id: '',
    type_offre: '',
    categorie: 'Terrain',
    superficie: '',
    titre_annonce: '', 
    description: '', 
    prix: '', 
    region: '', 
    ville: '', 
    images: [],
    contact: {
      nom: '', 
      prenom: '', 
      email: '',
      telephone: ''
    }
  };

  identifiant : string;
  selectedImages: File[] = []; // Variable temporaire pour stocker les images sélectionnées
  
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private biensServices: BiensService,
    private fileUploadService: FileUploadService){ }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(result => {
      this.identifiant = result.get("id")
      if (this.identifiant !== "-1") {
        this.initTerrain(this.identifiant);
      }
    });
  }

  initTerrain(id: string) {
    this.biensServices.getTerrainById(id).subscribe(
      terrain => {
        //this.photoUrls = terrain.images.join(',');
        this.terrain = terrain;
        console.log(this.terrain);
      }
    );
  }
  
  addTerrain(form: NgForm) {
    console.log(this.terrain);
    if (this.terrain.id === '') {
      // Ajoutez le nouveau terrain
      // Générer un identifiant aléatoire pour le terrain
      const randomInt = Math.floor(Math.random() * 1000000); // Vous pouvez choisir une plage plus large selon vos besoins
      const id = "terrain" + randomInt;
      this.terrain.id = id; 
      
      this.biensServices.addTerrain(this.terrain).subscribe(
        (terrain) => {
          console.log(terrain);
          if(this.selectedImages.length > 0){
            // L'administrateur a séléctionné des images pour le bien terrain
            this.fileUploadService.upload(this.selectedImages, this.terrain.id, "terrains").subscribe(
              (response) => {console.log("Done: téléchargements avec succés !!")},
              (error) => {console.log("error lors du téléchargements des images au terrain")} 
            );
          }
          
          this.router.navigateByUrl('/annonces');
        },
        (erreur) => {
          console.error("Erreur lors de l'ajout du terrain :", erreur);
        }
      );
    } else {
      this.biensServices.updateTerrain(this.terrain).subscribe(
        (terrain) => {
          console.log(terrain);
          if(this.selectedImages.length > 0){
            this.fileUploadService.upload(this.selectedImages, this.terrain.id, "terrains").subscribe(
              (response) => {console.log(response);},
              (error) => {console.log(error);} 
            );
          }
          
          this.router.navigateByUrl('/annonces');
        },
        (erreur) => {
          console.error("Erreur lors de la mise à jour du terrain :", erreur);
        }
      );
    }
  }

  onFileChange(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);
    }
  }  
  
}
