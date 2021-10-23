package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class WrapperCotacaoCompra implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Funcionario funcionario;
	private List<CotacaoCompraItem> cotacaocompraitem = new ArrayList<>();
	
	public WrapperCotacaoCompra(CotacaoCompra cotacao) {
		this.id = cotacao.getId();
		this.funcionario = cotacao.getFuncionario();
		this.cotacaocompraitem.addAll(cotacao.getCotacaocompraitem());
	}
	
	public WrapperCotacaoCompra() {}
	
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
	public List<CotacaoCompraItem> getList() {
		return cotacaocompraitem;
	}

}
