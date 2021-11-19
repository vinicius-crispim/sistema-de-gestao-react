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
import com.projeto.faceBuy.entities.pk.NotaFiscalItemPK;

@Entity
@Table(name = "tb_notafiscalitem")
public class NotaFiscalItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "notafiscal_id")
	private NotaFiscal notafiscal;


	private Integer quantidade;

	private Double precoitem;
	
	private Double preco;

	public NotaFiscalItem() {
	}

	public NotaFiscalItem(Integer quantidade, Double preco, Double precoitem, Produto produto, NotaFiscal notafiscal) {
		this.quantidade = quantidade;
		this.preco = preco;
		this.precoitem = precoitem;
		this.notafiscal = notafiscal;
		this.produto = produto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Double getPrecoitem() {
		return precoitem;
	}

	public void setPrecoitem(Double precoitem) {
		this.precoitem = precoitem;
	}

	public Produto getProduto() {
		return produto;
	}
	
	public void setProduto(Produto produto) {
		this.produto = produto;
	}
	
	public NotaFiscal getNotafiscal() {
		return notafiscal;
	}
	
	public void setNotaFiscal(NotaFiscal notafiscal) {
		this.notafiscal = notafiscal;
	}

	public void setNotafiscal(NotaFiscal notafiscal) {
		this.notafiscal = notafiscal;
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
		NotaFiscalItem other = (NotaFiscalItem) obj;
		return Objects.equals(id, other.id) && Objects.equals(precoitem, other.precoitem)
				&& Objects.equals(quantidade, other.quantidade);
	}

	
}
