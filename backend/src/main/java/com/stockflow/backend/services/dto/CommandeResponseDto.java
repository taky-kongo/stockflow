package com.stockflow.backend.services.dto;

import com.stockflow.backend.entities.enums.StatutCommande;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommandeResponseDto {

    private Long id;
    private String fournisseurNom;
    private String fournisseurContact;
    private StatutCommande statut;
    private LocalDate dateLivraisonPrevue;
    private Long boutiqueId;
    private LocalDateTime dateCreation;
    private LocalDateTime dateLivraisonReelle;
    private List<LigneCommandeResponseDto> lignes;
}
