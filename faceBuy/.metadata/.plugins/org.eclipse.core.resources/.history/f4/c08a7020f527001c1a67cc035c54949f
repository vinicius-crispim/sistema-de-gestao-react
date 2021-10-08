package com.pi.gestaocompras.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.pi.gestaocompras.entities.OrdemCompraItem;
import com.pi.gestaocompras.repositories.OrdemCompraItemRepository;
import com.pi.gestaocompras.services.exceptions.DatabaseException;
import com.pi.gestaocompras.services.exceptions.ResourceNotFoundException;

@Service
public class OrdemCompraItemService {
	@Autowired
	private OrdemCompraItemRepository repository;

	public List<OrdemCompraItem> findAll() {
		return repository.findAll();
	}

	public OrdemCompraItem findById(Long id) {
		Optional<OrdemCompraItem> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public OrdemCompraItem saveOrdemCompraItem(OrdemCompraItem ordemCompraItem) {
		return repository.save(ordemCompraItem);
	}

	public void deleteOrdemCompraItem(Long id) {
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
	public OrdemCompraItem updateOrdemCompraItem(Long id, OrdemCompraItem ordemCompraItem) {
		try {
			OrdemCompraItem obj = repository.getOne(id);
			updateData(obj, ordemCompraItem);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(OrdemCompraItem obj, OrdemCompraItem ordemCompraItem) {

		obj.setOrdemCompra(ordemCompraItem.getOrdemCompra());
		obj.setPrecoitem(ordemCompraItem.getPrecoitem());
		obj.setProduto(ordemCompraItem.getProduto());
		obj.setQuantidade(ordemCompraItem.getQuantidade());
	}

}
