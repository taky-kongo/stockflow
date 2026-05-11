package com.stockflow.backend.repositories;

import com.stockflow.backend.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface CommandeRepository extends JpaRepository<Commande, Long> {

    @Query("SELECT c FROM Commande c LEFT JOIN FETCH c.lignes WHERE c.id = :id")
    Optional<Commande> findByIdWithLignes(@Param("id")  Long id);
}
