package com.stockflow.backend.services.dto;

import com.stockflow.backend.entities.enums.StatutProduit;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ProduitDTO {

    private Long id;
    private String sku;
    private String nom;
    private String categorie;
    private BigDecimal prixUnitaire;
    private Integer quantiteStock;
    private Integer seuilAlerte;
    private Long boutiqueId;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
    private StatutProduit statut;

    public boolean isEnAlerte() {
        return this.seuilAlerte > 0 && this.quantiteStock < this.seuilAlerte;
    }
}
