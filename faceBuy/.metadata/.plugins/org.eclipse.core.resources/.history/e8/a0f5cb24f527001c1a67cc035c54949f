package com.pi.gestaocompras.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.pi.gestaocompras.entities.OrdemCompra;
import com.pi.gestaocompras.repositories.OrdemCompraRepository;
import com.pi.gestaocompras.services.exceptions.DatabaseException;
import com.pi.gestaocompras.services.exceptions.ResourceNotFoundException;

@Service
public class OrdemCompraService {
	@Autowired
	private OrdemCompraRepository repository;

	public List<OrdemCompra> findAll() {
		return repository.findAll();
	}

	public OrdemCompra findById(Long id) {
		Optional<OrdemCompra> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public OrdemCompra saveOrdemCompra(OrdemCompra ordemCompra) {
		return repository.save(ordemCompra);
	}

	public void deleteOrdemCompra(Long id) {
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
	public OrdemCompra updateOrdemCompra(Long id, OrdemCompra ordemCompra) {
		try {
			OrdemCompra obj = repository.getOne(id);
			updateData(obj, ordemCompra);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(OrdemCompra obj, OrdemCompra ordemCompra) {

		obj.setData(ordemCompra.getData());
		obj.setFornecedor(ordemCompra.getFornecedor());
		obj.setValor(ordemCompra.getValor());
		obj.getOrdemcompraitem().addAll(ordemCompra.getOrdemcompraitem().stream().collect(Collectors.toList()));
	}

}
