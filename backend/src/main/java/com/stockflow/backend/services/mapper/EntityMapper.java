package com.stockflow.backend.services.mapper;

public interface EntityMapper<DTO, Entity> {

    Entity toEntity(DTO dto);

    DTO toDTO(Entity entity);
}
