import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useState } from "react";
import { useHistory } from "react-router";


const initialValue = {
    nome: '',
    cnpj: '',
    email: '',
    telefone: 0,
    senha: '',
}

const CadastroFornecedor = () => {
    
    const [values, setValues] = useState(initialValue);
    console.log(values);
    const history = useHistory();

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        console.log({name,value});

        setValues({...values,[name]: value});
    }

    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        
        axios.post("http://localhost:8080/fornecedores", values)
        .then((response) => {
            history.push('/');
        });
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Cadastre sua empresa</h1><br />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="promotion-form__group">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" onChange={onChange} required/>
                    </div>
                    <div className="promotion-form__group">
                        <label htmlFor="cnpj">CNPJ:</label>
                        <input type="text" id="cnpj" name="cnpj" onChange={onChange} required />
                    </div>
                    <div className="promotion-form__group">
                        <label htmlFor="login">Login:</label>
                        <input type="text" id="login" name="login" onChange={onChange} required />
                    </div>
                    <div className="promotion-form__group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" onChange={onChange} required/>
                    </div>
                    <div className="promotion-form__group">
                        <label htmlFor="senha">Senha:</label>
                        <input type="text" id="senha" name="senha" onChange={onChange} required/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-light btn-lg">Cadastrar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CadastroFornecedor;