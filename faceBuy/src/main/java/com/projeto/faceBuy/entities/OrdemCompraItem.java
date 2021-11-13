package com.projeto.faceBuy.entities;


import java.io.Serializable;
import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projeto.faceBuy.entities.pk.OrdemCompraItemPK;

@Entity
@Table(name = "tb_ordemcompraitem")
public class OrdemCompraItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "ordemcompra_id")
	private OrdemCompra ordemcompra;
	
	private Integer quantidade;

	private Double precoitem;
	
	private Double preco;

	public OrdemCompraItem() {
	}

	public OrdemCompraItem(Integer quantidade, Double precoitem, Produto produto, OrdemCompra ordemcompra, Double preco) {
		this.quantidade = quantidade;
		this.precoitem = precoitem;
		this.ordemcompra = ordemcompra;
		this.produto = produto;
		this.preco = preco;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Double getPrecoitem() {
		return precoitem;
	}

	public void setPrecoitem(Double precoitem) {
		this.precoitem = precoitem;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}
	
	public OrdemCompra getOrdemcompra() {
		return ordemcompra;
	}

	public void setOrdemcompra(OrdemCompra ordemcompra) {
		this.ordemcompra = ordemcompra;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, precoitem, quantidade);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OrdemCompraItem other = (OrdemCompraItem) obj;
		return Objects.equals(id, other.id) && Objects.equals(precoitem, other.precoitem)
				&& Objects.equals(quantidade, other.quantidade);
	}
}
