package com.stockflow.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.stockflow.backend.entities.enums.StatutCommande;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Le nom du fournisseur est obligatoire")
    private String fournisseurNom;

    @Column(nullable = false)
    @NotBlank(message = "Le contact du fournisseur est obligatoire")
    private String fournisseurContact;

    @Enumerated(EnumType.STRING)
    private StatutCommande statut = StatutCommande.EN_ATTENTE;

    @Column(nullable = false)
    @NotNull(message = "La de livraison est obligatoire")
    @Future(message = "La date de livraison doit être dans le futur")
    private LocalDate dateLivraisonPrevue;

    @NotNull(message = "l'id de boutique est obligatoire")
    private Long boutiqueId;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime dateCreation;

    private LocalDateTime dateLivraisonReelle;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<LigneCommande> lignes = new ArrayList<>();

    public void addLigne(LigneCommande ligne)  {
        this.lignes.add(ligne);
        ligne.setCommande(this);
    }
}
