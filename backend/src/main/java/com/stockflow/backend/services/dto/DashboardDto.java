package com.stockflow.backend.services.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DashboardDto {
    private DashBoardResume resume;
    private List<ProduitDTO> alertesCritiques;
    private long totalCommandesEnAttente;
    private long commandesEnRetard;
    private List<CommandeResponseDto> commandesRecentes;
}
