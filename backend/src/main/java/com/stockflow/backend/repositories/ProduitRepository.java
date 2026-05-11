package com.stockflow.backend.repositories;

import com.stockflow.backend.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProduitRepository extends JpaRepository<Produit, Long>, JpaSpecificationExecutor<Produit> {

    List<Produit> findAllByBoutiqueId(Long boutiqueId);
    Optional<Produit> findBySku(String sku);
    boolean existsBySku(String sku);

    long countByBoutiqueId(Long boutiqueId);

    long countByBoutiqueIdAndQuantiteStockLessThanAndSeuilAlerteGreaterThan(Long boutiqueId, int seuil, int seuilMin);

    long countByBoutiqueIdAndQuantiteStockGreaterThan(Long boutiqueId, int quantite);

    long countByBoutiqueIdAndQuantiteStock(Long boutiqueId, int quantite);

    @Query("SELECT COUNT(p) FROM Produit p WHERE p.boutiqueId = :boutiqueId AND p.quantiteStock < p.seuilAlerte AND p.seuilAlerte > 0")
    long countAlertes(@Param("boutiqueId") Long boutiqueId);

    @Query("SELECT SUM(p.prixUnitaire * p.quantiteStock) FROM Produit p WHERE p.boutiqueId = :boutiqueId")
    Optional<BigDecimal> calculerValeurStock(@Param("boutiqueId") Long boutiqueId);

    @Query(value = "SELECT * FROM produit p WHERE p.boutique_id = :boutiqueId " +
            "AND p.quantite_stock < p.seuil_alerte AND p.seuil_alerte > 0 " +
            "ORDER BY (p.quantite_stock - p.seuil_alerte) ASC LIMIT 5", nativeQuery = true)
    List<Produit> findTopAlertesCritiques(@Param("boutiqueId") Long boutiqueId);
}
