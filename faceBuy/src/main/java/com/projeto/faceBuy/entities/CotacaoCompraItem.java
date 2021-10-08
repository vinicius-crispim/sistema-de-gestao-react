package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projeto.faceBuy.entities.pk.CotacaoCompraItemPK;

@Entity
@Table(name = "tb_cotacaocompraitem")
public class CotacaoCompraItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private CotacaoCompraItemPK id = new CotacaoCompraItemPK();
	
	private Integer quantidade;

	private String marca;

	public CotacaoCompraItem() {
	}

	public CotacaoCompraItem(Integer quantidade, String marca, Produto produto, CotacaoCompra cotacaocompra, Funcionario funcionario) {
		this.quantidade = quantidade;
		this.marca = marca;
		id.setCotacaocompra(cotacaocompra);
		id.setFuncionario(funcionario);
		id.setProduto(produto);
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public Produto getProduto() {
		return id.getProduto();
	}

	public void setProduto(Produto produto) {
		id.setProduto(produto);
	}

	
	public Funcionario getFuncionario() {
		return id.getFuncionario();
	}

	public void setFuncionario(Funcionario funcionario) {
		id.setFuncionario(funcionario);
	}
	
	@JsonIgnore
	public CotacaoCompra getCotacaoCompra() {
		return id.getCotacaocompra();
	}

	public void setCotacaoCompra(CotacaoCompra cotacaoCompra) {
		id.setCotacaocompra(cotacaoCompra);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CotacaoCompraItem other = (CotacaoCompraItem) obj;
		return Objects.equals(id, other.id);
	}


}
