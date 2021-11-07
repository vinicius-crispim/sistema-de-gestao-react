package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Embeddable
@Entity
@Table(name="tb_fornecedorcotacaocompraitem")
public class FornecedorCotacaoCompraItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Double preco;
	
	private Double precoitem;

	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;
	
	@ManyToOne
	@JoinColumn(name = "cotacaocompraitem_id")
	private CotacaoCompraItem cotacaocompraitem;
	
	@ManyToOne
	@JoinColumn(name = "fornecedorcotacaocompra_id")
	private FornecedorCotacaoCompra fornecedorcotacaocompra;
	
	public FornecedorCotacaoCompraItem() {}
	
	public FornecedorCotacaoCompraItem(Long id, Double precoitem, Double preco, Fornecedor fornecedor, CotacaoCompraItem cotacaocompraitem, FornecedorCotacaoCompra cotacaocompra) {
		this.id = id;
		this.preco = preco;
		this.fornecedorcotacaocompra =cotacaocompra;
		this.precoitem = precoitem;
		this.fornecedor = fornecedor;
		this.cotacaocompraitem = cotacaocompraitem;
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


	public CotacaoCompraItem getCotacaocompraitem() {
		return cotacaocompraitem;
	}

	public void setCotacaocompraitem(CotacaoCompraItem cotacaocompraitem) {
		this.cotacaocompraitem = cotacaocompraitem;
	}


	public Double getPrecoitem() {
		return precoitem;
	}

	public void setPrecoitem(Double precoitem) {
		this.precoitem = precoitem;
	}

	@JsonIgnore
	public FornecedorCotacaoCompra getCotacaocompra() {
		return fornecedorcotacaocompra;
	}

	public void setCotacaocompra(FornecedorCotacaoCompra fornecedorcotacaocompra) {
		this.fornecedorcotacaocompra = fornecedorcotacaocompra;
	}

	public FornecedorCotacaoCompra getFornecedorcotacaocompra() {
		return fornecedorcotacaocompra;
	}

	public void setFornecedorcotacaocompra(FornecedorCotacaoCompra fornecedorcotacaocompra) {
		this.fornecedorcotacaocompra = fornecedorcotacaocompra;
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