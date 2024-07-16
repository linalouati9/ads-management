import { Component, Inject, OnInit } from '@angular/core';
import { Terrain } from 'src/shared/Terrain';
import { BiensService } from '../services/biens.service';
import { Router } from '@angular/router';
import { Maison } from 'src/shared/Maison';
import { villesTunisie } from 'src/shared/villeTunisie';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, forkJoin} from 'rxjs';
import { LoginService } from '../services/login.service';
import { FileUploadService } from '../services/file-upload.service';


@Component({
  selector: 'app-biens',
  templateUrl: './biens.component.html',
  styleUrls: ['./biens.component.css']
})
export class BiensComponent implements OnInit{

  maisons:Maison[] = []
  terrains:Terrain[] = []
  biens = []

  disabledModal = true
  villesTunisie = villesTunisie
  formulaire: FormGroup;

  afficherTerrains = false;
  afficherMaisons = false;

  isAdmin = false;

  errMsg: string;
  isWaiting:boolean = true;

  constructor(private router: Router, 
    private biensService: BiensService, 
    @Inject('BaseURL') public baseUrl: String, 
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService){ }

  initForm(){
    this.formulaire = this.formBuilder.group({
      vente: false,
      location: false,

      maison: false,
      terrain: false,

      villeSelect: [[]], // Si vous utilisez le select multiple

      superficieMinTerrain: '',
      superficieMaxTerrain: '',
        
      prixMin: '',
      prixMax: '',
      
      superficieMinMaison: '',
      superficieMaxMaison: '',
    
      superficieHMin: '',
      superficieHMax: '',

      prixMinMaison: '',
      prixMaxMaison: '',

      nombreDeChambres: '',
      nombreDeSallesDeBains: '',
      anneeConstruction: ''
    });
  }
  
  ngOnInit(): void {
    this.initForm();
    forkJoin([
      this.biensService.getMaisons(),
      this.biensService.getTerrains()
    ]).subscribe(([maisons, terrains]) => {
      this.maisons = maisons;
      this.terrains = terrains;

      this.maisons.forEach((maison) => {
        console.log(maison.titre_annonce);
        this.fileUploadService.download(maison.id, "maisons").subscribe(
          (response) => { 
            console.log(response);
            maison.images = response;
          },
            (_) => {
                console.log("Erreur lors du téléchargement des images pour la maison avec l'ID", maison.id);
            }
        );
      });

      this.terrains.forEach((terrain) => {
        console.log(terrain.titre_annonce);
        this.fileUploadService.download(terrain.id, "terrains").subscribe(
          (response) => { 
            console.log(response);
            terrain.images = response;
          },
            (_) => {
                console.log("Erreur lors du téléchargement des images pour le terrain avec l'ID", terrain.id);
            }
        );
      });
    
      this.biens.push(...this.maisons, ...this.terrains);
      console.log("Length of biens "+this.biens.length);
      this.isWaiting = false;
    },
    (erreurs) => {
      this.errMsg = <any> erreurs;
    }
    ); 

    const isAdminStored = localStorage.getItem('isAdmin');
    if (isAdminStored !== null) {
      // Convert the string value back to boolean
      this.isAdmin = isAdminStored === 'true'; // Parse string to boolean
    }
  }  

  showDetails(id: string) {
    this.router.navigate(['/annonces/'+id]);
  }

