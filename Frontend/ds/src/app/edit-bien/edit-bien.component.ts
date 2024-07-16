import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { villesTunisie } from 'src/shared/villeTunisie';
import { BiensService } from '../services/biens.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Maison } from 'src/shared/Maison';
import { Terrain } from 'src/shared/Terrain';

@Component({
  selector: 'app-edit-bien',
  templateUrl: './edit-bien.component.html',
  styleUrls: ['./edit-bien.component.css']
})
export class EditBienComponent implements OnInit {
  selectedCategory: string = '';
  villesTunisie = villesTunisie;
  annonceForm: FormGroup;

  editedBienId:string;
  isEditMode:boolean = false;

  constructor(private formBuilder: FormBuilder,
    @Inject('BaseURL') public baseUrl: String, 
    private route: ActivatedRoute,
    private router: Router, 
    private biensService: BiensService) { }

  initForm() {
    this.annonceForm = this.formBuilder.group({
      type_offre: ['', Validators.required],
      categorie: ['', Validators.required],
      superficieT: [''],
      superficieH: [''],
      nbChambre: [''],
      nbSDB: [''],
      annee: [''],
      superficie: [''],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.pattern(/^\d+(\.\d{1,2,3})?$/)]], // Le prix peut être un int ou un float avec jusqu'à 2 décimales
      ville: ['', Validators.required],
      region: [''],
      photos: [[]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // int de 8 chiffre
    });
  }

  
  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      this.editedBienId = params['id'];
      if (this.editedBienId === '-1') {
        // Mode d'ajout
        this.isEditMode = false;
      } else {
        // Mode d'édition
        this.isEditMode = true;
        this.loadBienData(this.editedBienId);
      }
    });
  }

  loadBienData(id: string) {
    if (this.isMaison()) {
      this.biensService.getMaisonById(id).subscribe((maison: Maison) => {
        this.annonceForm.patchValue(maison);
      });
    } else {
      this.biensService.getTerrainById(id).subscribe((terrain: Terrain) => {
        this.annonceForm.patchValue(terrain);
      });
    }
  }

  isMaison(): boolean {
    return this.annonceForm.get('categorie').value === 'Maison';
  }

  onSubmit() {

  }
  /*
  onSubmit() {
    if (this.annonceForm.valid) {
      console.log("Hi");
      console.log(this.annonceForm.value);
      console.log(this.annonceForm.get('categorie').value);
      let id = 0;
      if (this.annonceForm.get('categorie').value == 'Maison') {
        this.biensService.getMaisons().pipe(
          concatMap((maisons) => {
            id = maisons.length + 1;
            console.log("id = ", id);
            console.log("Offre à vendre ? ", this.annonceForm.get('type_offre').value === 'avendre');
            let maison:Maison = {
              "id": "maison" + id,
              "type_offre": this.annonceForm.get('type_offre').value == 'avendre',
              "superficie": this.annonceForm.get('superficieT').value,
              "categorie": this.annonceForm.get('categorie').value,
              "titre_annonce": this.annonceForm.get('titre').value,
              "description": this.annonceForm.get('description').value,
              "prix": this.annonceForm.get('prix').value,
              "region": this.annonceForm.get('region').value,
              "ville": this.annonceForm.get('ville').value,
              "photos": [],
              "superficie_habitale": this.annonceForm.get('superficieH').value,
              "nbr_chambres": this.annonceForm.get('nbChambre').value,
              "nbr_salles_de_bains": this.annonceForm.get('nbSDB').value,
              "annee_construction": this.annonceForm.get('annee').value,
              "contact": {
                "nom": this.annonceForm.get('nom').value,
                "prenom": this.annonceForm.get('prenom').value,
                "email": this.annonceForm.get('email').value,
                "telephone": this.annonceForm.get('telephone').value
              }
            };
            console.log("HHHHHHHHeeeeeeeeeeeyyyyyyyyyy");
            console.log("maison: \n",maison);
            return this.biensService.addMaison(maison);
          })
        ).subscribe(
          (res) => {
            console.log("Ajout de la maison avec succès !");
            console.log("res = ", res);
            this.router.navigate(['/annonces']);
          },
          (err) => {
            console.error("Erreur lors de l'ajout de la maison :", err);
          }
        );
      } else {
        this.biensService.getTerrains().pipe(
          concatMap((terrains) => {
            id = terrains.length + 1;
            console.log("id = ", id);
            console.log(this.annonceForm.get('type_offre').value == 'alouer')
            let terrain: Terrain= {
              "id": "terrain" + id,
              "type_offre": this.annonceForm.get('type_offre').value == 'alouer',
              "categorie": this.annonceForm.get('categorie').value,
              "superficie": this.annonceForm.get('superficie').value,
              "titre_annonce": this.annonceForm.get('titre').value,
              "description": this.annonceForm.get('description').value,
              "prix": this.annonceForm.get('prix').value,
              "region": this.annonceForm.get('region').value,
              "ville": this.annonceForm.get('ville').value,
              "photos": [],
              "contact": {
                "nom": this.annonceForm.get('nom').value,
                "prenom": this.annonceForm.get('prenom').value,
                "email": this.annonceForm.get('email').value,
                "telephone": this.annonceForm.get('telephone').value
              }
            };
            return this.biensService.addTerrain(terrain);
          })
        ).subscribe(
          (res) => {
            console.log("Ajout du terrain avec succès !");
            console.log("res = ", res);
            this.router.navigate(['/annonces']);
          },
          (err) => {
            console.error("Erreur lors de l'ajout du terrain :", err);
          }
        );
      }
    } else {
      console.log("Formulaire invalide...");
    }
  }
*/
    
  }