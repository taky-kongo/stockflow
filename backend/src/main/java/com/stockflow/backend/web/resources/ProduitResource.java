package com.stockflow.backend.web.resources;

import com.stockflow.backend.entities.enums.StatutProduit;
import com.stockflow.backend.services.ProduitService;
import com.stockflow.backend.services.dto.ProduitDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/produits")
@Tag(name = "Produits", description = "Gestion des produits")
@CrossOrigin(origins = "*")
public class ProduitResource {

    private final ProduitService produitService;

    @GetMapping
    @Operation(summary = "Liste tous les produits avec filtres")
    public ResponseEntity<List<ProduitDTO>> getAllProduits(
            @RequestParam(required = false) String categorie,
            @RequestParam(required = false) StatutProduit statut,
            @RequestParam (required = false) Long boutiqueId
    ) {
        return ResponseEntity.ok(produitService.findAll(categorie, statut, boutiqueId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupère un produit et affiche les détails")
    public ResponseEntity<ProduitDTO> getProduitById(@PathVariable Long id) {
        return produitService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crée un nouveau produit avec génération du sku")
    public ResponseEntity<?> saveProduit(@RequestBody ProduitDTO produitDTO) {
        try {
            ProduitDTO produitSave = produitService.save(produitDTO);
            return new ResponseEntity<>(produitSave, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    @Operation(summary = "Modification des éléments d'un produit")
    public ResponseEntity<ProduitDTO> updateProduit(@PathVariable Long id, @RequestBody ProduitDTO produitDTO) {
        return ResponseEntity.ok(produitService.update(produitDTO, id));
    }

    @PatchMapping("/{id}/stock")
    @Operation(summary = "Ajuste manuellement la quantité en stock")
    public ResponseEntity<ProduitDTO> ajusteStock(@PathVariable Long id, @RequestParam Integer delta) {
        return ResponseEntity.ok(produitService.partialUpdate(id, delta));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un produit mais refusé si commande active")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.ok().build();
    }
}
