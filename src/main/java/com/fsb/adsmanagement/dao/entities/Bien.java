package com.fsb.adsmanagement.dao.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import org.springframework.data.annotation.Id;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class Bien {
    
    @Id
    private String id;
    private TypeOffre type_offre;
    private Categorie categorie;
    private String superficie;
    private String titre_annonce;
    private String description;
    private String prix;
    private String region;
    private String ville;
    private Contact contact;

    private List<String> images;
}
