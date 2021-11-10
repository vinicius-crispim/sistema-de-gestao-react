package com.projeto.faceBuy.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.FornecedorCotacaoCompra;
import com.projeto.faceBuy.repositories.FornecedorCotacaoCompraRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class FornecedorCotacaoCompraService {
	@Autowired
	private FornecedorCotacaoCompraRepository repository;

	public List<FornecedorCotacaoCompra> findAll() {
		return repository.findAll();
	}
	
	public List<FornecedorCotacaoCompra> findAllByCotacao(Long id) {
		List<FornecedorCotacaoCompra> list = repository.findAll();
		List<FornecedorCotacaoCompra> listalimpa = new ArrayList<FornecedorCotacaoCompra>();
		for (FornecedorCotacaoCompra fornecedorCotacaoCompra : list) {
			if (fornecedorCotacaoCompra.getCotacaocompra().getId() == id) {
				listalimpa.add(fornecedorCotacaoCompra);
			}
		}
		return listalimpa;
		
	}

	public FornecedorCotacaoCompra findById(Long id) {
		Optional<FornecedorCotacaoCompra> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public FornecedorCotacaoCompra saveFornecedorCotacaoCompra(FornecedorCotacaoCompra fornecedorCotacaoCompra) {
		return repository.save(fornecedorCotacaoCompra);
	}

	public void deleteFornecedorCotacaoCompra(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
	}

	// getOne apenas pega o objeto monitorado e depois mexe no banco, o findBy pega
	// no banco



}
