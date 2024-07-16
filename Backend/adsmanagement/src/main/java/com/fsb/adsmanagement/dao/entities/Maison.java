package com.fsb.adsmanagement.dao.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "maisons")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Maison extends Bien {

    private String superficie_habitale;
    private int nbr_chambres;
    private int nbr_salles_de_bains;
    private int annee_construction;
}