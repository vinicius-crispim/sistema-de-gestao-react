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

import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.pk.CotacaoCompraItemPK;
import com.projeto.faceBuy.services.CotacaoCompraItemService;

@RestController
@RequestMapping(value = "/cotacoes/itens")
public class CotacaoCompraItemResource {
	@Autowired
	private CotacaoCompraItemService service;

	@GetMapping
	public ResponseEntity<List<CotacaoCompraItem>> findAll(){

		List<CotacaoCompraItem> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<CotacaoCompraItem> findById(@PathVariable CotacaoCompraItemPK id){
		CotacaoCompraItem u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<CotacaoCompraItem> saveCotacaoCompra(@RequestBody CotacaoCompraItem cotacaoCompraItem){
		cotacaoCompraItem = service.saveCotacaoCompraItem(cotacaoCompraItem);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(cotacaoCompraItem.getCotacaoCompra().getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(cotacaoCompraItem);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteCotacaoCompra(@PathVariable CotacaoCompraItemPK id){
		service.deleteCotacaoCompraItem(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<CotacaoCompraItem> updateCotacaoCompra(@PathVariable CotacaoCompraItemPK id, @RequestBody CotacaoCompraItem cotacaoCompra){
		cotacaoCompra = service.updateCotacaoCompraItem(id, cotacaoCompra);
		return ResponseEntity.ok().body(cotacaoCompra);
	}
	

}
