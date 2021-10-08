package com.pi.gestaocompras.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.pi.gestaocompras.entities.NotaFiscal;
import com.pi.gestaocompras.repositories.NotaFiscalRepository;
import com.pi.gestaocompras.services.exceptions.DatabaseException;
import com.pi.gestaocompras.services.exceptions.ResourceNotFoundException;

@Service
public class NotaFiscalService {
	@Autowired
	private NotaFiscalRepository repository;

	public List<NotaFiscal> findAll() {
		return repository.findAll();
	}

	public NotaFiscal findById(Long id) {
		Optional<NotaFiscal> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public NotaFiscal saveNotaFiscal(NotaFiscal notaFiscal) {
		return repository.save(notaFiscal);
	}

	public void deleteNotaFiscal(Long id) {
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
	public NotaFiscal updateNotaFiscal(Long id, NotaFiscal notaFiscal) {
		try {
			NotaFiscal obj = repository.getOne(id);
			updateData(obj, notaFiscal);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(NotaFiscal obj, NotaFiscal notaFiscal) {

		obj.setData(notaFiscal.getData());
		obj.setFornecedor(notaFiscal.getFornecedor());
		obj.setValorTotal(notaFiscal.getValorTotal());
	}

}
