package com.stockflow.backend.services;

import com.stockflow.backend.entities.enums.StatutCommande;
import com.stockflow.backend.services.dto.CommandeRequestDto;
import com.stockflow.backend.services.dto.CommandeResponseDto;

import java.util.List;

public interface CommandeService {

    CommandeResponseDto saveCommande(CommandeRequestDto commande);

    CommandeResponseDto getCommande(Long id);

    List<CommandeResponseDto> getCommandes(StatutCommande statutCommande, String fournisseur, Long boutiqueId);

    CommandeResponseDto changeStatut(Long id, StatutCommande nouveauStatut);

    void deleteCommande(Long id);
}
