package com.stockflow.backend.services;

import com.stockflow.backend.entities.enums.StatutProduit;
import com.stockflow.backend.services.dto.ProduitDTO;

import java.util.List;
import java.util.Optional;

public interface ProduitService {

    List<ProduitDTO>  findAll(String categorie, StatutProduit statutProduit, Long boutiqueId);
    List<ProduitDTO> findAllByBoutique(Long boutiqueId);
    Optional<ProduitDTO> findById(Long id);
    ProduitDTO save(ProduitDTO dto);
    ProduitDTO updateProduit(ProduitDTO dto);
    ProduitDTO update(ProduitDTO dto, Long id);
    ProduitDTO partialUpdate(Long id, int delta);
    void deleteProduit(Long id);
}
