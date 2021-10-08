package com.projeto.faceBuy.services;


import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.Funcionario;
import com.projeto.faceBuy.repositories.FuncionarioRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class FuncionarioService {
	@Autowired
	private FuncionarioRepository repository;

	public List<Funcionario> findAll() {
		return repository.findAll();
	}

	public Funcionario findById(Long id) {
		Optional<Funcionario> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Funcionario saveFuncionario(Funcionario funcionario) {
		return repository.save(funcionario);
	}

	public void deleteFuncionario(Long id) {
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
	public Funcionario updateFuncionario(Long id, Funcionario funcionario) {
		try {
			Funcionario obj = repository.getOne(id);
			updateData(obj, funcionario);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(Funcionario obj, Funcionario funcionario) {

		obj.setNome(funcionario.getNome());
		obj.setEmail(funcionario.getEmail());
		obj.setTipo(funcionario.getTipo());
		obj.setLogin(funcionario.getLogin());
		obj.setSenha(funcionario.getSenha());
		obj.setTelefone(funcionario.getTelefone());
	}

}
