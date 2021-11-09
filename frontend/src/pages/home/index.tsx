import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FornecedorCotacaoCompraSelect } from "types/cotacao";
import { BASE_URL } from "utils/request";

/*let vinistring = localStorage.getItem("user");*/
let user = JSON.parse(localStorage.getItem('user') || '{}');

type Todas = {
    fornecedorCotacaoCompra: FornecedorCotacaoCompraSelect[];
    quantidade: number[];
}

const Home = () => {

    const [todas, setTodasCotacao] = useState<Todas>({ fornecedorCotacaoCompra: [], quantidade: [] })

    const history = useHistory();

    function onSubmit(event: any) {
        axios.get(`${BASE_URL}/fornecedorcotacaocompras`)
            .then(response => {

                const data = response.data as FornecedorCotacaoCompraSelect[];
                todas.fornecedorCotacaoCompra = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                console.log(todas);
                localStorage.removeItem("fornecedorcotacaocompra");
                localStorage.setItem('fornecedorcotacaocompra', JSON.stringify(todas));

                let bemvindo = JSON.parse(localStorage.getItem('fornecedorcotacaocompra') || '{}');
                console.log(bemvindo);
                history.push("/verificarrespostas");
                window.location.reload();

                console.log(todas);
            });
    }

    return (
        <>
            <NavBar />

            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Facebuy</h1>
                    <p className="lead">Sistema de Gestão de Compras</p>
                    <p>{user.nome}</p>
                    <hr />
                    <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                    <button type="submit" onClick={onSubmit} className="btn btn-success btn-lg">Visualizar Respostas</button>
                    <Link className="btn btn-success btn-lg mx-5" to="/cadastrofuncionario"> Cadastrar Funcionário</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/cadastroproduto"> Cadastrar Produto</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/estoque"> Estoque</Link>
                    <Link className="btn btn-success btn-lg mx-5 my-4" to="/nota"> Nota Fiscal</Link>
                    <Link className="btn btn-success btn-lg mx-5 my-4" to="/cotacao"> Cotacao</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;