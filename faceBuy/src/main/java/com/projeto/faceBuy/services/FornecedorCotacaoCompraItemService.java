package com.projeto.faceBuy.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.FornecedorCotacaoCompraItem;
import com.projeto.faceBuy.repositories.FornecedorCotacaoCompraItemRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class FornecedorCotacaoCompraItemService {
	@Autowired
	private FornecedorCotacaoCompraItemRepository repository;

	public List<FornecedorCotacaoCompraItem> findAll() {
		return repository.findAll();
	}

	public FornecedorCotacaoCompraItem findById(Long id) {
		Optional<FornecedorCotacaoCompraItem> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public FornecedorCotacaoCompraItem saveFornecedorCotacaoCompraItem(FornecedorCotacaoCompraItem fornecedorCotacaoCompraItem) {
		return repository.save(fornecedorCotacaoCompraItem);
	}

	public void deleteFornecedorCotacaoCompraItem(Long id) {
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
	public FornecedorCotacaoCompraItem updateFornecedorCotacaoCompraItem(Long id, FornecedorCotacaoCompraItem fornecedorCotacaoCompraItem) {
		try {
			FornecedorCotacaoCompraItem obj = repository.getOne(id);
			updateData(obj, fornecedorCotacaoCompraItem);
			return repository.save(obj);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(FornecedorCotacaoCompraItem obj, FornecedorCotacaoCompraItem fornecedorCotacaoCompraItem) {

		
	}

}
