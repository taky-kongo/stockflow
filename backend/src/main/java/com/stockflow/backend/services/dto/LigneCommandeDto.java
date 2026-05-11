package com.stockflow.backend.services.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LigneCommandeDto {

    @NotNull(message = "L'ID du produit est requis")
    private Long produitId;

    @NotNull(message = "La quantité est requise")
    @Min(value = 1, message = "La quantité doit être au moins de 1")
    private Integer quantiteCommandee;

    @NotNull(message = "Le prix d'achat est requis")
    private BigDecimal prixAchatUnitaire;
}
