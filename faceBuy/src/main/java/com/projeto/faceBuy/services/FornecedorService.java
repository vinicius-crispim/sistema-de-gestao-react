package com.projeto.faceBuy.services;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.repositories.FornecedorRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class FornecedorService {
	@Autowired
	private FornecedorRepository repository;

	@Transactional(readOnly = true)
	public List<Fornecedor> findAll() {
		return repository.findAll();
	}

	@Transactional(readOnly = true)
	public Fornecedor findById(Long id) {
		Optional<Fornecedor> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Fornecedor saveFornecedor(Fornecedor fornecedor) {
		return repository.save(fornecedor);
	}

	public void deleteFornecedor(Long id) {
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
	public Fornecedor updateFornecedor(Long id, Fornecedor fornecedor) {
		try {
			Fornecedor obj = repository.getOne(id);
			updateData(obj, fornecedor);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(Fornecedor obj, Fornecedor fornecedor) {

		obj.setNome(fornecedor.getNome());
		obj.setCidade(fornecedor.getCidade());
		obj.setCnpj(fornecedor.getCnpj());
		obj.setEmail(fornecedor.getEmail());
		obj.setLogin(fornecedor.getLogin());
		obj.setSenha(fornecedor.getSenha());
		obj.getFornecedorcotacaocompraitem().addAll(fornecedor.getFornecedorcotacaocompraitem().stream().collect(Collectors.toList()));
		obj.getNotasfiscais().addAll(fornecedor.getNotasfiscais().stream().collect(Collectors.toList()));
		obj.getOrdenscompra().addAll(fornecedor.getOrdenscompra().stream().collect(Collectors.toList()));
	}

}
