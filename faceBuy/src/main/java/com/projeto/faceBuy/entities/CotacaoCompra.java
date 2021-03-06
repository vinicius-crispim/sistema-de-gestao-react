package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
@Table(name = "tb_cotacaocompra")
public class CotacaoCompra implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String data;
	
	private String status;
	@ManyToOne
	@JoinColumn(name = "funcionario_id")
	private Funcionario funcionario;
	
	@OneToMany(mappedBy = "cotacaocompra")
	private List<CotacaoCompraItem> cotacaocompraitens = new ArrayList<>();

	@OneToMany(mappedBy = "cotacaocompra")
	private List<FornecedorCotacaoCompra> fornecedorcotacaocompra = new ArrayList<>();

	public CotacaoCompra() {
	}

	public CotacaoCompra(Long id, String data, String status, Funcionario funcionario) {
		this.id = id;
		this.data = data;
		this.status = status;
		this.funcionario = funcionario;
	}



	public CotacaoCompra(Long id, Funcionario funcionario) {
		this.id = id;
	}

	public CotacaoCompra(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	@JsonIgnore
	public List<FornecedorCotacaoCompra> getFornecedorcotacaocompra() {
		return fornecedorcotacaocompra;
	}

	@JsonIgnore
	public List<CotacaoCompraItem> getCotacaocompraitem() {
		List<CotacaoCompraItem> lista = new ArrayList<CotacaoCompraItem>();
		for(CotacaoCompraItem x : cotacaocompraitens) {
			lista.add(x);
		}
		return lista;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	

}