package com.projeto.faceBuy.services;


import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.TipoFuncionario;
import com.projeto.faceBuy.repositories.TipoFuncionarioRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class TipoFuncionarioService {
	@Autowired
	private TipoFuncionarioRepository repository;

	public List<TipoFuncionario> findAll() {
		return repository.findAll();
	}

	public TipoFuncionario findById(Long id) {
		Optional<TipoFuncionario> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public TipoFuncionario saveTipoFuncionario(TipoFuncionario tipoFuncionario) {
		return repository.save(tipoFuncionario);
	}

	public void deleteTipo(Long id) {
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
	public TipoFuncionario updateTipo(Long id, TipoFuncionario tipoFuncionario) {
		try {
			TipoFuncionario obj = repository.getOne(id);
			updateData(obj, tipoFuncionario);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(TipoFuncionario obj, TipoFuncionario estado) {

		obj.setTipo(estado.getTipo());
	}

}
