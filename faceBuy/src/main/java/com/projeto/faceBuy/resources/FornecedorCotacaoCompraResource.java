package com.projeto.faceBuy.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projeto.faceBuy.entities.FornecedorCotacaoCompra;
import com.projeto.faceBuy.services.FornecedorCotacaoCompraService;

@RestController
@RequestMapping(value = "/fornecedorcotacaocompras")
public class FornecedorCotacaoCompraResource {
	@Autowired
	private FornecedorCotacaoCompraService service;

	@GetMapping
	public ResponseEntity<List<FornecedorCotacaoCompra>> findAll(){

		List<FornecedorCotacaoCompra> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<FornecedorCotacaoCompra> findById(@PathVariable Long id){
		FornecedorCotacaoCompra u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<FornecedorCotacaoCompra> saveFornecedorCotacaoCompra(@RequestBody FornecedorCotacaoCompra fornecedorCotacaoCompra){
		fornecedorCotacaoCompra = service.saveFornecedorCotacaoCompra(fornecedorCotacaoCompra);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(fornecedorCotacaoCompra.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(fornecedorCotacaoCompra);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteFornecedorCotacaoCompra(@PathVariable Long id){
		service.deleteFornecedorCotacaoCompra(id);		
		return ResponseEntity.noContent().build();
	}
	

}
