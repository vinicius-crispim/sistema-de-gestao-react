package com.projeto.faceBuy.entities.pk;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.entities.Funcionario;
import com.projeto.faceBuy.entities.Produto;

@Embeddable
public class CotacaoCompraItemPK implements Serializable{

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "cotacaocompra_id")
	private CotacaoCompra cotacaocompra;
	
	@ManyToOne
	@JoinColumn(name = "funcionario_id")
	private Funcionario funcionario;

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public CotacaoCompra getCotacaocompra() {
		return cotacaocompra;
	}

	public void setCotacaocompra(CotacaoCompra cotacaocompra) {
		this.cotacaocompra = cotacaocompra;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	@Override
	public int hashCode() {
		return Objects.hash(cotacaocompra, funcionario, produto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CotacaoCompraItemPK other = (CotacaoCompraItemPK) obj;
		return Objects.equals(cotacaocompra, other.cotacaocompra)
				&& Objects.equals(funcionario, other.funcionario)
				&& Objects.equals(produto, other.produto);
	}


}
