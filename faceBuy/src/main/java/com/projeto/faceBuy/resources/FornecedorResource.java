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

import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.services.FornecedorService;

@RestController
@RequestMapping(value = "/fornecedores")
public class FornecedorResource {
	@Autowired
	private FornecedorService service;

	@GetMapping
	public ResponseEntity<List<Fornecedor>> findAll(){

		List<Fornecedor> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<Fornecedor> findById(@PathVariable Long id){
		Fornecedor u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Fornecedor> saveFornecedor(@RequestBody Fornecedor fornecedor){
		fornecedor = service.saveFornecedor(fornecedor);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(fornecedor.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(fornecedor);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteFornecedor(@PathVariable Long id){
		service.deleteFornecedor(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Fornecedor> updateFornecedor(@PathVariable Long id, @RequestBody Fornecedor fornecedor){
		fornecedor = service.updateFornecedor(id, fornecedor);
		return ResponseEntity.ok().body(fornecedor);
	}
	

}
