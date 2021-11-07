package com.projeto.faceBuy.entities.DTO;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.entities.FornecedorCotacaoCompra;
import com.projeto.faceBuy.entities.FornecedorCotacaoCompraItem;
import com.projeto.faceBuy.entities.Funcionario;

public class FornecedorCotacaoCompraDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String data;
	private Fornecedor fornecedor;
	private List<FornecedorCotacaoCompraItem> fornecedorcotacaocompraitem = new ArrayList<>();

	SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy");

	public FornecedorCotacaoCompraDTO() {
	}

	public FornecedorCotacaoCompraDTO(FornecedorCotacaoCompra teste) {
		this.id = teste.getId();
		this.fornecedor = teste.getFornecedor();
		this.fornecedorcotacaocompraitem.addAll(teste.getFornecedorcotacaocompraitem());
		this.data = teste.getCotacaocompra().getData();
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<FornecedorCotacaoCompraItem> getFornecedorcotacaocompraitem() {
		return fornecedorcotacaocompraitem;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}

}
