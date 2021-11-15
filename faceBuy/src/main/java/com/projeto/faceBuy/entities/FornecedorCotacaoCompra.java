package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_fornecedorcotacaocompra")
public class FornecedorCotacaoCompra implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String status;
	
	private Double precototal;
	private String data;
	private String dataentrega;
	private Double frete;
	private Long num_pedido;
	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;

	@ManyToOne
	@JoinColumn(name = "cotacaocompra_id")
	private CotacaoCompra cotacaocompra;

    @OneToMany(mappedBy = "fornecedorcotacaocompra")
	private List<FornecedorCotacaoCompraItem> fornecedorcotacaocompraitem = new ArrayList<FornecedorCotacaoCompraItem>();
    

	public FornecedorCotacaoCompra() {
	}

	public FornecedorCotacaoCompra(Long id,Long num_pedido,String data, Fornecedor fornecedor, CotacaoCompra cotacaocompra, String status,Double precototal,String dataEntrega,Double frete) {
		this.id = id;
		this.fornecedor = fornecedor;
		this.data = data;
		this.cotacaocompra = cotacaocompra;
		this.status = status;
		this.dataentrega = dataEntrega;;
		this.precototal = precototal;
		this.frete = frete;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}

	public CotacaoCompra getCotacaocompra() {
		return cotacaocompra;
	}

	public void setCotacaocompra(CotacaoCompra cotacaocompra) {
		this.cotacaocompra = cotacaocompra;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	@JsonIgnore
	public List<FornecedorCotacaoCompraItem> getFornecedorcotacaocompraitem() {
		return fornecedorcotacaocompraitem;
	}

	public Double getPrecototal() {
		return precototal;
	}

	public void setPrecototal(Double precototal) {
		this.precototal = precototal;
	}

	public String getDataEntrega() {
		return dataentrega;
	}

	public void setDataEntrega(String dataEntrega) {
		this.dataentrega = dataEntrega;
	}

	public Double getFrete() {
		return frete;
	}

	public void setFrete(Double frete) {
		this.frete = frete;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Long getNum_pedido() {
		return num_pedido;
	}

	public void setNum_pedido(Long num_pedido) {
		this.num_pedido = num_pedido;
	}

}