  filtreAnnonces() {
    const valeursFormulaire = this.formulaire.value;
    console.log(valeursFormulaire);

    this.biens = this.biens.filter(bien => {
        // Filtrer par type d'offre (à vendre ou à louer)
        console.log(valeursFormulaire.vente, "--", bien.type_offre);
        const correspondTypeOffre = (!valeursFormulaire.vente && !valeursFormulaire.location) || 
                                    (valeursFormulaire.vente && bien.type_offre === 'avendre') || 
                                    (valeursFormulaire.location && bien.type_offre === 'alouer');

        // Filtrer par catégorie
        const correspondCategorie = (!valeursFormulaire.maison && !valeursFormulaire.terrain) ||
                                     (valeursFormulaire.maison && bien.categorie === 'Maison') ||
                                     (valeursFormulaire.terrain && bien.categorie === 'Terrain');

        // Filtrer par ville
        const correspondVille = valeursFormulaire.villeSelect.length === 0 || valeursFormulaire.villeSelect.includes(bien.ville);

        /// Filtrer par superficie et prix du terrain
        const correspondSuperficieTerrain = (!valeursFormulaire.superficieMinTerrain && !valeursFormulaire.superficieMaxTerrain) ||
                                            (bien.categorie === 'Terrain' && 
                                            (!valeursFormulaire.superficieMinTerrain || parseFloat(bien.superficie) >= parseFloat(valeursFormulaire.superficieMinTerrain)) && 
                                            (!valeursFormulaire.superficieMaxTerrain || parseFloat(bien.superficie) <= parseFloat(valeursFormulaire.superficieMaxTerrain)));

        const correspondPrixTerrain = (!valeursFormulaire.prixMin && !valeursFormulaire.prixMax) ||
                                            (bien.categorie === 'Terrain' && 
                                            (!valeursFormulaire.prixMin || bien.prix && (parseFloat(bien.prix) >= parseFloat(valeursFormulaire.prixMin))) && 
                                            (!valeursFormulaire.prixMax || bien.prix && (parseFloat(bien.prix) <= parseFloat(valeursFormulaire.prixMax))) 
                                      );
        // Filtrer par superficie et prix de la maison
        //superficie de la maison en totalité 
        const correspondSuperficieMaison = (!valeursFormulaire.superficieMinMaison && !valeursFormulaire.superficieMaxMaison) ||
                                            (bien.categorie === 'Maison' && 
                                            (!valeursFormulaire.superficieMinMaison || parseFloat(bien.superficie) >= parseFloat(valeursFormulaire.superficieMinMaison)) && 
                                          (!valeursFormulaire.superficieMaxMaison || parseFloat(bien.superficie) <= parseFloat(valeursFormulaire.superficieMaxMaison)));
        //superficie habitale (<superficie) càd que la maison peut avoir une jardin
        const correspondSuperficieHMaison = (!valeursFormulaire.superficieHMin && !valeursFormulaire.superficieHMax) ||
                                            (bien.categorie === 'Maison' && 
                                            (!valeursFormulaire.superficieHMin || parseFloat(bien.superficie_habitale) >= parseFloat(valeursFormulaire.superficieHMin)) && 
                                            (!valeursFormulaire.superficieHMax || parseFloat(bien.superficie_habitale) <= parseFloat(valeursFormulaire.superficieHMax)));

        const correspondPrixMaison = (!valeursFormulaire.prixMinMaison && !valeursFormulaire.prixMaxMaison) ||
                                    (bien.categorie === 'Maison' && 
                                    (!valeursFormulaire.prixMinMaison || bien.prix && parseFloat(bien.prix) >= parseFloat(valeursFormulaire.prixMinMaison)) && (!valeursFormulaire.prixMaxMaison || bien.prix && parseFloat(bien.prix) <= parseFloat(valeursFormulaire.prixMaxMaison)));
      
        // Filtrer par nombre de chambres, salles de bains et année de construction
        const correspondNC = !valeursFormulaire.nombreDeChambres || bien.nbr_chambres == parseInt(valeursFormulaire.nombreDeChambres);

        const correspondNSDB = !valeursFormulaire.nombreDeSallesDeBains || bien.nbr_salles_de_bains == valeursFormulaire.nombreDeSallesDeBains;
        const correspondAnnee = !valeursFormulaire.anneeConstruction || bien.annee_construction == valeursFormulaire.anneeConstruction;
        
        return correspondTypeOffre && correspondCategorie && correspondVille && correspondSuperficieTerrain 
        && correspondPrixTerrain && correspondSuperficieMaison && correspondSuperficieHMaison &&
        correspondPrixMaison && correspondNC && correspondNSDB && correspondAnnee;
    });

    console.log(this.biens);
}

  deleteBien(id: string){
    //delete Bien
    if(id.includes('maison')){
      this.biensService.deleteMaisonById(id).subscribe(
        (res) => {
          let indexToDelete = this.biens.findIndex(maison => maison.id === id);
          this.biens.splice(indexToDelete, 1);
        }, 
        (err) => {
          console.log(err);
          this.errMsg = <any> err;
        }
      );
    }else{
      this.biensService.deleteTerrainById(id).subscribe(
        (res) => {
          let indexToDelete = this.biens.findIndex(maison => maison.id === id);
          this.biens.splice(indexToDelete, 1);
        }, 
        (err) => {
          console.log(err);
          this.errMsg = <any> err;
        }
      );
    }
    this.router.navigate(['/annonces']);
  }

  editBien(id: string){
    if(id.includes('maison')){
      this.router.navigate(['/edit-maison/'+id]);
    }else{
      this.router.navigate(['/edit-terrain/'+id]);
    }
  }
}