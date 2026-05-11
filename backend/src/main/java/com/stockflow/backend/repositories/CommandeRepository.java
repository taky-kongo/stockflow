package com.stockflow.backend.repositories;

import com.stockflow.backend.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
