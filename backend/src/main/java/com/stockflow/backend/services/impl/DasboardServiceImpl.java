package com.stockflow.backend.services.impl;

import com.stockflow.backend.entities.Commande;
import com.stockflow.backend.entities.Produit;
import com.stockflow.backend.entities.enums.StatutCommande;
import com.stockflow.backend.repositories.CommandeRepository;
import com.stockflow.backend.repositories.ProduitRepository;
import com.stockflow.backend.services.DashboardService;
import com.stockflow.backend.services.dto.CommandeResponseDto;
import com.stockflow.backend.services.dto.DashBoardResume;
import com.stockflow.backend.services.dto.DashboardDto;
import com.stockflow.backend.services.dto.ProduitDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DasboardServiceImpl implements DashboardService {

    private final ProduitRepository produitRepository;
    private final CommandeRepository commandeRepository;

    @Override
    public DashboardDto getDashboardData(Long boutiqueId) {

        DashBoardResume resume = new DashBoardResume(
                produitRepository.countByBoutiqueId(boutiqueId),
                produitRepository.countByBoutiqueIdAndQuantiteStockGreaterThan(boutiqueId, 0),
                produitRepository.countAlertes(boutiqueId),
                produitRepository.countByBoutiqueIdAndQuantiteStock(boutiqueId, 0),
                produitRepository.calculerValeurStock(boutiqueId).orElse(BigDecimal.ZERO)
        );

        List<ProduitDTO> alertesDtos = produitRepository.findTopAlertesCritiques(boutiqueId)
                .stream()
                .map(this::mapToProduitDto)
                .toList();

        long totalEnAttente = commandeRepository.countByBoutiqueIdAndStatutIn(
                boutiqueId,
                List.of(StatutCommande.EN_ATTENTE, StatutCommande.CONFIRMEE)
        );

        long enRetard = commandeRepository.countCommandesEnRetard(boutiqueId, LocalDate.now());

        List<CommandeResponseDto> recentesDtos = commandeRepository.findTop3ByBoutiqueIdOrderByDateCreationDesc(boutiqueId)
                .stream()
                .map(this::mapToCommandeResponseDto)
                .toList();

        return new DashboardDto(resume, alertesDtos, totalEnAttente, enRetard, recentesDtos);
    }

    private ProduitDTO mapToProduitDto(Produit p) {
        ProduitDTO dto = new ProduitDTO();
        dto.setId(p.getId());
        dto.setSku(p.getSku());
        dto.setNom(p.getNom());
        dto.setQuantiteStock(p.getQuantiteStock());
        dto.setSeuilAlerte(p.getSeuilAlerte());
        dto.setPrixUnitaire(p.getPrixUnitaire());
        return dto;
    }

    private CommandeResponseDto mapToCommandeResponseDto(Commande c) {
        CommandeResponseDto dto = new CommandeResponseDto();
        dto.setId(c.getId());
        dto.setFournisseurNom(c.getFournisseurNom());
        dto.setStatut(c.getStatut());
        dto.setDateCreation(c.getDateCreation());
        return dto;
    }
}