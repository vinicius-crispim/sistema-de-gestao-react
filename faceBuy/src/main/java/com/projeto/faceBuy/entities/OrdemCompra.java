package com.projeto.faceBuy.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
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
@Table(name = "tb_ordemcompra")
public class OrdemCompra implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Double preco;

	private String data;

	private String status;
	
	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;
	
	@ManyToOne
	@JoinColumn(name = "funcionario_id")
	private Funcionario funcionario;

	@OneToMany(mappedBy = "ordemcompra")
	private List<OrdemCompraItem> ordemcompraitem = new ArrayList<>();

	public OrdemCompra() {
	}

	public OrdemCompra(Long id, Double preco, String data,String status) {
		this.id = id;
		this.preco = preco;
		this.data = data;
		this.status=status;
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

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@JsonIgnore
	public List<OrdemCompraItem> getOrdemcompraitem() {
		return ordemcompraitem;
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
		OrdemCompra other = (OrdemCompra) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "OrdemCompra [id=" + id + ", preco=" + preco + ", data=" + data + "]";
	}
}
