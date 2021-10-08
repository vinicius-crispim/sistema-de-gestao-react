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
@Table(name = "tb_notafiscal")
public class NotaFiscal implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Integer num_nota;
	
	private Date data;

	private Double valorTotal;

	@ManyToOne
	@JoinColumn(name = "fornecedor_id")
	private Fornecedor fornecedor;

	@OneToMany(mappedBy = "id.notafiscal")
    private List<NotaFiscalItem> notafiscalitem = new ArrayList<>();
    
	public NotaFiscal(Long id, Integer num_nota, Date data, Double valorTotal, Fornecedor fornecedor) {
		this.id = id;
		this.num_nota = num_nota;
		this.data = data;
		this.valorTotal = valorTotal;
		this.fornecedor = fornecedor;
	}
	public NotaFiscal() {}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "NotaFiscal [id=" + id + ", data=" + data + ", valorTotal=" + valorTotal + ", fornecedor=" + fornecedor
				+ ", notafiscalitem=" + notafiscalitem + "]";
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Double getValorTotal() {
		return valorTotal;
	}

	public void setValorTotal(Double valorTotal) {
		this.valorTotal = valorTotal;
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

	public List<NotaFiscalItem> getNotafiscalitem() {
		return notafiscalitem;
	}

	@Override
	public int hashCode() {
		return Objects.hash(data, num_nota, fornecedor, id, notafiscalitem, valorTotal);
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
				&& Objects.equals(valorTotal, other.valorTotal) && Objects.equals(num_nota, other.num_nota);
	}

}
