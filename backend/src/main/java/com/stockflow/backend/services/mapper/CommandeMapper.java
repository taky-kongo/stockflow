package com.stockflow.backend.services.mapper;

import com.stockflow.backend.entities.Commande;
import com.stockflow.backend.services.dto.CommandeRequestDto;
import com.stockflow.backend.services.dto.CommandeResponseDto;

public interface CommandeMapper extends EntityMapperCommande<Commande, CommandeRequestDto, CommandeResponseDto> {
}
