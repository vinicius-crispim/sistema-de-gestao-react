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

	private Double precototal;

	private String hora;
	
	
	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;
	
	private Long num_pedido;
	
	@ManyToOne
	@JoinColumn(name = "funcionario_id")
	private Funcionario funcionario;

	@OneToMany(mappedBy = "notafiscal")
    private List<NotaFiscalItem> notafiscalitem = new ArrayList<>();
    
	public NotaFiscal(Long id,Long num_pedido ,Integer num_nota, String data, Double valorTotal, Fornecedor fornecedor,Funcionario funcionario,String hora) {
		this.id = id;
		this.num_nota = num_nota;
		this.data = data;
		this.precototal = valorTotal;
		this.fornecedor = fornecedor;
		this.hora = hora;
		this.num_pedido = num_pedido;
	}
	public NotaFiscal() {}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "NotaFiscal [id=" + id + ", data=" + data + ", valorTotal=" + precototal + ", fornecedor=" + fornecedor
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

	public Double getPrecoTotal() {
		return precototal;
	}

	public void setPrecoTotal(Double valorTotal) {
		this.precototal = valorTotal;
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
	public String getHora() {
		return hora;
	}
	public void setHora(String hora) {
		this.hora = hora;
	}
	public Long getNum_pedido() {
		return num_pedido;
	}
	public void setNum_pedido(Long num_pedido) {
		this.num_pedido = num_pedido;
	}
	@Override
	public int hashCode() {
		return Objects.hash(data, num_nota, fornecedor, id, notafiscalitem, precototal);
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
				&& Objects.equals(precototal, other.precototal) && Objects.equals(num_nota, other.num_nota);
	}

}
