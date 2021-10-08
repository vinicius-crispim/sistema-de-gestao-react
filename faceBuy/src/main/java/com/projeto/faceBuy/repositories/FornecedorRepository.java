package com.projeto.faceBuy.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.faceBuy.entities.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor,Long> {
    
}
