package com.stockflow.backend.web.resources;

import com.stockflow.backend.entities.enums.StatutCommande;
import com.stockflow.backend.services.CommandeService;
import com.stockflow.backend.services.dto.CommandeRequestDto;
import com.stockflow.backend.services.dto.CommandeResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/commandes")
@RequiredArgsConstructor
@Tag(name = "Commandes", description = "Gestion du réapprovisionnement fournisseur")
public class CommandeController {

    private final CommandeService commandeService;

    @GetMapping
    @Operation(summary = "Liste les commandes avec filtres")
    public ResponseEntity<List<CommandeResponseDto>> getAllCommandes(
            @RequestParam(required = false) StatutCommande statut,
            @RequestParam(required = false) String fournisseur,
            @RequestParam(required = false) Long boutique_id) {
        return ResponseEntity.ok(commandeService.getCommandes(statut, fournisseur, boutique_id));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail complet d'une commande (lignes + noms produits)")
    public ResponseEntity<CommandeResponseDto> getCommandeById(@PathVariable Long id) {
        return ResponseEntity.ok(commandeService.getCommande(id));
    }

    @PostMapping
    @Operation(summary = "Crée une nouvelle commande avec ses lignes")
    public ResponseEntity<CommandeResponseDto> createCommande(@RequestBody CommandeRequestDto request) {
        return new ResponseEntity<>(commandeService.saveCommande(request), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/statut")
    @Operation(summary = "Change le statut d'une commande")
    public ResponseEntity<CommandeResponseDto> updateStatut(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        StatutCommande nouveauStatut = StatutCommande.valueOf(body.get("statut").toUpperCase());
        return ResponseEntity.ok(commandeService.changeStatut(id, nouveauStatut));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime une commande uniquement si en_attente")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        commandeService.deleteCommande(id);
        return ResponseEntity.noContent().build();
    }
}
