package com.projeto.faceBuy.entities.pk;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.projeto.faceBuy.entities.OrdemCompra;
import com.projeto.faceBuy.entities.Produto;

@Embeddable
public class OrdemCompraItemPK implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "ordemcompra_id")
	private OrdemCompra ordemcompra;

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

	@Override
	public int hashCode() {
		return Objects.hash(ordemcompra, produto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OrdemCompraItemPK other = (OrdemCompraItemPK) obj;
		return Objects.equals(ordemcompra, other.ordemcompra) && Objects.equals(produto, other.produto);
	}

}
