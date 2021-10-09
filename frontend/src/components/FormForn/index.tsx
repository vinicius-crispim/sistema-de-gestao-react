import React from "react";

const FormForn = () => {
    <div className="container">
        <div className="jumbotron">
            <h1 className="display-4">Cadastre sua empresa</h1>
            <hr />
        </div>
        <form action="">
            <div className="promotion-form__group">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" />
            </div>
            <div className="promotion-form__group">
                <label htmlFor="cnpj">CNPJ:</label>
                <input type="text" id="cnpj" name="cnpj" />
            </div>
            <div className="promotion-form__group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" />
            </div>
            <div className="promotion-form__group">
                <label htmlFor="telefone">Telefone:</label>
                <input type="number" id="telefone" name="telefone" />
            </div>
            <div className="promotion-form__group">
                <label htmlFor="senha">Senha:</label>
                <input type="text" id="senha" name="senha" />
            </div>
            <div>
                <button type="submit" className="btn btn-light">Cadastrar</button>
            </div>
        </form>
    </div>
}
export default FormForn;