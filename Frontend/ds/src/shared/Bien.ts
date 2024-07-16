export class Bien {
    id: string;
    type_offre: string; //'avendre' ou 'alouer'
    categorie: 'Maison' | 'Terrain'; // Type d'un bien : Maison ou Terrain
    superficie: string; // Supposons que la superficie soit un nombre entier ou réel
    titre_annonce: string;
    description: string;
    prix: string; // Supposons que le prix soit un nombre entier ou réel
    region: string;
    ville: string;
    images: string[]; // Supposons que les photos soient des liens vers des images
    contact: {
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
    };

    constructor(
        id: string,
        type_offre: string,
        categorie: 'Maison' | 'Terrain',
        superficie: string,
        titre_annonce: string,
        description: string,
        prix: string,
        region: string,
        ville: string,
        images: string[],
        contact: {
            nom: string;
            prenom: string;
            email: string;
            telephone: string;
        }
    ) {
        this.id = id;
        this.type_offre = type_offre;
        this.categorie = categorie;
        this.superficie = superficie;
        this.titre_annonce = titre_annonce;
        this.description = description;
        this.prix = prix;
        this.region = region;
        this.ville = ville;
        this.images = images;
        this.contact = contact;
    }
}
