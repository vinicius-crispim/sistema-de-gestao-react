package com.projeto.faceBuy.entities.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.Funcionario;

public class CotacaoCompraDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Funcionario funcionario;
	private List<CotacaoCompraItem> cotacaocompraitem = new ArrayList<>();
	
	public CotacaoCompraDTO(CotacaoCompra cotacao) {
		this.id = cotacao.getId();
		this.funcionario = cotacao.getFuncionario();
		this.cotacaocompraitem.addAll(cotacao.getCotacaocompraitem());
	}
	
	public CotacaoCompraDTO() {}
	
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
