package com.projeto.faceBuy.services;


import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.NotaFiscalItem;
import com.projeto.faceBuy.repositories.NotaFiscalItemRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class NotaFiscalItemService {
	@Autowired
	private NotaFiscalItemRepository repository;

	public List<NotaFiscalItem> findAll() {
		return repository.findAll();
	}

	public NotaFiscalItem findById(Long id) {
		Optional<NotaFiscalItem> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public NotaFiscalItem saveNotaFiscalItem(NotaFiscalItem notaFiscalItem) {
		return repository.save(notaFiscalItem);
	}

	public void deleteNotaFiscalItem(Long id) {
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
	public NotaFiscalItem updateNotaFiscalItem(Long id, NotaFiscalItem notaFiscalItem) {
		try {
			NotaFiscalItem obj = repository.getOne(id);
			updateData(obj, notaFiscalItem);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(NotaFiscalItem obj, NotaFiscalItem notaFiscalItem) {

		obj.setNotaFiscal(notaFiscalItem.getNotafiscal());
		obj.setPreco(notaFiscalItem.getPreco());
		obj.setPrecoitem(notaFiscalItem.getPrecoitem());
		obj.setProduto(notaFiscalItem.getProduto());
		obj.setQuantidade(notaFiscalItem.getQuantidade());
	}

}
