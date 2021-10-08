package com.projeto.faceBuy.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.faceBuy.entities.Cidade;

public interface CidadeRepository extends JpaRepository<Cidade,Long> {
    
}
