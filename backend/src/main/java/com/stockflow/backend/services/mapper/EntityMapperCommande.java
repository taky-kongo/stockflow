package com.stockflow.backend.services.mapper;

import java.util.List;

public interface EntityMapperCommande <E, REQ, RES> {
    E toEntity(REQ dto);
    RES toDto(E entity);
    List<E> toEntity(List<REQ> dtoList);
    List<RES> toDto(List<E> entityList);
}
