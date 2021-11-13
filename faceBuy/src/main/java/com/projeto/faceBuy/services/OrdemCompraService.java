package com.projeto.faceBuy.services;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.entities.FornecedorCotacaoCompra;
import com.projeto.faceBuy.entities.OrdemCompra;
import com.projeto.faceBuy.repositories.FornecedorRepository;
import com.projeto.faceBuy.repositories.OrdemCompraRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class OrdemCompraService {
	@Autowired
	private OrdemCompraRepository repository;
	@Autowired
	private FornecedorRepository fornrepository;

	public List<OrdemCompra> findAll() {
		return repository.findAll();
	}

	public List<OrdemCompra> findAllPendente() {
		List<OrdemCompra> list = repository.findAll();
		List<OrdemCompra> listalimpa = new ArrayList<OrdemCompra>();
		for (OrdemCompra ordemcompra : list) {
			if (ordemcompra.getStatus() == "Pendente") {
				listalimpa.add(ordemcompra);
			}
		}
		return listalimpa;
	}

	public List<OrdemCompra> findAllAutentica(Long id) {
		Integer aux = 0;
		List<OrdemCompra> list = repository.findAll();
		Optional<Fornecedor> fornecedorop = fornrepository.findById(id);
		List<OrdemCompra> listalimpa = new ArrayList<OrdemCompra>();
		List<OrdemCompra> list2 = new ArrayList<OrdemCompra>();
		Fornecedor fornecedor = fornecedorop.get();
		for (OrdemCompra ordemCompra : list) {
			aux = 0;
			for (OrdemCompra ordemCompra2 : fornecedor.getOrdenscompra()) {
				if (ordemCompra == ordemCompra2) {
					aux++;
				}
			}
			if (aux > 0) {
				list2.add(ordemCompra);
			}
		}
		for (OrdemCompra ordemcompra : list2) {
			if (ordemcompra.getStatus() == "Pendente") {
				listalimpa.add(ordemcompra);
			}
		}
		return listalimpa;
	}

	public OrdemCompra findById(Long id) {
		Optional<OrdemCompra> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public OrdemCompra saveOrdemCompra(OrdemCompra ordemCompra) {
		ordemCompra.setStatus("Pendente");
		Date dataAtual = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		String dataFormatada = dateFormat.format(dataAtual);
		ordemCompra.setData(dataFormatada);

		return repository.save(ordemCompra);
	}

	public OrdemCompra finalizaOrdemCompra(OrdemCompra ordemCompra) {
		ordemCompra.setStatus("Finalizada");
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
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(OrdemCompra obj, OrdemCompra ordemCompra) {

		obj.setData(ordemCompra.getData());
		obj.setFornecedor(ordemCompra.getFornecedor());
		obj.setPreco(ordemCompra.getPreco());
		obj.getOrdemcompraitem().addAll(ordemCompra.getOrdemcompraitem().stream().collect(Collectors.toList()));
	}

}
