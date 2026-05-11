package com.stockflow.backend.services.mapper.impl;

import com.stockflow.backend.entities.Commande;
import com.stockflow.backend.services.dto.CommandeRequestDto;
import com.stockflow.backend.services.dto.CommandeResponseDto;
import com.stockflow.backend.services.dto.LigneCommandeResponseDto;
import com.stockflow.backend.services.mapper.CommandeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CommandeMapperImpl implements CommandeMapper {

    @Override
    public Commande toEntity(CommandeRequestDto dto) {
        if (dto == null) return null;
        Commande commande = new Commande();
        commande.setFournisseurNom(dto.getFournisseurNom());
        commande.setFournisseurContact(dto.getFournisseurContact());
        commande.setDateLivraisonPrevue(dto.getDateLivraisonPrevue());
        commande.setBoutiqueId(dto.getBoutiqueId());
        return commande;
    }

    @Override
    public CommandeResponseDto toDto(Commande entity) {
        if (entity == null) return null;
        CommandeResponseDto dto = new CommandeResponseDto();
        dto.setId(entity.getId());
        dto.setFournisseurNom(entity.getFournisseurNom());
        dto.setStatut(entity.getStatut());
        dto.setBoutiqueId(entity.getBoutiqueId());

        if (entity.getLignes() != null) {
            dto.setLignes(entity.getLignes().stream().map(ligne -> {
                LigneCommandeResponseDto lDto = new LigneCommandeResponseDto();
                lDto.setProduitId(ligne.getProduitId());
                //lDto.setProduitNom(ligne.getProduit().getNom());
                lDto.setQuantiteCommandee(ligne.getQuantiteCommandee());
                lDto.setPrixAchatUnitaire(ligne.getPrixAchatUnitaire());
                return lDto;
            }).collect(Collectors.toList()));
        }

        return dto;
    }

    @Override
    public List<Commande> toEntity(List<CommandeRequestDto> dtoList) {
        return dtoList.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public List<CommandeResponseDto> toDto(List<Commande> entityList) {
        return entityList.stream().map(this::toDto).collect(Collectors.toList());
    }
}
