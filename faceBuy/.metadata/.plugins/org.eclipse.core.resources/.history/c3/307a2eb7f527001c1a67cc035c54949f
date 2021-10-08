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

import com.pi.gestaocompras.entities.Funcionario;
import com.pi.gestaocompras.services.FuncionarioService;

@RestController
@RequestMapping(value = "/funcionarios")
public class FuncionarioResource {
	@Autowired
	private FuncionarioService service;

	@GetMapping
	public ResponseEntity<List<Funcionario>> findAll(){

		List<Funcionario> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<Funcionario> findById(@PathVariable Long id){
		Funcionario u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Funcionario> saveFuncionario(@RequestBody Funcionario funcionario){
		funcionario = service.saveFuncionario(funcionario);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(funcionario.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(funcionario);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteFuncionario(@PathVariable Long id){
		service.deleteFuncionario(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Funcionario> updateFuncionario(@PathVariable Long id, @RequestBody Funcionario funcionario){
		funcionario = service.updateFuncionario(id, funcionario);
		return ResponseEntity.ok().body(funcionario);
	}
	

}
