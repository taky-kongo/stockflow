package com.stockflow.backend.services.impl;

import com.stockflow.backend.entities.Commande;
import com.stockflow.backend.entities.LigneCommande;
import com.stockflow.backend.entities.Produit;
import com.stockflow.backend.entities.enums.StatutCommande;
import com.stockflow.backend.repositories.CommandeRepository;
import com.stockflow.backend.repositories.ProduitRepository;
import com.stockflow.backend.services.CommandeService;
import com.stockflow.backend.services.dto.CommandeRequestDto;
import com.stockflow.backend.services.dto.CommandeResponseDto;
import com.stockflow.backend.services.mapper.CommandeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommandeServiceImpl implements CommandeService {

    private final CommandeRepository commandeRepository;
    private final ProduitRepository produitRepository;
    private final CommandeMapper  commandeMapper;

    @Override
    @Transactional
    public CommandeResponseDto saveCommande(CommandeRequestDto commande) {

        commande.getLignes().forEach(ligne -> {
            if (!produitRepository.existsById(ligne.getProduitId())) {
                throw new RuntimeException("Produit non trouvé avec l'ID " + ligne.getProduitId());
            }
        });

        Commande commandeEntity = commandeMapper.toEntity(commande);
        commandeEntity.setStatut(StatutCommande.EN_ATTENTE);

        return commandeMapper.toDto(commandeRepository.save(commandeEntity));
    }

    @Override
    public CommandeResponseDto getCommande(Long id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Commande non trouvée"));

        return commandeMapper.toDto(commande);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommandeResponseDto> getCommandes(StatutCommande statutCommande, String fournisseur, Long boutiqueId) {
        return commandeRepository.findAll().stream()
                .filter(c -> boutiqueId == null || c.getBoutiqueId().equals(boutiqueId))
                .filter(c -> statutCommande == null || c.getStatut() == statutCommande)
                .filter(c -> fournisseur == null || c.getFournisseurNom().contains(fournisseur))
                .map(commandeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CommandeResponseDto changeStatut(Long id, StatutCommande nouveauStatut) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Commande non trouvée"));

        StatutCommande statutActuel = commande.getStatut();

        validerTransition(statutActuel, nouveauStatut);

        if (nouveauStatut == StatutCommande.LIVREE) {
            mettreAJourStocks(commande);
            commande.setDateLivraisonReelle(LocalDateTime.now());
        }

        commande.setStatut(nouveauStatut);
        return commandeMapper.toDto(commandeRepository.save(commande));
    }

    @Override
    @Transactional
    public void deleteCommande(Long id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Commande non trouvée"));

        if (commande.getStatut() != StatutCommande.EN_ATTENTE) {
            throw new RuntimeException("Impossible de supprimer une commande au statut " + commande.getStatut());
        }
        commandeRepository.delete(commande);
    }

    private void validerTransition(StatutCommande actuel, StatutCommande nouveau) {
        boolean estValide = switch (actuel) {
            case EN_ATTENTE -> (nouveau == StatutCommande.CONFIRMEE || nouveau == StatutCommande.ANNULEE);
            case CONFIRMEE -> (nouveau == StatutCommande.LIVREE || nouveau == StatutCommande.ANNULEE);
            default -> false;
        };

        if (!estValide) {
            throw new RuntimeException("Transition impossible de " + actuel + " vers " + nouveau);
        }
    }

    private void mettreAJourStocks(Commande commande) {
        for (LigneCommande ligne : commande.getLignes()) {
            Produit produit = produitRepository.findById(ligne.getProduitId())
                    .orElseThrow(() -> new IllegalArgumentException("Produit introuvable lors de la livraison"));

            produit.setQuantiteStock(produit.getQuantiteStock() + ligne.getQuantiteCommandee());
            produitRepository.save(produit);
        }
    }
}
