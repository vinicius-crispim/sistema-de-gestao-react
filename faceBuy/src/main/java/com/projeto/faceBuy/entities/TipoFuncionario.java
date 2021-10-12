package com.projeto.faceBuy.entities;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_tipofuncionario")
public class TipoFuncionario implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String tipo;

	@OneToMany(mappedBy = "tipofuncionario")
	private List<Funcionario> funcionarios = new ArrayList<Funcionario>();

	public TipoFuncionario() {
	}

	public TipoFuncionario(Long id, String tiponome) {
		this.id = id;
		this.tipo = tiponome;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipo() {
		return this.tipo;
	}

	public void setTipo(String tiponome) {
		this.tipo = tiponome;
	}
	@JsonIgnore
	public List<Funcionario> getFuncionarios() {
		return funcionarios;
	}

}
