package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    
    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    private Fornecedor fornecedor;
    
    @ManyToOne
    @JoinColumn(name = "cotacaocompra_id")
    private CotacaoCompra cotacaocompra;

    public FornecedorCotacaoCompra() {
    }

	public FornecedorCotacaoCompra(Long id, Fornecedor fornecedor, CotacaoCompra cotacaocompra, String status) {
		this.id = id;
		this.fornecedor = fornecedor;
		this.cotacaocompra = cotacaocompra;
		this.status = status;
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
    
    
}
