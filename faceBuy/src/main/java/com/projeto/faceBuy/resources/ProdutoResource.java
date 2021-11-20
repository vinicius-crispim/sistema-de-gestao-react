package com.projeto.faceBuy.resources;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.projeto.faceBuy.entities.Produto;
import com.projeto.faceBuy.services.ProdutoService;

@RestController
@RequestMapping(value = "/produtos")
public class ProdutoResource {
	@Autowired
	private ProdutoService service;

	@GetMapping
	public ResponseEntity<Page<Produto>> findAll(Pageable pageable){

		Page<Produto> list = service.findAll(pageable);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/noPage")
	public ResponseEntity<List<Produto>> findAllNoPage(){

		List<Produto> list = service.findAllNoPage();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<Produto> findById(@PathVariable Long id){
		Produto u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Produto> saveProduto(@RequestBody Produto produto){
		produto = service.saveProduto(produto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(produto.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(produto);
	}
	
	@PostMapping(value="/invalida")
	public ResponseEntity<Produto> invalidaProduto(@RequestBody Produto produto){
		produto = service.FinalizaProduto(produto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(produto.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(produto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteProduto(@PathVariable Long id){
		service.deleteProduto(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto){
		produto = service.updateProduto(id, produto);
		return ResponseEntity.ok().body(produto);
	}
	

}
