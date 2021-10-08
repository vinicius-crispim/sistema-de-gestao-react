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

import com.projeto.faceBuy.entities.NotaFiscal;
import com.projeto.faceBuy.services.NotaFiscalService;

@RestController
@RequestMapping(value = "/notaFiscais")
public class NotaFiscalResource {
	@Autowired
	private NotaFiscalService service;

	@GetMapping
	public ResponseEntity<List<NotaFiscal>> findAll(){

		List<NotaFiscal> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<NotaFiscal> findById(@PathVariable Long id){
		NotaFiscal u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<NotaFiscal> saveNotaFiscal(@RequestBody NotaFiscal notaFiscal){
		notaFiscal = service.saveNotaFiscal(notaFiscal);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(notaFiscal.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(notaFiscal);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteNotaFiscal(@PathVariable Long id){
		service.deleteNotaFiscal(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<NotaFiscal> updateNotaFiscal(@PathVariable Long id, @RequestBody NotaFiscal notaFiscal){
		notaFiscal = service.updateNotaFiscal(id, notaFiscal);
		return ResponseEntity.ok().body(notaFiscal);
	}
	

}
