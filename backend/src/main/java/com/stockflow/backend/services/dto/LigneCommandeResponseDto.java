package com.stockflow.backend.services.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LigneCommandeResponseDto {

    private Long produitId;
    private String produitNom;
    private Integer quantiteCommandee;
    private BigDecimal prixAchatUnitaire;
}
