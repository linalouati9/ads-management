import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Maison } from 'src/shared/Maison';
import { villesTunisie } from 'src/shared/villeTunisie';
import { BiensService } from '../services/biens.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-edit-maison',
  templateUrl: './edit-maison.component.html',
  styleUrls: ['./edit-maison.component.css']
})
export class EditMaisonComponent {
  villesTunisie = villesTunisie;
  maison: Maison = {
    id: '',
    type_offre: '',
    categorie: 'Maison',
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
    },
    superficie_habitale: '', 
    nbr_chambres: 0, 
    nbr_salles_de_bains: 0, 
    annee_construction: 1900 
  };

  identifiant : string;
  selectedImages: File[] = []; // Variable temporaire pour stocker les images sélectionnées
  
  message = "";

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private biensServices: BiensService,
    private fileUploadService: FileUploadService){ }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(result => {
        this.identifiant = result.get("id")
        if (this.identifiant !== "-1") {
          this.initMaison(this.identifiant);
        }
      });
    }

    initMaison(id: string){
    this.biensServices.getMaisonById(id).subscribe(
      maison => {
        this.maison = maison;
        console.log(this.maison);
      },
      error => {
        console.error("Erreur lors de la récupération de la maison :", error);
      }
    );
  }

  addMaison(form: NgForm) {
    console.log(this.maison);
    if (this.maison.id === '') {
      const randomInt = Math.floor(Math.random() * 1000000); 
      const id = "maison" + randomInt;
      this.maison.id = id; 
      
      this.biensServices.addMaison(this.maison).subscribe(
        (maison) => {
          console.log(maison);
          if(this.selectedImages.length > 0){
            this.fileUploadService.upload(this.selectedImages, this.maison.id, "maisons").subscribe(
              (response) => {console.log("Done: téléchargements avec succés !!")},
              (error) => {console.log("error lors du téléchargements des images au maison")} 
            );
          }
          
          this.router.navigateByUrl('/annonces');
        },
        (erreur) => {
          console.error("Erreur lors de l'ajout de la maison :", erreur);
        }
      );
    } else {
      this.biensServices.updateMaison(this.maison).subscribe(
        (maison) => {
          console.log(maison);
          if(this.selectedImages.length > 0){
            this.fileUploadService.upload(this.selectedImages, this.maison.id, "maisons").subscribe(
              (response) => {console.log(response);},
              (error) => {console.log(error);} 
            );
          }
          
          this.router.navigateByUrl('/annonces');
        },
        (erreur) => {
          console.error("Erreur lors du mise à jour de la maison:", erreur);
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
