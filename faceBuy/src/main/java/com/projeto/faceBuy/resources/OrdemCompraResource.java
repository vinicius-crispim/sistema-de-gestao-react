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
import com.projeto.faceBuy.entities.OrdemCompra;
import com.projeto.faceBuy.entities.DTO.CotacaoCompraDTO;
import com.projeto.faceBuy.entities.DTO.OrdemCompraDTO;
import com.projeto.faceBuy.services.OrdemCompraService;

@RestController
@RequestMapping(value = "/ordemcompras")
public class OrdemCompraResource {
	@Autowired
	private OrdemCompraService service;

	@GetMapping
	public ResponseEntity<List<OrdemCompraDTO>> findAll(){

		List<OrdemCompra> list = service.findAll();
		List<OrdemCompraDTO> listDTO = list.stream().map(x -> new OrdemCompraDTO(x)).collect(Collectors.toList());

		return ResponseEntity.ok().body(listDTO);
	}

	@GetMapping(value="/pendente")
	public ResponseEntity<List<OrdemCompraDTO>> findAllPendente(){

		List<OrdemCompra> list = service.findAllPendente();
		List<OrdemCompraDTO> listDTO = list.stream().map(x -> new OrdemCompraDTO(x)).collect(Collectors.toList());

		return ResponseEntity.ok().body(listDTO);
	}
	
	@GetMapping(value="/autentica/{id}")
	public ResponseEntity<List<OrdemCompraDTO>> findAllAutentica(@PathVariable Long id){

		List<OrdemCompra> list = service.findAllAutentica(id);
		List<OrdemCompraDTO> listDTO = list.stream().map(x -> new OrdemCompraDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<OrdemCompraDTO> findById(@PathVariable Long id){
		OrdemCompra u = service.findById(id);
		OrdemCompraDTO udto = new OrdemCompraDTO(u);
		return ResponseEntity.ok().body(udto);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<OrdemCompra> saveOrdemCompra(@RequestBody OrdemCompra ordemCompra){
		ordemCompra = service.saveOrdemCompra(ordemCompra);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(ordemCompra.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(ordemCompra);
	}
	
	@PostMapping(value ="/finaliza")
	public ResponseEntity<OrdemCompra> finalizaCotacaoCompra(@RequestBody OrdemCompra ordemcompra){
		ordemcompra = service.finalizaOrdemCompra(ordemcompra);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(ordemcompra.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(ordemcompra);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteOrdemCompra(@PathVariable Long id){
		service.deleteOrdemCompra(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<OrdemCompra> updateOrdemCompra(@PathVariable Long id, @RequestBody OrdemCompra ordemCompra){
		ordemCompra = service.updateOrdemCompra(id, ordemCompra);
		return ResponseEntity.ok().body(ordemCompra);
	}
	

}
