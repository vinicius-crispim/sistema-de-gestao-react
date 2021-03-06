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

import com.projeto.faceBuy.entities.TipoFuncionario;
import com.projeto.faceBuy.services.TipoFuncionarioService;

@RestController
@RequestMapping(value = "/tipofuncionario")
public class TipoFuncionarioResource {
	@Autowired
	private TipoFuncionarioService service;

	@GetMapping
	public ResponseEntity<List<TipoFuncionario>> findAll(){

		List<TipoFuncionario> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<TipoFuncionario> findById(@PathVariable Long id){
		TipoFuncionario u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<TipoFuncionario> saveEstado(@RequestBody TipoFuncionario tipoFuncionario){
		tipoFuncionario = service.saveTipoFuncionario(tipoFuncionario);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(tipoFuncionario.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(tipoFuncionario);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteEstado(@PathVariable Long id){
		service.deleteTipo(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<TipoFuncionario> updateTipo(@PathVariable Long id, @RequestBody TipoFuncionario tipoFuncionario){
		tipoFuncionario = service.updateTipo(id, tipoFuncionario);
		return ResponseEntity.ok().body(tipoFuncionario);
	}
	

}
