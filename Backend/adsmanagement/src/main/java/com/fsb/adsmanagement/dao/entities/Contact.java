package com.fsb.adsmanagement.dao.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
/* @Embeddable
public class Contact {

    @Column(nullable = false)
    private String nom;
    @Column(nullable = false)
    private String prenom;
    @Email
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String telephone;

    public Contact() {
        this.email = "default@example.com"; // Valeur par défaut pour l'adresse e-mail
    }
} */
public class Contact {

    private String nom;
    private String prenom;
    private String email;
    private String telephone;
}
