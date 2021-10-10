package com.projeto.faceBuy.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.faceBuy.entities.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
    
}
