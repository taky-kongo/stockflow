package com.stockflow.backend.web.resources;

import com.stockflow.backend.services.DashboardService;
import com.stockflow.backend.services.dto.DashboardDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Endpoints pour les statistiques du tableau de bord")
@CrossOrigin(origins = "*")
public class DashboardResource {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    @Operation(
            summary = "Récupérer les données du tableau de bord",
            description = "Retourne une synthèse complète : stock, alertes et commandes pour une boutique donnée"
    )
    @ApiResponse(responseCode = "200", description = "Données récupérées avec succès")
    @ApiResponse(responseCode = "404", description = "Boutique non trouvée")
    public ResponseEntity<DashboardDto> getDashboard(
            @Parameter(description = "ID de la boutique", required = true, example = "1")
            @RequestParam Long boutiqueId) {

        return ResponseEntity.ok(dashboardService.getDashboardData(boutiqueId));
    }

    @GetMapping("/health")
    @Operation(summary = "Vérification de l'état de l'API")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(java.util.Map.of(
                "status", "ok",
                "version", "1.0.0",
                "candidat", "Malick",
                "timestamp", LocalDateTime.now().toString()
        ));
    }
}
