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

@Entity
@Table(name = "tb_ordemcompra")
public class OrdemCompra implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Double valor;
	
	private Date data;

	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;
	
	@OneToMany(mappedBy = "id.ordemcompra")
	private List<OrdemCompraItem> ordemcompraitem = new ArrayList<>();
	
	public OrdemCompra() {}
	
	public OrdemCompra(Long id, Double valor, Date data) {
		this.id = id;
		this.valor = valor;
		this.data = data;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public List<OrdemCompraItem> getOrdemcompraitem() {
		return ordemcompraitem;
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
		return "OrdemCompra [id=" + id + ", valor=" + valor + ", data=" + data + "]";
	}
}
