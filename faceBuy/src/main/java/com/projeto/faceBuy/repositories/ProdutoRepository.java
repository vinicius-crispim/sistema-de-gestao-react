package com.projeto.faceBuy.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.faceBuy.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	@Query("select u from Produto u where u.status = 'Válido'")
	Page<Produto> FindTeste(Pageable pageable);
	
	@Query("select u from Produto u where u.status = 'Inválido'")
	Page<Produto> FindInativos(Pageable pageable);

	@Query("select u from Produto u where u.estoque < u.quantidademin and u.status = 'Válido'")
	Page<Produto> FindEmFalta(Pageable pageable);

}
