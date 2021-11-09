package com.projeto.faceBuy.services;

import java.text.DateFormat;
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
import com.projeto.faceBuy.repositories.CotacaoCompraRepository;
import com.projeto.faceBuy.repositories.FornecedorRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class CotacaoCompraService {
	@Autowired
	private CotacaoCompraRepository repository;
	@Autowired
	private FornecedorRepository fornrepo;
	
	SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy");

	
	public List<CotacaoCompra> findAll() {
		List<CotacaoCompra> list = repository.findAll();
		List<CotacaoCompra> listalimpa = new ArrayList<CotacaoCompra>();
		for (CotacaoCompra cotacaoCompra : list) {
			if (cotacaoCompra.getStatus() == "Pendente") {
				listalimpa.add(cotacaoCompra);
			}
		}
		return listalimpa;
	}

	public List<CotacaoCompra> findAllAutentica(Long id) {
		Integer aux = 0;
		List<CotacaoCompra> list = repository.findAll();
		Optional<Fornecedor> fornecedorop = fornrepo.findById(id);
		Fornecedor fornecedor = fornecedorop.get();
		List<CotacaoCompra> listalimpa = new ArrayList<CotacaoCompra>();
		for (CotacaoCompra cotacoes : list) {
			aux =0;
			for (FornecedorCotacaoCompra forcotacoes : fornecedor.getFornecedorcotacaocompra()) {
				if (forcotacoes.getCotacaocompra() == cotacoes) {
					aux++;
				}
			}
			if (aux == 0) {
				listalimpa.add(cotacoes);
			}
		}
		return listalimpa;
	}

	public CotacaoCompra findById(Long id) {
		Optional<CotacaoCompra> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public CotacaoCompra saveCotacaoCompra(CotacaoCompra cotacaoCompra) {
		Date dataAtual = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		String dataFormatada = dateFormat.format(dataAtual);
		cotacaoCompra.setData(dataFormatada);
		cotacaoCompra.setStatus("Pendente");
		return repository.save(cotacaoCompra);
	}

	public void deleteCotacaoCompra(Long id) {
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
	public CotacaoCompra updateCotacaoCompra(Long id, CotacaoCompra cotacaoCompra) {
		try {
			CotacaoCompra obj = repository.getOne(id);
			updateData(obj, cotacaoCompra);
			return repository.save(obj);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(CotacaoCompra obj, CotacaoCompra cotacaoCompra) {
		obj.getCotacaocompraitem().addAll(cotacaoCompra.getCotacaocompraitem().stream().collect(Collectors.toList()));
	}

}
