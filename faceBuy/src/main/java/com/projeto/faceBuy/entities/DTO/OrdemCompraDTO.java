package com.projeto.faceBuy.entities.DTO;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.entities.Funcionario;
import com.projeto.faceBuy.entities.OrdemCompra;
import com.projeto.faceBuy.entities.OrdemCompraItem;

public class OrdemCompraDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Funcionario funcionario;
	private Fornecedor fornecedor;
	private Double preco;
	private String data;
	private String status;
	private List<OrdemCompraItem> ordemcompraitem = new ArrayList<>();

	SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy");

	public OrdemCompraDTO(OrdemCompra ordemcompra) {
		this.id = ordemcompra.getId();
		this.preco = ordemcompra.getPreco();
		this.data = ordemcompra.getData();
		this.fornecedor = ordemcompra.getFornecedor();
		this.funcionario = ordemcompra.getFuncionario();
		this.ordemcompraitem.addAll(ordemcompra.getOrdemcompraitem());
		this.status = ordemcompra.getStatus();
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public OrdemCompraDTO() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public List<OrdemCompraItem> getOrdemcompraitem() {
		List<OrdemCompraItem> lista = new ArrayList<OrdemCompraItem>();
		for (OrdemCompraItem x : ordemcompraitem) {
			lista.add(x);
		}
		return lista;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
