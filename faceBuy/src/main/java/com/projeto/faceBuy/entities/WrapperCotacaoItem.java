package com.projeto.faceBuy.entities;

import java.io.Serializable;

public class WrapperCotacaoItem implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private Integer quant;
	
	
	public WrapperCotacaoItem(CotacaoCompraItem item) {
		this.id = item.getId();
		this.nome = item.getProduto().getNome();
		this.quant = item.getQuantidade();
	}
	
	public WrapperCotacaoItem() {}
	
	public Integer getQuant() {
		return quant;
	}

	public void setQuant(Integer quant) {
		this.quant = quant;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}


	
}
