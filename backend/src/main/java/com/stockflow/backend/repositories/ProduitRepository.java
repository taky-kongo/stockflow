package com.stockflow.backend.repositories;

import com.stockflow.backend.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ProduitRepository extends JpaRepository<Produit, Long>, JpaSpecificationExecutor<Produit> {

    List<Produit> findAllByBoutiqueId(Long boutiqueId);
    Optional<Produit> findBySku(String sku);
    boolean existsBySku(String sku);
}
