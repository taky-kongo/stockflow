package com.stockflow.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "La categorie est obligatoire")
    private String categorie;

    @Positive(message = "Le prix doit être positif")
    @NotBlank(message = "Le prix unitaire est obligatoire")
    private BigDecimal prixUnitaire;

    @PositiveOrZero(message = "La valeur doit être positive ou égale à 0")
    @NotBlank(message = "La quantité du stock est obligatoire")
    private Integer quantiteStock;

    @PositiveOrZero(message = "La valeur doit être positive ou égale à 0")
    @NotBlank(message = "Le seuil est obligatoire")
    private Integer seuilAlerte;

    @NotBlank(message = "l'id de boutique est obligatoire")
    private Integer boutiqueId;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime dateCreation;

    @LastModifiedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime dateModification;

    private Boolean enAlerte;
}
