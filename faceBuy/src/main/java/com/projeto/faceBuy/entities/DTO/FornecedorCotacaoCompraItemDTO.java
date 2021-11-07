package com.projeto.faceBuy.entities.DTO;

import java.io.Serializable;

import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.entities.FornecedorCotacaoCompraItem;

public class FornecedorCotacaoCompraItemDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Fornecedor fornecedor;
	private String status;
	private CotacaoCompraDTO cotacaocompra;
	
	public FornecedorCotacaoCompraItemDTO(FornecedorCotacaoCompraItem fornecedorCotacaoCompraItemDTO) {
		this.id = fornecedorCotacaoCompraItemDTO.getId();
		this.fornecedor = fornecedorCotacaoCompraItemDTO.getFornecedor();
		
		this.status = "Pendente";
	}
	
	public FornecedorCotacaoCompraItemDTO() {}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}


	
}
