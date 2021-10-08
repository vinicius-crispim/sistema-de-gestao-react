package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tb_fornecedorcotacaocompraitem")
public class FornecedorCotacaoCompraItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Double preco;

	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;
	
	
	public FornecedorCotacaoCompraItem() {}
	
	public FornecedorCotacaoCompraItem(Long id, Double preco, Fornecedor fornecedor) {
		this.id = id;
		this.preco = preco;
		this.fornecedor = fornecedor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}


	@Override
	public int hashCode() {
		return Objects.hash(fornecedor, id, preco);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FornecedorCotacaoCompraItem other = (FornecedorCotacaoCompraItem) obj;
		return 
				Objects.equals(fornecedor, other.fornecedor) && Objects.equals(id, other.id)
				&& Objects.equals(preco, other.preco);
	}
}