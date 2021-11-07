package com.projeto.faceBuy.entities.DTO;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.projeto.faceBuy.entities.FornecedorCotacaoCompra;
import com.projeto.faceBuy.entities.FornecedorCotacaoCompraItem;
import com.projeto.faceBuy.entities.Funcionario;

public class FornecedorCotacaoCompraDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String data;
	private Funcionario funcionario;
	private List<FornecedorCotacaoCompraItem> fornecedorcotacaocompraitem = new ArrayList<>();

	SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy");

	public FornecedorCotacaoCompraDTO() {
	}

	public FornecedorCotacaoCompraDTO(FornecedorCotacaoCompra teste) {
		this.id = teste.getId();
		this.funcionario = teste.getCotacaocompra().getFuncionario();
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

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public List<FornecedorCotacaoCompraItem> getFornecedorcotacaocompraitem() {
		return fornecedorcotacaocompraitem;
	}

}
