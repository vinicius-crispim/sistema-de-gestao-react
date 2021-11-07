package com.projeto.faceBuy.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.faceBuy.entities.Cidade;
@Repository
public interface CidadeRepository extends JpaRepository<Cidade,Long> {
    
}
