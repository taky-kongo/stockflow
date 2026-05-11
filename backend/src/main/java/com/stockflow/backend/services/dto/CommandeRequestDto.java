package com.stockflow.backend.services.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CommandeRequestDto {

    @NotBlank(message = "Le nom du fournisseur est obligatoire")
    private String fournisseurNom;

    @NotBlank(message = "Le contact du fournisseur est obligatoire")
    private String fournisseurContact;

    @NotNull(message = "La date de livraison prévue est obligatoire")
    private LocalDate dateLivraisonPrevue;

    @NotNull(message = "L'ID de la boutique est obligatoire")
    private Long boutiqueId;

    @NotEmpty(message = "La commande doit contenir au moins une ligne")
    private List<LigneCommandeDto> lignes;
}
