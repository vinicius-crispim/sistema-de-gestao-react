package com.projeto.faceBuy.entities.DTO;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.entities.Funcionario;
import com.projeto.faceBuy.entities.NotaFiscal;
import com.projeto.faceBuy.entities.NotaFiscalItem;

public class NotaFiscalDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Integer num_nota;
	private Funcionario funcionario;
	private Fornecedor fornecedor;
	
	private String data;
	private List<NotaFiscalItem> notafiscalitem = new ArrayList<>();
	
    SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy");

	
	public NotaFiscalDTO(NotaFiscal notafiscal) {
		this.id = notafiscal.getId();
		this.num_nota = notafiscal.getNum_nota();
		this.funcionario = notafiscal.getFuncionario();
		this.fornecedor = notafiscal.getFornecedor();
		this.notafiscalitem.addAll(notafiscal.getNotafiscalitem());
		this.data = notafiscal.getData();
	}
	
	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public NotaFiscalDTO() {}
	
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
	public List<NotaFiscalItem> getList() {
		List<NotaFiscalItem> lista = new ArrayList<NotaFiscalItem>();
		for(NotaFiscalItem x : notafiscalitem) {
			lista.add(x);
		}
		return lista;
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


}
