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

import com.projeto.faceBuy.entities.FornecedorCotacaoCompraItem;
import com.projeto.faceBuy.services.FornecedorCotacaoCompraItemService;

@RestController
@RequestMapping(value = "/respostafornecedor")
public class FornecedorCotacaoCompraItemResource {
	@Autowired
	private FornecedorCotacaoCompraItemService service;


	@GetMapping
	public ResponseEntity<List<FornecedorCotacaoCompraItem>> findAll(){

		List<FornecedorCotacaoCompraItem> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<FornecedorCotacaoCompraItem> findById(@PathVariable Long id){
		FornecedorCotacaoCompraItem u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<FornecedorCotacaoCompraItem> saveFornecedorCotacaoCompraItem(@RequestBody FornecedorCotacaoCompraItem fornecedorCotacaoCompraItem){
		fornecedorCotacaoCompraItem = service.saveFornecedorCotacaoCompraItem(fornecedorCotacaoCompraItem);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(fornecedorCotacaoCompraItem.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(fornecedorCotacaoCompraItem);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteFornecedorCotacaoCompraItem(@PathVariable Long id){
		service.deleteFornecedorCotacaoCompraItem(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<FornecedorCotacaoCompraItem> updateFornecedorCotacaoCompraItem(@PathVariable Long id, @RequestBody FornecedorCotacaoCompraItem fornecedorCotacaoCompraItem){
		fornecedorCotacaoCompraItem = service.updateFornecedorCotacaoCompraItem(id, fornecedorCotacaoCompraItem);
		return ResponseEntity.ok().body(fornecedorCotacaoCompraItem);
	}
	

}
