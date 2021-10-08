package com.pi.gestaocompras.entities.pk;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.pi.gestaocompras.entities.NotaFiscal;
import com.pi.gestaocompras.entities.Produto;

@Embeddable
public class NotaFiscalItemPK implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "notafiscal_id")
	private NotaFiscal notafiscal;

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public NotaFiscal getNotafiscal() {
		return notafiscal;
	}

	public void setNotafiscal(NotaFiscal notafiscal) {
		this.notafiscal = notafiscal;
	}

	@Override
	public int hashCode() {
		return Objects.hash(notafiscal, produto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		NotaFiscalItemPK other = (NotaFiscalItemPK) obj;
		return Objects.equals(notafiscal, other.notafiscal) && Objects.equals(produto, other.produto);
	}
	
}
