package com.projeto.faceBuy.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.faceBuy.entities.Produto;
import com.projeto.faceBuy.repositories.ProdutoRepository;
import com.projeto.faceBuy.services.exceptions.DatabaseException;
import com.projeto.faceBuy.services.exceptions.ResourceNotFoundException;

@Service
public class ProdutoService {
	@Autowired
	private ProdutoRepository repository;

	public Page<Produto> findAll(Pageable pageable) {
		repository.findAll();//traz para a memoria para nao repetir o select no banco, funciona pois nao tem mtos vebdedores
	//	Page<Produto> result = repository.findAll(pageable);
		Page<Produto> result = repository.FindTeste(pageable);
		return result;	
		}
	public Page<Produto> findAllInativos(Pageable pageable) {
		repository.findAll();//traz para a memoria para nao repetir o select no banco, funciona pois nao tem mtos vebdedores
	//	Page<Produto> result = repository.findAll(pageable);
		Page<Produto> result = repository.FindInativos(pageable);
		return result;	
		}
	public Page<Produto> findAllEmFalta(Pageable pageable) {
		repository.findAll();//traz para a memoria para nao repetir o select no banco, funciona pois nao tem mtos vebdedores
	//	Page<Produto> result = repository.findAll(pageable);
		Page<Produto> result = repository.FindEmFalta(pageable);
		return result;	
		}
	
	public Page<Produto> findAllAA(Pageable pageable) {
		repository.findAll();//traz para a memoria para nao repetir o select no banco, funciona pois nao tem mtos vebdedores
		Page<Produto> result = repository.FindTeste(pageable);
		
		return result;	
		}
	
	
	public Page<Produto> findAllNoPage(Pageable pageable) {
		repository.findAll();//traz para a memoria para nao repetir o select no banco, funciona pois nao tem mtos vebdedores
		Page<Produto> result = repository.findAll(pageable);
		return result;
		}
	
	@Transactional(readOnly = true)//garante que toda a operaÃ§Ã£o com banco seja resolvida aqui e ReadOnly nao faz lock no banco pois Ã© so select, nao muda nd no banco
	public Produto findById(Long id) {
		Optional<Produto> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Produto saveProduto(Produto produto) {
		produto.setStatus("Valido");
		return repository.save(produto);
	}

	public Produto FinalizaProduto(Produto produto) {
		produto.setStatus("Invalido");
		return repository.save(produto);
	}
	
	public void deleteProduto(Long id) {
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
	public Produto updateProduto(Long id, Produto produto) {
		try {
			Produto obj = repository.getOne(id);
			updateData(obj, produto);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(Produto obj, Produto produto) {

		obj.setNome(produto.getNome());
		obj.setDescrição(produto.getDescrição());
		obj.setEstoque(produto.getEstoque());
		obj.setQuantidademin(produto.getQuantidademin());
		obj.getCotacaocompraitens().addAll(produto.getCotacaocompraitens().stream().collect(Collectors.toList()));
		obj.getNotafiscalitem().addAll(produto.getNotafiscalitem().stream().collect(Collectors.toList()));
		obj.getOrdemcompraitem().addAll(produto.getOrdemcompraitem().stream().collect(Collectors.toList()));		
	}

}
