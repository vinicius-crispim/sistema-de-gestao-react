package com.projeto.faceBuy.entities;


import java.io.Serializable;
import java.util.ArrayList;
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
@Table(name = "tb_funcionario")
public class Funcionario implements Serializable {

	private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String login;
    private String senha;
    private String email;
    private String telefone;
    

    @ManyToOne
    @JoinColumn(name = "tipofuncionario_id")
    private TipoFuncionario tipofuncionario;
	
    @OneToMany(mappedBy = "funcionario")
	private List<CotacaoCompra> cotacaocompra = new ArrayList<CotacaoCompra>();
    
    public Funcionario() {}
    
    public Funcionario(Long id, String nome, String senha, String email, String telefone, TipoFuncionario tipo, String login) {
		this.id = id;
		this.nome = nome;
		this.senha = senha;
		this.email = email;
		this.telefone = telefone;
		this.tipofuncionario = tipo;
		this.login=login;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	
	public TipoFuncionario getTipo() {
		return tipofuncionario;
	}

	public void setTipo(TipoFuncionario tipo) {
		this.tipofuncionario = tipo;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}
	@JsonIgnore
	public TipoFuncionario getTipofuncionario() {
		return tipofuncionario;
	}

	public void setTipofuncionario(TipoFuncionario tipofuncionario) {
		this.tipofuncionario = tipofuncionario;
	}

	@JsonIgnore
	public List<CotacaoCompra> getCotacaocompra() {
		return cotacaocompra;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email, tipofuncionario, id, login, nome, senha, telefone);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Funcionario other = (Funcionario) obj;
		return  Objects.equals(email, other.email)
				&& Objects.equals(tipofuncionario, other.tipofuncionario) && Objects.equals(id, other.id)
				&& Objects.equals(login, other.login) && Objects.equals(nome, other.nome)
				&& Objects.equals(senha, other.senha) && Objects.equals(telefone, other.telefone);
	}

}
