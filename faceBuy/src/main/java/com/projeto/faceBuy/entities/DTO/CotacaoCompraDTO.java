package com.projeto.faceBuy.entities.DTO;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.Funcionario;

public class CotacaoCompraDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Funcionario funcionario;
	private String data;
	private List<CotacaoCompraItem> cotacaocompraitem = new ArrayList<>();
	
    SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy");

	
	public CotacaoCompraDTO(CotacaoCompra cotacao) {
		this.id = cotacao.getId();
		this.funcionario = cotacao.getFuncionario();
		this.cotacaocompraitem.addAll(cotacao.getCotacaocompraitem());
		this.data = dt.format(cotacao.getData());
	}
	
	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
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
