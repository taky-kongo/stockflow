package com.stockflow.backend.services.dto;

import java.math.BigDecimal;

public record DashBoardResume(
        long totalProduits,
        long produitsOk,
        long produitsEnAlerte,
        long produitsEnRupture,
        BigDecimal valeurTotaleStock
) {
}
