package com.projeto.faceBuy.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.pk.CotacaoCompraItemPK;
import com.projeto.faceBuy.repositories.CotacaoCompraItemRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class CotacaoCompraItemService {
	@Autowired
	private CotacaoCompraItemRepository repository;

	public List<CotacaoCompraItem> findAll() {
		return repository.findAll();
	}

	public CotacaoCompraItem findById(CotacaoCompraItemPK id) {
		Optional<CotacaoCompraItem> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public CotacaoCompraItem saveCotacaoCompraItem(CotacaoCompraItem cotacaoCompraItem) {
		return repository.save(cotacaoCompraItem);
	}

	public void deleteCotacaoCompraItem(CotacaoCompraItemPK id) {
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
	public CotacaoCompraItem updateCotacaoCompraItem(CotacaoCompraItemPK id, CotacaoCompraItem cotacaoCompraItem) {
		try {
			CotacaoCompraItem obj = repository.getOne(id);
			updateData(obj, cotacaoCompraItem);
			return repository.save(obj);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(CotacaoCompraItem obj, CotacaoCompraItem cotacaoCompraItem) {
		obj.setCotacaoCompra(cotacaoCompraItem.getCotacaoCompra());
		obj.setFuncionario(cotacaoCompraItem.getFuncionario());
		obj.setMarca(cotacaoCompraItem.getMarca());
		obj.setProduto(cotacaoCompraItem.getProduto());
		obj.setQuantidade(cotacaoCompraItem.getQuantidade());
	}

}
