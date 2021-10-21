package com.projeto.faceBuy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.faceBuy.entities.CotacaoCompraItem;

public interface CotacaoCompraItemRepository extends JpaRepository<CotacaoCompraItem,Long> {
    
}
