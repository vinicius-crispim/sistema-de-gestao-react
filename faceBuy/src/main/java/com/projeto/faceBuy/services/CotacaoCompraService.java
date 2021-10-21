package com.projeto.faceBuy.services;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.repositories.CotacaoCompraRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class CotacaoCompraService {
	@Autowired
	private CotacaoCompraRepository repository;

	public List<CotacaoCompra> findAll() {
		return repository.findAll();
	}

	public CotacaoCompra findById(Long id) {
		Optional<CotacaoCompra> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public CotacaoCompra saveCotacaoCompra(CotacaoCompra cotacaoCompra) {
		return repository.save(cotacaoCompra);
	}

	public void deleteCotacaoCompra(Long id) {
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
	public CotacaoCompra updateCotacaoCompra(Long id, CotacaoCompra cotacaoCompra) {
		try {
			CotacaoCompra obj = repository.getOne(id);
			updateData(obj, cotacaoCompra);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(CotacaoCompra obj, CotacaoCompra cotacaoCompra) {
		obj.getCotacaocompraitem().addAll(cotacaoCompra.getCotacaocompraitem().stream().collect(Collectors.toList()));
	}

}
