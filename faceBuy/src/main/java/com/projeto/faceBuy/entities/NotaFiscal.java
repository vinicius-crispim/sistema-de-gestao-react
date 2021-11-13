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
@Table(name = "tb_notafiscal")
public class NotaFiscal implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Integer num_nota;
	
	private String data;

	private Double preco;

	
	
	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;
	
	@ManyToOne
	@JoinColumn(name = "funcionario_id")
	private Funcionario funcionario;

	@OneToMany(mappedBy = "notafiscal")
    private List<NotaFiscalItem> notafiscalitem = new ArrayList<>();
    
	public NotaFiscal(Long id, Integer num_nota, String data, Double valorTotal, Fornecedor fornecedor,Funcionario funcionario) {
		this.id = id;
		this.num_nota = num_nota;
		this.data = data;
		this.preco = valorTotal;
		this.fornecedor = fornecedor;
	}
	public NotaFiscal() {}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "NotaFiscal [id=" + id + ", data=" + data + ", valorTotal=" + preco + ", fornecedor=" + fornecedor
				+ ", notafiscalitem=" + notafiscalitem + "]";
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double valorTotal) {
		this.preco = valorTotal;
	}

	public Integer getNum_nota() {
		return num_nota;
	}

	public void setNum_nota(Integer num_nota) {
		this.num_nota = num_nota;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}
	@JsonIgnore
	public List<NotaFiscalItem> getNotafiscalitem() {
		return notafiscalitem;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}
	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}
	@Override
	public int hashCode() {
		return Objects.hash(data, num_nota, fornecedor, id, notafiscalitem, preco);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		NotaFiscal other = (NotaFiscal) obj;
		return Objects.equals(data, other.data) && Objects.equals(fornecedor, other.fornecedor)
				&& Objects.equals(id, other.id) && Objects.equals(notafiscalitem, other.notafiscalitem)
				&& Objects.equals(preco, other.preco) && Objects.equals(num_nota, other.num_nota);
	}

}
