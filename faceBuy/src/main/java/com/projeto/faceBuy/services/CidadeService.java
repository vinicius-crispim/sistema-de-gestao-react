package com.projeto.faceBuy.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.Cidade;
import com.projeto.faceBuy.repositories.CidadeRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class CidadeService {
	@Autowired
	private CidadeRepository repository;

	public List<Cidade> findAll() {
		return repository.findAll();
	}

	public Cidade findById(Long id) {
		Optional<Cidade> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Cidade saveCidade(Cidade cidade) {
		return repository.save(cidade);
	}

	public void deleteCidade(Long id) {
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
	public Cidade updateCidade(Long id, Cidade cidade) {
		try {
			Cidade obj = repository.getOne(id);
			updateData(obj, cidade);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(Cidade obj, Cidade cidade) {

		obj.setNome(cidade.getNome());
		obj.setEstado(cidade.getEstado());
	}

}
