package com.stockflow.backend.services.impl;

import com.stockflow.backend.entities.Produit;
import com.stockflow.backend.entities.enums.StatutProduit;
import com.stockflow.backend.repositories.ProduitRepository;
import com.stockflow.backend.repositories.specification.ProduitSpecifications;
import com.stockflow.backend.services.ProduitService;
import com.stockflow.backend.services.dto.ProduitDTO;
import com.stockflow.backend.services.mapper.ProduitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProduitServiceImpl implements ProduitService {

    private final ProduitRepository produitRepository;
    private final ProduitMapper produitMapper;

    @Override
    public List<ProduitDTO> findAll(String categorie, StatutProduit statutProduit, Long boutiqueId) {
        Specification<Produit> spec = Specification.allOf(
                ProduitSpecifications.aLaCategorie(categorie),
                ProduitSpecifications.aLeStatut(statutProduit),
                ProduitSpecifications.appartientABoutique(boutiqueId)
        );

        return produitRepository.findAll(spec).stream().map(produitMapper::toDTO).toList();
    }

    @Override
    public List<ProduitDTO> findAllByBoutique(Long boutiqueId) {
        return produitRepository.findAllByBoutiqueId(boutiqueId).stream().map(produitMapper::toDTO).toList();
    }

    @Override
    public Optional<ProduitDTO> findById(Long id) {
        return produitRepository.findById(id).map(produitMapper::toDTO);
    }

    @Override
    @Transactional
    public ProduitDTO save(ProduitDTO dto) {
        String prefix = "MAL";
        long count = produitRepository.countAllProduit();
        String suffix = String.format("%04d", count);

        dto.setSku(prefix + "-" + suffix);
        if (produitRepository.findBySku(dto.getSku()).isPresent()) {
            throw new RuntimeException("Le SKU " + dto.getSku() + " existe déjà.");
        }
        Produit produit =  produitMapper.toEntity(dto);
        produit.setStatut(produit.calculerStatutProduit());
        return produitMapper.toDTO(produitRepository.save(produit));
    }

    @Override
    @Transactional
    public ProduitDTO updateProduit(ProduitDTO dto) {
        return findById(dto.getId()).map(produit -> {
            produit.setNom(dto.getNom());
            produit.setSku(dto.getSku());
            produit.setQuantiteStock(dto.getQuantiteStock());
            produit.setBoutiqueId(dto.getBoutiqueId());
            produit.setPrixUnitaire(dto.getPrixUnitaire());
            produit.setSeuilAlerte(dto.getSeuilAlerte());
            produit.setStatut(dto.getStatut());
            return save(produit);
        }).orElseThrow(() -> new IllegalArgumentException("Le produitne n'existe pas"));
    }

    @Override
    @Transactional
    public ProduitDTO update(ProduitDTO dto, Long id) {
        dto.setId(id);
        return updateProduit(dto);
    }

    @Override
    public ProduitDTO partialUpdate(Long id, int delta) {
        ProduitDTO produitDTO =  produitMapper.toDTO(produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé")));
        int nouveauStock = produitDTO.getQuantiteStock() + delta;

        if (nouveauStock < 0) {
            throw new RuntimeException("Le stock ne peut pas être inférieur à 0");
        }
        produitDTO.setQuantiteStock(nouveauStock);
        Produit produit = produitRepository.save(produitMapper.toEntity(produitDTO));
        return produitMapper.toDTO(produit);
    }

    @Override
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}
