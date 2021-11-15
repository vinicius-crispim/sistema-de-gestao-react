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

import com.projeto.faceBuy.entities.FornecedorCotacaoCompra;
import com.projeto.faceBuy.entities.NotaFiscal;
import com.projeto.faceBuy.entities.OrdemCompra;
import com.projeto.faceBuy.entities.DTO.NotaFiscalDTO;
import com.projeto.faceBuy.repositories.FornecedorCotacaoCompraRepository;
import com.projeto.faceBuy.repositories.FornecedorRepository;
import com.projeto.faceBuy.repositories.NotaFiscalRepository;
import com.projeto.faceBuy.repositories.OrdemCompraRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class NotaFiscalService {
	@Autowired
	private NotaFiscalRepository repository;
	@Autowired
	private FornecedorCotacaoCompraRepository orrepository;

	public List<NotaFiscal> findAll() {
		return repository.findAll();
	}

	public List<NotaFiscalDTO> findByPedido(Long id) {
		List<NotaFiscal> list = repository.findAll();
		List<NotaFiscalDTO> listDTO = list.stream().map(x -> new NotaFiscalDTO(x)).collect(Collectors.toList());
		List<NotaFiscalDTO> listlimpa = new ArrayList<NotaFiscalDTO>();
		for (NotaFiscalDTO notaFiscal : listDTO) {
			if (notaFiscal.getNum_pedido().equals(id)) {
				listlimpa.add(notaFiscal);
			}
		}
		return listlimpa;
	}

	public NotaFiscal findById(Long id) {
		Optional<NotaFiscal> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public NotaFiscal saveNotaFiscal(NotaFiscal notaFiscal) {
		Date dataAtual = new Date();
		SimpleDateFormat horaformat = new SimpleDateFormat("HH:mm");
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		String dataFormatada = dateFormat.format(dataAtual);
		String horaformatada = horaformat.format(dataAtual);
		notaFiscal.setData(dataFormatada);
		notaFiscal.setHora(horaformatada);
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
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(NotaFiscal obj, NotaFiscal notaFiscal) {

		obj.setData(notaFiscal.getData());
		obj.setFornecedor(notaFiscal.getFornecedor());
		obj.setPreco(notaFiscal.getPreco());
	}

}
