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

import com.projeto.faceBuy.entities.OrdemCompraItem;
import com.projeto.faceBuy.services.OrdemCompraItemService;

@RestController
@RequestMapping(value = "/ordemcompraitems")
public class OrdemCompraItemResource {
	@Autowired
	private OrdemCompraItemService service;

	@GetMapping
	public ResponseEntity<List<OrdemCompraItem>> findAll(){

		List<OrdemCompraItem> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<OrdemCompraItem> findById(@PathVariable Long id){
		OrdemCompraItem u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<OrdemCompraItem> saveOrdemCompraItem(@RequestBody OrdemCompraItem ordemcompraitem){
		ordemcompraitem = service.saveOrdemCompraItem(ordemcompraitem);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(ordemcompraitem.getOrdemCompra().getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(ordemcompraitem);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteOrdemCompraItem(@PathVariable Long id){
		service.deleteOrdemCompraItem(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<OrdemCompraItem> updateOrdemCompraItem(@PathVariable Long id, @RequestBody OrdemCompraItem ordemcompraitem){
		ordemcompraitem = service.updateOrdemCompraItem(id, ordemcompraitem);
		return ResponseEntity.ok().body(ordemcompraitem);
	}
	

}
