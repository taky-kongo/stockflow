package com.stockflow.backend.services;

import com.stockflow.backend.services.dto.DashboardDto;

public interface DashboardService {

    DashboardDto getDashboardData(Long boutiqueId);
}
