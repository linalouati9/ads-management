import { Bien } from "./Bien";

export class Maison extends Bien {
    superficie_habitale: string;
    nbr_chambres: number;
    nbr_salles_de_bains: number;
    annee_construction: number;

    constructor(
        id: string,
        type_offre: string,
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
        },
        superficie_habitale: string,
        nbr_chambres: number,
        nbr_salles_de_bains: number,
        annee_construction: number
    ) {
        super(
            id,
            type_offre,
            'Maison',
            superficie,
            titre_annonce,
            description,
            prix,
            region,
            ville,
            images,
            contact
        );
        this.superficie_habitale = superficie_habitale;
        this.nbr_chambres = nbr_chambres;
        this.nbr_salles_de_bains = nbr_salles_de_bains;
        this.annee_construction = annee_construction;
    }
}
