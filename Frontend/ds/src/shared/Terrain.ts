import { Bien } from "./Bien";

export class Terrain extends Bien {
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
        }
    ) {
        super(
            id,
            type_offre,
            'Terrain',
            superficie,
            titre_annonce,
            description,
            prix,
            region,
            ville,
            images,
            contact
        );
    }
}
