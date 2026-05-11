package com.stockflow.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LigneCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commande_id")
    @JsonBackReference
    private Commande commande;

    @Column(nullable = false)
    private Long produitId;

    @Column(nullable = false)
    @Positive(message = "La quantité commandée doit être positive")
    private Integer quantiteCommandee;

    @Column(nullable = false)
    private BigDecimal prixAchatUnitaire;
}
