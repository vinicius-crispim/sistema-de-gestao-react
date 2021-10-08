package com.projeto.faceBuy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.pk.CotacaoCompraItemPK;

public interface CotacaoCompraItemRepository extends JpaRepository<CotacaoCompraItem,CotacaoCompraItemPK> {
    
}
