package com.stockflow.backend.repositories;

import com.stockflow.backend.entities.Commande;
import com.stockflow.backend.entities.enums.StatutCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


public interface CommandeRepository extends JpaRepository<Commande, Long> {

    @Query("SELECT c FROM Commande c LEFT JOIN FETCH c.lignes WHERE c.id = :id")
    Optional<Commande> findByIdWithLignes(@Param("id")  Long id);

    // Les 3 dernières commandes[cite: 1]
    List<Commande> findTop3ByBoutiqueIdOrderByDateCreationDesc(Long boutiqueId);

    // Requête pour les retards[cite: 1]
    @Query("SELECT COUNT(c) FROM Commande c WHERE c.boutiqueId = :boutiqueId " +
            "AND c.dateLivraisonPrevue < :now " +
            "AND c.statut NOT IN ('livree', 'annulee')")
    long countCommandesEnRetard(@Param("boutiqueId") Long boutiqueId, @Param("now") LocalDate now);

    // Dans CommandeRepository.java
    long countByBoutiqueIdAndStatutIn(Long boutiqueId, Collection<StatutCommande> statuts);
}
