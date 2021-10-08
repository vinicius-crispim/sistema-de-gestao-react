package com.projeto.faceBuy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.faceBuy.entities.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario,Long> {
    
}
