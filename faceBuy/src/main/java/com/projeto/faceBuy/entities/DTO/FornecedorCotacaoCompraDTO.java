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
	private Double precototal;
	private String dataentrega;
	private Double frete;
	private String status;
	private Long num_pedido;
	private List<FornecedorCotacaoCompraItem> fornecedorcotacaocompraitem = new ArrayList<>();

	SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy");

	public FornecedorCotacaoCompraDTO() {
	}

	public FornecedorCotacaoCompraDTO(FornecedorCotacaoCompra teste) {
		this.id = teste.getId();
		this.num_pedido = teste.getNum_pedido();
		this.precototal = teste.getPrecototal();
		this.fornecedor = teste.getFornecedor();
		this.fornecedorcotacaocompraitem.addAll(teste.getFornecedorcotacaocompraitem());
		this.data = teste.getData();
		this.dataentrega = teste.getDataEntrega();
		this.frete = teste.getFrete();
		this.status = teste.getStatus();
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

	public Double getPrecototal() {
		return precototal;
	}

	public void setPrecototal(Double precototal) {
		this.precototal = precototal;
	}

	public Double getFrete() {
		return frete;
	}

	public void setFrete(Double frete) {
		this.frete = frete;
	}

	public String getDataentrega() {
		return dataentrega;
	}

	public void setDataentrega(String dataentrega) {
		this.dataentrega = dataentrega;
	}

	public Long getNum_pedido() {
		return num_pedido;
	}

	public void setNum_pedido(Long num_pedido) {
		this.num_pedido = num_pedido;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
