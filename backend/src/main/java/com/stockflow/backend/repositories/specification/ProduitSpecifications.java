package com.stockflow.backend.repositories.specification;

import com.stockflow.backend.entities.Produit;
import com.stockflow.backend.entities.enums.StatutProduit;
import org.springframework.data.jpa.domain.Specification;

public class ProduitSpecifications {

    public static Specification<Produit> aLaCategorie(String categorie) {
        return ((root, query, cb) ->
                categorie == null ? null : cb.equal(root.get("categorie"), categorie));
    }

    public static Specification<Produit> aLeStatut(StatutProduit statut) {
        return ((root, query, cb) ->
                statut == null ? null : cb.equal(root.get("statut"), statut));
    }

    public static Specification<Produit> appartientABoutique(Long boutiqueId) {
        return ((root, query, cb) ->
                boutiqueId == null ? null : cb.equal(root.get("boutiqueId"), boutiqueId));
    }
}
