package com.stockflow.backend.services.mapper.impl;

import com.stockflow.backend.entities.Produit;
import com.stockflow.backend.services.dto.ProduitDTO;
import com.stockflow.backend.services.mapper.ProduitMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProduitMapperImpl implements ProduitMapper {

    private final ModelMapper modelMapper;

    @Override
    public Produit toEntity(ProduitDTO produitDTO) {
        return modelMapper.map(produitDTO, Produit.class);
    }

    @Override
    public ProduitDTO toDTO(Produit produit) {
        return modelMapper.map(produit, ProduitDTO.class);
    }
}
