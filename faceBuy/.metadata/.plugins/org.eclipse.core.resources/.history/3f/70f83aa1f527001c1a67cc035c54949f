package com.pi.gestaocompras.resources;

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

import com.pi.gestaocompras.entities.Cidade;
import com.pi.gestaocompras.services.CidadeService;

@RestController
@RequestMapping(value = "/cidades")
public class CidadeResource {
	@Autowired
	private CidadeService service;

	@GetMapping
	public ResponseEntity<List<Cidade>> findAll(){

		List<Cidade> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<Cidade> findById(@PathVariable Long id){
		Cidade u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Cidade> saveCidade(@RequestBody Cidade cidade){
		cidade = service.saveCidade(cidade);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(cidade.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(cidade);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteCidade(@PathVariable Long id){
		service.deleteCidade(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Cidade> updateCidade(@PathVariable Long id, @RequestBody Cidade cidade){
		cidade = service.updateCidade(id, cidade);
		return ResponseEntity.ok().body(cidade);
	}
	

}
