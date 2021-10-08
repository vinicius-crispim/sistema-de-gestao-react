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

import com.pi.gestaocompras.entities.NotaFiscalItem;
import com.pi.gestaocompras.services.NotaFiscalItemService;

@RestController
@RequestMapping(value = "/notaFiscalItems")
public class NotaFiscalItemResource {
	@Autowired
	private NotaFiscalItemService service;

	@GetMapping
	public ResponseEntity<List<NotaFiscalItem>> findAll(){

		List<NotaFiscalItem> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<NotaFiscalItem> findById(@PathVariable Long id){
		NotaFiscalItem u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<NotaFiscalItem> saveNotaFiscalItem(@RequestBody NotaFiscalItem notaFiscalItem){
		notaFiscalItem = service.saveNotaFiscalItem(notaFiscalItem);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(notaFiscalItem.getNotafiscal().getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(notaFiscalItem);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteNotaFiscalItem(@PathVariable Long id){
		service.deleteNotaFiscalItem(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<NotaFiscalItem> updateNotaFiscalItem(@PathVariable Long id, @RequestBody NotaFiscalItem notaFiscalItem){
		notaFiscalItem = service.updateNotaFiscalItem(id, notaFiscalItem);
		return ResponseEntity.ok().body(notaFiscalItem);
	}
	

}
