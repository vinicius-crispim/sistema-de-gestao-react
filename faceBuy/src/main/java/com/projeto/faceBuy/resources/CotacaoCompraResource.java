package com.projeto.faceBuy.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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

import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.entities.WrapperCotacaoCompra;
import com.projeto.faceBuy.services.CotacaoCompraService;

@RestController
@RequestMapping(value = "/cotacoes")
public class CotacaoCompraResource {
	@Autowired
	private CotacaoCompraService service;

	@GetMapping
	public ResponseEntity<List<WrapperCotacaoCompra>> findAll(){

		List<CotacaoCompra> list = service.findAll();
		List<WrapperCotacaoCompra> listDTO = list.stream().map(x -> new WrapperCotacaoCompra(x)).collect(Collectors.toList());

		return ResponseEntity.ok().body(listDTO);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<CotacaoCompra> findById(@PathVariable Long id){
		CotacaoCompra u = service.findById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<CotacaoCompra> saveCotacaoCompra(@RequestBody CotacaoCompra cotacaoCompra){
		cotacaoCompra = service.saveCotacaoCompra(cotacaoCompra);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(cotacaoCompra.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(cotacaoCompra);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteCotacaoCompra(@PathVariable Long id){
		service.deleteCotacaoCompra(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<CotacaoCompra> updateCotacaoCompra(@PathVariable Long id, @RequestBody CotacaoCompra cotacaoCompra){
		cotacaoCompra = service.updateCotacaoCompra(id, cotacaoCompra);
		return ResponseEntity.ok().body(cotacaoCompra);
	}
	

}
