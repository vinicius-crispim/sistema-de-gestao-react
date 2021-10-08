package com.projeto.faceBuy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.faceBuy.entities.OrdemCompraItem;


@Repository
public interface OrdemCompraItemRepository extends JpaRepository<OrdemCompraItem, Long> {
    
}
