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

import com.projeto.faceBuy.entities.Estado;
import com.projeto.faceBuy.services.EstadoService;

@RestController
@RequestMapping(value = "/estados")
public class EstadoResource {
	@Autowired
	private EstadoService service;

	@GetMapping
	public ResponseEntity<List<Estado>> findAll(){

		List<Estado> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<Estado> findById(@PathVariable Long id){
		Estado u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Estado> saveEstado(@RequestBody Estado estado){
		estado = service.saveEstado(estado);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(estado.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(estado);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteEstado(@PathVariable Long id){
		service.deleteEstado(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Estado> updateEstado(@PathVariable Long id, @RequestBody Estado estado){
		estado = service.updateEstado(id, estado);
		return ResponseEntity.ok().body(estado);
	}
	

}
